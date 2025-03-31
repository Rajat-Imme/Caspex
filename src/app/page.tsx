'use client';

import Character from "@/components/Character";
import Episode from "@/components/Episode";
import { CharacterType, ResponseType } from "@/lib/definitions";
import { useCallback, useEffect, useRef, useState } from "react";

export default function Home() {
  const EPISODE_URL = "https://rickandmortyapi.com/api/episode";

  const [page, setPage] = useState(1);
  const [characters, setCharacters] = useState<Array<Record<string, unknown>>>([]);
  const [responseData, setResponseData] = useState<ResponseType>({ info: {}, results: [] });
  const [loading, setLoading] = useState(false);
  const [selectedEpisodeId, setSelectedEpisodeId] = useState<number | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  const fetchEpisode = async () => {
    console.log("page",page);
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const response = await fetch(`${EPISODE_URL}?page=${page}`);
      const data = await response.json();

      setResponseData(prev => ({
        ...data,
        results: [...prev.results, ...data.results], 
      }));
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCharacters = async (characterUrls: string[], episodeId: number): Promise<void> => {
    setSelectedEpisodeId(episodeId); 

    try {
      const characterPromises = characterUrls.map((url) => fetch(url).then((res) => res.json()));
      const characterData = await Promise.all(characterPromises);
      setCharacters(characterData);
    } catch (error) {
      console.log("error fetching characters", error);
    }
  };

  const lastEpisodeRef = useCallback(
    (node: HTMLDivElement) => {
      const totalPages = Number(responseData.info?.pages || 1); 

      if (!node || loading ) return;

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && page < totalPages) {
          console.log('call',page)
          setPage(prevPage => prevPage + 1 );
        }
      });

      observer.current.observe(node);
 
    },
    [responseData.info, page, loading]
  );

  useEffect(() => {
   
    fetchEpisode();
  }, [page]); 

  return (
    <div className="grid grid-cols-[250px_1fr] min-h-screen p-2">
      
      <div className="p-4 border-2 overflow-y-auto max-h-screen flex flex-col gap-y-4 no-scrollbar">
        {responseData.results.map((episode, index) => (
          <Episode
            key={index}
            episode={episode}
            onClick={() => fetchCharacters(episode.characters as string[], Number(episode.id))}
            ref={index === responseData.results.length - 1 ? lastEpisodeRef : null}
            isSelected={selectedEpisodeId === Number(episode.id)}
          />
        ))}

       
        {loading && (
          <div className="text-center py-4">
            Loading
            <span className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-600"></span>
          </div>
        )}
      </div>

    
      <div className="p-4">
        <div className="flex justify-start flex-wrap gap-4 overflow-y-auto max-h-screen no-scrollbar">
          {characters.map((data, index) => (
            <Character key={index} character={data as CharacterType} />
          ))}
        </div>
      </div>
    </div>
  );
}
