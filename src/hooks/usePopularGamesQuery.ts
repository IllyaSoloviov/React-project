import { useQuery } from "@tanstack/react-query"
import { GameService } from "@/services/api/rawg.service"
import type { Game, GameResponse, GameDetails } from "@/types/rawg.types"


export const useGamesQuery = (ordering: string, pageSize: number = 9) => {
    return useQuery<Game[]>({
        queryKey: ["games", ordering, pageSize],
        queryFn: () =>
            GameService.getAll(`ordering=${ordering}&page_size=${pageSize}`)
                .then((res) => res.data as GameResponse)
                .then((data) => data.results),
    })
}


export const useGameDetailsQuery = (id: string) => {
    return useQuery<GameDetails>({
        queryKey: ["game", id],
        queryFn: () =>
            GameService.getOne(id).then((res) => res.data as GameDetails),
    })
}
