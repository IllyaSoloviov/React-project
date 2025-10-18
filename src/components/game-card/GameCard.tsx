import { Link } from "react-router-dom";
import type { Game } from "@/types/rawg.types";
import PlatformIcon from "@/components/platform-icon/PlatformIcon.tsx";
import {useTranslation} from "react-i18next";


interface GameCardProps {
    game: Game;
}

const GameCard = ({ game }: GameCardProps) => {
    const { t, i18n } = useTranslation();

    return (
        <div className="relative min-w-[300px] group rounded-xl shadow-xl/60 overflow-hidden aspect-[4/3]">
            <Link to={`/game/${game.id}`}>
                <img
                    src={game.background_image}
                    alt={game.name}
                    className="w-full h-full object-cover"
                />

                <div className="absolute -bottom-2/3 left-0 w-full h-full bg-bg/65 text-white overflow-hidden
                               group-hover:bottom-0 transition-all duration-500 ease-in-out
                               flex flex-col">
                    <div className="w-full flex-1 flex items-center justify-center">
                        <h3 className="text-lg md:text-xl w-full text-text font-semibold px-4 py-1 my-1 mx-2 rounded-md text-center bg-bg/65">
                            {game.name}
                        </h3>
                    </div>
                    <div className="w-full flex-1/2 flex flex-col justify-around px-4 text-xs md:text-sm">
                        <div className="flex items-center justify-between w-full">
                            {game.parent_platforms?.length > 0 && (
                                <div className="flex gap-2 items-self-start max-w-1/2 px-2 py-1 rounded-md bg-bg/65">
                                    {game.parent_platforms.map(({ platform }) => (
                                        <PlatformIcon key={platform.id} slug={platform.slug} />
                                    ))}
                                </div>
                            )}

                            {game.genres?.length > 0 && (
                                <div className="flex flex-wrap gap-1 justify-end items-center">
                                    {game.genres.slice(0, 2).map((genre) => (
                                        <span key={genre.id} className="text-xs text-text-span px-2 py-1 rounded-md bg-bg-span/33">
                                            {genre.name}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="flex items-center justify-between w-full mt-2">
                            {game.released && (
                                <div className="text-sm text-text-secondary font-normal px-3 py-1 rounded-md bg-bg/65">
                                    {t("mainPage.releaseDate")} <span className={'ml-1 text-text font-medium'}>
                                        {new Date(game.released).toLocaleDateString(i18n.language === "uk" ? "uk-UA" : "en-US", {
                                            year: 'numeric', month: 'short', day: 'numeric'
                                        })}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default GameCard;