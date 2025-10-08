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



const PopularGamesSlider = () => {
    const {data: games, isLoading} = useGamesQuery("-rating,-ratings_count", 9);

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="grid grid-cols-[auto_1fr_auto] grid-rows-[auto_1fr_auto] items-center gap-1 justify-items-center">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-transparent bg-clip-text col-start-2 col-end-3 row-start-1 row-end-2 justify-self-start">
                Popular games
            </h2>


            <button
                className="custom-prev text-text-secondary hover:text-text bg-gradient-to-r from-gray-600 to-transperment rounded-sm col-start-1 col-end-2 row-start-2 row-end-3"
                aria-label="previous"
            >
                <ArrowSvg className="w-10 h-20"/>
            </button>
            <div className="col-start-2 col-end-3 row-start-3 row-end-4 justify-self-center">
                <div className="custom-pagination flex"/>
            </div>
            <button
                className="custom-next text-text-secondary hover:text-text bg-gradient-to-l from-gray-600 to-transperment rounded-sm col-start-3 col-end-4 row-start-2 row-end-3"
                aria-label="next"
            >
                <ArrowSvg className="w-10 h-20 rotate-180"/>
            </button>

            <Swiper
                modules={[Navigation, Pagination]}
                navigation={{nextEl: '.custom-next', prevEl: '.custom-prev'}}
                pagination={{el: '.custom-pagination', clickable: true}}
                observer={true}
                observeParents={true}
                loop={false}
                className="w-full max-w-7xl py-4 col-start-2 col-end-3 row-start-2 row-end-3"
                breakpoints={{
                    320: {slidesPerView: 1, slidesPerGroup: 1},
                    640: {slidesPerView: 2, slidesPerGroup: 2},
                    1024: {slidesPerView: 3, slidesPerGroup: 3},
                }}
            >
                {games?.map((game: Game) => (
                    <SwiperSlide key={game.id} className="rounded-lg overflow-hidden">
                        <div
                            className="mt-3 mb-10 mx-4 relative group rounded-xl shadow-xl/60 overflow-hidden aspect-[3/4]">
                            <img
                                src={game.background_image}
                                alt={game.name}
                                className="w-full h-full object-cover shadow-xl/30"
                            />

                            <div
                                className="absolute bottom-0 left-0 w-full h-0 bg-black/60 text-white overflow-hidden
                                           group-hover:h-full transition-all duration-500 ease-in-out
                                           flex flex-col items-center justify-end gap-4 p-4">

                                <h3 className="text-lg text-text font-semibold">{game.name}</h3>

                                {game.released && (
                                    <p className="text-sm text-gray-300">Released: {game.released}</p>
                                )}


                                {game.genres?.length > 0 && (
                                    <div className="flex flex-wrap gap-2 justify-center">
                                        {game.genres.map((genre) => (
                                            <span key={genre.id}
                                                  className="text-xs bg-gray-700 px-2 py-1 rounded-md">
                                                {genre.name}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {game.parent_platforms?.length > 0 && (
                                    <div className="flex gap-3 mt-2">
                                        {game.parent_platforms.map(({platform}) => (
                                            <PlatformIcon key={platform.id} slug={platform.slug}/>
                                        ))}
                                    </div>
                                )}
                                <Link
                                    to={`/game/${game.id}`}
                                    className="mt-2 inline-block px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                                >
                                    ...
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default PopularGamesSlider;
