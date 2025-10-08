
export const getGames = (params?: string) => `/games?${params}`
export const getGameDetails = (id: string) => `/games/${id}`