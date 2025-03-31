'use client';

import { CharacterType } from "@/lib/definitions";
import Image from "next/image";



const Character = ({ character }: {character:CharacterType}) => {
  return (
    <div className="border p-2 rounded-md shadow-md flex flex-col items-center w-[calc(25%-1rem)] min-w-[200px] grow-0">
      <div className="relative w-full h-[150px]">
        <Image 
          src={character.image} 
          alt={character.name}
          fill
          className="object-cover rounded-md border"
        />
      </div>
      <div className="text-center mt-3">
        <h3 className="text-lg font-bold">{character.name}</h3>
        <p className="text-sm text-gray-600">{character.status} - {character.species}</p>
      </div>
    </div>
  );
};

export default Character;
