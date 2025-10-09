// src/hooks/useGamesGridQuery.ts

import {keepPreviousData, useQuery} from "@tanstack/react-query";
import { GameService } from "@/services/api/rawg.service";
import type { GameResponse } from "@/types/rawg.types";

export const useGamesGridQuery = (
    ordering: string,
    page: number = 1,
    pageSize: number = 12
) => {
    return useQuery<GameResponse>({
        queryKey: ["games", ordering, page, pageSize],
        queryFn: () => {

            const params = new URLSearchParams({
                ordering: ordering,
                page: String(page),
                page_size: String(pageSize),
            });

            return GameService.getAll(params.toString())
                .then((res) => res.data as GameResponse);
        },
        placeholderData: keepPreviousData,
    });
};