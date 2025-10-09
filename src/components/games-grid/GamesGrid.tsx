import { useState } from "react";
import { useGamesGridQuery } from "@/hooks/useGamesGridQuery";
import GameCard from "@/components/game-card/GameCard.tsx";
import {ArrowSvg} from "@/assets/icons/Arrow.svg.tsx";

const PAGE_SIZE = 20;

const GamesGrid = () => {
    const [page, setPage] = useState(2);
    const [ordering, setOrdering] = useState("-rating,-ratings_count");

    const { data, isLoading, isError, error } = useGamesGridQuery(
        ordering,
        page,
        PAGE_SIZE
    );

    const totalPages = data ? Math.ceil(data.count / PAGE_SIZE) : 0;

    const handleOrderingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setOrdering(e.target.value);
        setPage(1);
    };
    console.log(data);

    if (isLoading) return <div className="text-center p-10">Loading games...</div>;
    if (isError) return <div className="text-center p-10 text-red-500">Error: {error.message}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-rose-500 via-pink-500 to-purple-400 text-transparent bg-clip-text">All Games</h2>
                <div className="flex items-center gap-4">
                    <label htmlFor="sort-select" className="text-text-secondary">Sort by:</label>
                    <select
                        id="sort-select"
                        value={ordering}
                        onChange={handleOrderingChange}
                        className="bg-bg border border-gray-600 rounded-md px-3 py-2 text-text focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        <option value="-rating">Popularity</option>
                        <option value="-released">Release Date</option>
                        <option value="name">Name (A-Z)</option>
                        <option value="-name">Name (Z-A)</option>
                        <option value="-metacritic">Metacritic</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {data?.results.map((game) => (
                    <GameCard key={game.id} game={game} />
                ))}
            </div>

            <div className="flex justify-center items-center mt-8 gap-4">
                <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className="px-4 py-2 bg-gray-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ArrowSvg className="w-5 h-10"/>
                </button>
                <span className="text-text-secondary">
                    Page {page}
                </span>
                <button
                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={page === totalPages}
                    className="px-4 py-2 bg-gray-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ArrowSvg className="w-5 h-10 rotate-180"/>
                </button>
            </div>
        </div>
    );
};

export default GamesGrid;