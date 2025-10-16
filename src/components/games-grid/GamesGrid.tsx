import {useGamesGridQuery} from "@/hooks/useGamesGridQuery";
import GameCard from "@/components/game-card/GameCard.tsx";
import {ArrowSvg} from "@/assets/icons/Arrow.svg.tsx";
import {useSearchParams} from "react-router";
import {useTranslation} from "react-i18next";
import SkeletonCard from "@/components/skeleton/skeleton.tsx";
import {GameSearch} from "@/components/game-search/GameSearch.tsx";
import {AnimatedSelect} from "@/components/ui/AnimatedSelect.tsx";
import {useState} from "react";


const PAGE_SIZE = 20;

const GamesGrid = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const [ordering, setOrdering] = useState(searchParams.get("ordering") || "-rating");
    const page = Number(searchParams.get("page")) || 1;

    const {t} = useTranslation();

    const {data, isLoading, isError, error} = useGamesGridQuery(
        ordering,
        page,
        PAGE_SIZE
    );

    const options = [
        {value: "-rating", label: t("mainPage.sort.rating")},
        {value: "-released", label: t("mainPage.sort.releaseDate")},
        {value: "-ratings_count", label: t("mainPage.sort.popularity")},
        {value: "name", label: t("mainPage.sort.nameAZ")},
        {value: "-name", label: t("mainPage.sort.nameZA")},
        {value: "-metacritic", label: t("mainPage.sort.metacritic")},
    ];

    const totalPages = data ? Math.ceil(data.count / PAGE_SIZE) : 0;

    const updateSearchParams = (key: string, value: string) => {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set(key, value);

        if (key === "ordering") {
            newSearchParams.set("page", "1");
        }

        setSearchParams(newSearchParams);
    };

    const handleOrderingChange = (value: string) => {
        setOrdering(value);
        updateSearchParams("ordering", value);
    };

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            updateSearchParams("page", String(newPage));
        }
    };

    if (isLoading && !data) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-rose-500 via-pink-500 to-purple-400 text-transparent bg-clip-text">
                        {t("mainPage.allGames")}
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {Array.from({length: 8}).map((_, index) => (
                        <div key={index}>
                            <SkeletonCard/>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (isError) return <div className="text-center p-10 text-red-500">Error: {error.message}</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex justify-between items-center mb-6 mt-4 bg-bg/65 py-3 px-4 rounded-xl">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-rose-500 via-pink-500 to-purple-400 text-transparent bg-clip-text w-[150px]">
                    {t("mainPage.allGames")}
                </h2>
                <GameSearch/>
                <AnimatedSelect
                    options={options}
                    value={ordering}
                    onChange={handleOrderingChange}
                    placeholder={t("mainPage.sort.placeholder") || "Sort by..."}
                />
            </div>

            <div
                className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 transition-opacity duration-500 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>


                {data?.results.map((game) => (
                    <GameCard key={game.id} game={game}/>
                ))}
            </div>

            <div className="flex justify-center items-center mt-8 gap-4">
                <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    className="px-4 py-2 bg-bg5 cursor-pointer rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ArrowSvg className="w-7 h-5"/>
                </button>
                <span className="text-text-secondary">
                    {t("mainPage.page")} {page}
                </span>
                <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages}
                    className="px-4 py-2 bg-bg5 cursor-pointer rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ArrowSvg className="w-7 h-5 rotate-180"/>
                </button>
            </div>
        </div>
    );
};

export default GamesGrid;