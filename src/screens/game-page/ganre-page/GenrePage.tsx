import {useParams} from "react-router-dom";
import {useGamesGridQuery} from "@/hooks/useGamesGridQuery";
import GameCard from "@/components/game-card/GameCard";
import SkeletonCard from "@/components/skeleton/skeleton";

const PAGE_SIZE = 20;

const GenrePage = () => {
    const {slug} = useParams<{ slug: string }>();

    const {data, isLoading, isError, error} = useGamesGridQuery(
        "-rating",
        1,
        PAGE_SIZE,
        75,
        slug
    );

    if (isLoading)
        return (
            <div
                className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array.from({length: 16}).map((_, i) => (
                    <SkeletonCard key={i}/>
                ))}
            </div>
        );

    if (isError) return <p className="text-center text-red-500">{error.message}</p>;

    return (
        <div className={'flex-1 max-w-full bg-linear-to-r from-bg-secondary  via-bg3 to-bg-secondary flex flex-col justify-center items-center p-8  pt-0 xl:p-0'}>
            <div className="max-w-7xl mx-auto px-4 py-6">
                <h1 className="text-3xl font-bold mb-6 text-indigo-400 capitalize">{slug} Games</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {data?.results.map((game) => (
                        <GameCard key={game.id} game={game}/>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GenrePage;
