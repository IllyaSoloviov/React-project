import {keepPreviousData, useQuery} from "@tanstack/react-query";
import { GameService } from "@/services/api/rawg.service";
import type {GameResponse, GenreResponse} from "@/types/rawg.types";

export const useGamesGridQuery = (ordering: string, page: number = 1, pageSize: number = 20, minMetacritic: number = 75, genreSlug?: string) => {
    return useQuery<GameResponse>({
        queryKey: ["games", ordering, page, pageSize, genreSlug],
        queryFn: () => {

            const params = new URLSearchParams({
                ordering: ordering,
                page: String(page),
                page_size: String(pageSize),
                metacritic: `${minMetacritic},100`
            });
            if (genreSlug) params.append("genres", genreSlug);

            return GameService.getAll(params.toString())
                .then((res) => res.data as GameResponse);
        },
        placeholderData: keepPreviousData,
        staleTime: 1000 * 60 * 5,
    });
};

export const useGenresQuery = () => {
    return useQuery<GenreResponse>({
        queryKey: ["genres"],
        queryFn: async () => {
            const res = await GameService.getGenres();
            return res.data;
        },
        staleTime: 1000 * 60 * 60,
    });
};