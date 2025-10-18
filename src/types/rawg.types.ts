export interface Genre {
    id: number;
    name: string;
}

export interface PlatformInfo {
    platform: {
        id: number;
        name: string;
        slug: string;
    };
}

export interface Game {
    id: number;
    name: string;
    released: string;
    background_image: string;
    rating: number;
    ratings_count: number;
    metacritic: number;
    genres: Genre[];
    parent_platforms: PlatformInfo[];
}

export interface GameDetails extends Game {
    description_raw: string;
}

export interface GameResponse {
    count: number;
    results: Game[];
}

 export interface Screenshot {
    id: number;
    image: string;
}

export interface Genre {
    id: number;
    name: string;
    slug: string;
    games_count: number;
    image_background: string;
}

export interface GenreResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Genre[];
}