import { useGamesGridQuery } from "@/hooks/useGamesGridQuery";
import GameCard from "@/components/game-card/GameCard.tsx";
import {ArrowSvg} from "@/assets/icons/Arrow.svg.tsx";
import {useSearchParams} from "react-router";

const PAGE_SIZE = 20;

const GamesGrid = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const ordering = searchParams.get("ordering") || "-rating";
    const page = Number(searchParams.get("page")) || 1;

    const { data, isLoading, isError, error } = useGamesGridQuery(
        ordering,
        page,
        PAGE_SIZE
    );

    const totalPages = data ? Math.ceil(data.count / PAGE_SIZE) : 0;

    const updateSearchParams = (key: string, value: string) => {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set(key, value);

        if (key === "ordering") {
            newSearchParams.set("page", "1");
        }

        setSearchParams(newSearchParams);
    };

    const handleOrderingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        updateSearchParams("ordering", e.target.value);
    };

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            updateSearchParams("page", String(newPage));
        }
    };

    if (isLoading && !data) return <div className="text-center p-10">Loading games...</div>;
    if (isError) return <div className="text-center p-10 text-red-500">Error: {error.message}</div>;

    return (
        <div className="container max-w-7xl mx-auto px-4 py-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-rose-500 via-pink-500 to-purple-400 text-transparent bg-clip-text">All Games</h2>
                <div className="flex items-center gap-4">
                    <select
                        id="sort-select"
                        value={ordering}
                        onChange={handleOrderingChange}
                        className="bg-bg border border-gray-600 rounded-md px-3 py-2 text-text focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        <option value="-rating">Rating</option>
                        <option value="-released">Release Date</option>
                        <option value="-ratings_count">Popularity</option>
                        <option value="name">Name (A-Z)</option>
                        <option value="-name">Name (Z-A)</option>
                        <option value="-metacritic">Metacritic</option>
                        <option value="-released">Release Date (Newest)</option>
                        {/*<option value="released">Release Date (Oldest)</option>*/}
                    </select>
                </div>
            </div>

            <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 transition-opacity duration-500 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>                {data?.results.map((game) => (
                    <GameCard key={game.id} game={game} />
                ))}
            </div>

            <div className="flex justify-center items-center mt-8 gap-4">
                <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    className="px-4 py-2 bg-gray-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ArrowSvg className="w-7 h-5"/>
                </button>
                <span className="text-text-secondary">
                    Page {page}
                </span>
                <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages}
                    className="px-4 py-2 bg-gray-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ArrowSvg className="w-7 h-5 rotate-180"/>
                </button>
            </div>
        </div>
    );
};

export default GamesGrid;