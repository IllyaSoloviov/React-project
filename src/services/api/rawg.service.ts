import instance from "@/services/api/interceptors.api.ts";
import {getGameDetails, getGames} from "@/config/api.config.ts";

export const GameService = {
    getAll:(params: string) =>
        instance({
            method: 'GET',
            url: getGames(params),
        }),
    getOne: (id: string) =>
        instance({
            method: 'GET',
            url: getGameDetails(id),
        }),
};

