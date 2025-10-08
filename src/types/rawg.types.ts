export interface Genre {
    id: number;
    name: string;
}

export interface PlatformInfo {
    platform: {
        id: number;
        name: string;
        slug: string; // удобно для выбора иконок
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
    genres: Genre[];              // 👈 добавляем
    parent_platforms: PlatformInfo[]; // 👈 для иконок платформ
}

export interface GameDetails extends Game {
    description_raw: string;
}

export interface GameResponse {
    count: number;
    results: Game[];
}
