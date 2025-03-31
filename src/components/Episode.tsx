'use client';

import { forwardRef } from "react";
import { EpisodeType } from "@/lib/definitions";

interface EpisodeProps {
  episode: EpisodeType;
  onClick: () => void;
  isSelected: boolean; // Highlight when true
}

// Use forwardRef to pass a ref down to the div element
const Episode = forwardRef<HTMLDivElement, EpisodeProps>(({ episode, onClick, isSelected }, ref) => {
  return (
    <div 
      ref={ref}
      className={`border p-4 rounded-lg shadow-md cursor-pointer transition-all hover:bg-gray-100 hover:shadow-lg ${
        isSelected ? "bg-blue-200 border-blue-500" : "bg-white"
      }`}
      onClick={onClick}
    >
      <h2 className="text-lg font-semibold">{episode.name}</h2>
      <p className="text-sm text-gray-600">Air Date: {episode.air_date}</p>
      <p className="text-sm text-gray-600">Episode: {episode.episode}</p>
    </div>
  );
});

// Set display name for debugging
Episode.displayName = "Episode";

export default Episode;
