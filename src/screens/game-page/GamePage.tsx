import {useParams} from "react-router-dom";
import {useGameDetailsQuery} from "@/hooks/usePopularGamesQuery"; // Убедитесь, что хук называется так

const GamePage = () => {
    const {id} = useParams<{ id: string }>();
    const {data: game, isLoading, error} = useGameDetailsQuery(id!);

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen text-text-secondary">loading...</div>;
    }
    if (error || !game) {
        return <div className="flex justify-center items-center h-screen text-error">error...</div>;
    }

    return (
        <div className="flex-1 bg-bg-secondary flex justify-center items-center p-8">
            <div className="bg-bg-secondary rounded-xl shadow-lg overflow-hidden">
                <div className="relative">
                    <img
                        src={game.background_image}
                        alt={game.name}
                        className="w-full h-64 md:h-96 xl:h-128 2xl:h-[30rem] object-cover"
                    />
                    <div
                        className="absolute inset-0 bg-gradient-to-t from-bg-secondary via-bg-secondary/70 to-transparent"/>
                    <div className="absolute bottom-0 left-0 p-6 md:p-8">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-text tracking-tight">{game.name}</h1>
                        <p className="text-text-secondary mt-2 text-lg">
                            RELEASE : {new Date(game.released).toLocaleDateString()}
                        </p>
                    </div>
                </div>


                <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <h2 className="text-2xl font-bold border-b-2 border-accent/20 pb-2 mb-4">Описание</h2>
                        <p className="text-text-secondary leading-relaxed whitespace-pre-line">
                            {game.description_raw}
                        </p>
                    </div>


                    <div className="lg:col-span-1">
                        <h2 className="text-2xl font-bold border-b-2 border-accent/20 pb-2 mb-4">Детали</h2>
                        <div className="space-y-4">
                            {game.metacritic && (
                                <div className="flex justify-between items-center bg-background p-3 rounded-lg">
                                    <span className="font-semibold text-text-secondary">Metacritic</span>
                                    <span className="bg-success text-white font-bold text-lg px-3 py-1 rounded-md">
                                        {game.metacritic}
                                    </span>
                                </div>
                            )}

                            <div className="flex justify-between items-center bg-background p-3 rounded-lg">
                                <span className="font-semibold text-text-secondary">Рейтинг</span>
                                <div className="text-right">
                                    <p className="font-bold text-accent text-lg">{game.rating} / 5</p>
                                    <p className="text-xs text-text-secondary">{game.ratings_count} голосов</p>
                                </div>
                            </div>

                            {/* ++платформи */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GamePage;