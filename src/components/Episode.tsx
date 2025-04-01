'use client';

import { forwardRef } from "react";
import { EpisodeType } from "@/lib/definitions";

interface EpisodeProps {
  episode: EpisodeType;
  onClick: () => void;
  isSelected: boolean; 
  isLast:boolean;
}


const Episode = forwardRef<HTMLDivElement, EpisodeProps>(({ episode, onClick, isSelected,isLast }, ref) => {
  console.log(episode.name,isLast)
  return (
    <div 
      ref={ref}
      className={`border p-4 rounded-lg shadow-md cursor-pointer transition-all hover:bg-gray-100 hover:shadow-lg 
        ${isSelected ? "bg-blue-200 border-blue-500" : "bg-white"} 
        ${isLast ? "border-amber-700" : ""}`
      }
      onClick={onClick}
    >
      <h2 className="text-lg font-semibold">{episode.name}</h2>
      <p className="text-sm text-gray-600">Air Date: {episode.air_date}</p>
      <p className="text-sm text-gray-600">Episode: {episode.episode}</p>
    </div>
  );
});


Episode.displayName = "Episode";

export default Episode;
