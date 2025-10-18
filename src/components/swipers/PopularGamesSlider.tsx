import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Pagination} from 'swiper/modules';
import {Link} from "react-router-dom";
import {useGamesQuery} from "@/hooks/usePopularGamesQuery.ts";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import type {Game} from "@/types/rawg.types.ts";
import {ArrowSvg} from "@/assets/icons/Arrow.svg.tsx";
import PlatformIcon from "@/components/platform-icon/PlatformIcon.tsx";
import {useTranslation} from "react-i18next";


const PopularGamesSlider = () => {
    const {data: games, isLoading} = useGamesQuery("-rating,-ratings_count", 12);
    const {t, i18n} = useTranslation();

    if (isLoading)
        return (
            <div
                className="my-10 flex flex-col  w-full max-w-7xl h-[500px] md:h-[550px] lg:h-[600px] xl:h-[650px] justify-center items-center bg-gradient-to-r from-bg-secondary via-bg3 to-bg-secondary text-text-secondary">
                <div className="relative flex items-center justify-center">
                    <div
                        className="w-16 h-16 border-4 border-accent/30 border-t-accent rounded-full animate-spin"></div>
                </div>
                <p className="mt-6 text-lg tracking-wide animate-pulse">Loading game details...</p>
            </div>
        );


    return (
        <div className="grid grid-cols-[auto_1fr_auto] grid-rows-[auto_1fr_auto] items-center gap-1 justify-items-center mt-10">

            <div className=" w-[calc(100%-2rem)]  bg-bg/65 rounded-xl col-start-2 col-end-3 row-start-1 row-end-2 self-start">
                <h2 className="my-3 mx-4 text-3xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-transparent bg-clip-text ">
                    {t("mainPage.popularGames")}
                </h2>
            </div>


            <button
                className="custom-prev cursor-pointer text-text-secondary hover:text-text bg-gradient-to-r from-gray-600 to-transperment rounded-sm col-start-1 col-end-2 row-start-2 row-end-3"
                aria-label="previous"
            >
                <ArrowSvg className="w-10 h-20"/>
            </button>
            <div className="col-start-2 col-end-3 row-start-3 row-end-4 justify-self-center">
                <div className="custom-pagination flex"/>
            </div>
            <button
                className="custom-next cursor-pointer text-text-secondary hover:text-text bg-gradient-to-l from-gray-600 to-transperment rounded-sm col-start-3 col-end-4 row-start-2 row-end-3"
                aria-label="next"
            >
                <ArrowSvg className="w-10 h-20 rotate-180"/>
            </button>
            {/*-bottom-1/4*/}
            <Swiper
                modules={[Navigation, Pagination]}
                navigation={{nextEl: '.custom-next', prevEl: '.custom-prev'}}
                pagination={{el: '.custom-pagination', clickable: true}}
                observer={true}
                observeParents={true}
                loop={false}
                className="w-full max-w-7xl col-start-2 col-end-3 row-start-2 row-end-3"
                breakpoints={{
                    320: {slidesPerView: 1, slidesPerGroup: 1},
                    640: {slidesPerView: 2, slidesPerGroup: 2},
                    1024: {slidesPerView: 3, slidesPerGroup: 3},
                }}
            >
                {games?.map((game: Game) => (
                    <SwiperSlide key={game.id} className="rounded-lg overflow-hidden">
                        <div
                            className="mt-10 mb-10 mx-4 relative group rounded-xl shadow-xl/60 overflow-hidden aspect-[3/4]">
                            <Link to={`/game/${game.id}`}>
                                <img
                                    src={game.background_image}
                                    alt={game.name}
                                    className="w-full h-full object-cover"
                                />

                                <div className="absolute -bottom-1/4 left-0 w-full h-1/2 bg-bg/65 text-white overflow-hidden
                                           group-hover:bottom-0 transition-all duration-500 ease-in-out
                                           flex flex-col gap-2">
                                    <div className="w-full flex-1 flex items-center justify-center px-4 py-1">
                                        <h3 className="text-2xl w-full text-text font-semibold px-10 py-1 my-1 rounded-md text-center bg-bg/65">{game.name}</h3>
                                    </div>
                                    <div className="w-full flex-1 flex flex-col justify-around px-4">
                                        <div className="flex items-center justify-between w-full">
                                            {game.parent_platforms?.length > 0 && (
                                                <div
                                                    className="flex gap-3 items-self-start max-w-1/2 px-3 py-1 rounded-md  bg-bg/65">
                                                    {game.parent_platforms.map(({platform}) => (
                                                        <PlatformIcon key={platform.id} slug={platform.slug}/>
                                                    ))}
                                                </div>
                                            )}

                                            {game.genres?.length > 0 && (
                                                <div className="flex flex-wrap gap-2 justify-start">
                                                    {game.genres.map((genre) => (
                                                        <span key={genre.id}
                                                              className="text-xs text-text-span px-3 py-1 rounded-md  bg-bg-span/33">
                                                {genre.name}
                                            </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex items-center justify-between w-full">
                                            {game.released && (
                                                <div
                                                    className="text-sm text-text-secondary font-normal px-3 py-1 rounded-md  bg-bg/65">
                                                    {t("mainPage.releaseDate")} <span
                                                    className={'ml-2 text-text font-medium'}>
                                            {new Date(game.released).toLocaleDateString(i18n.language === "uk" ? "uk-UA" : 'En-en', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default PopularGamesSlider;
