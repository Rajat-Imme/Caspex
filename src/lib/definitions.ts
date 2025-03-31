export type EpisodeType=Record<string,string | Array<string>>
export type CharacterType={
    id: number;
    name: string;
    status: string;
    species: string;
    image: string;
}
export type ResponseType ={ 
    info: Record<string, string>, 
    results: Array<EpisodeType>
}