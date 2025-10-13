import {useParams} from "react-router-dom";
import {useState} from "react";
import {useGameDetailsQuery, useGameScreenshotsQuery, useGameVideosQuery} from "@/hooks/usePopularGamesQuery";
import {Swiper, SwiperSlide} from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";


import {FreeMode, Navigation, Thumbs} from "swiper/modules";
import type {Swiper as SwiperType} from "swiper";
import type {Screenshot} from "@/types/rawg.types.ts";
import PlatformIcon from "@/components/platform-icon/PlatformIcon.tsx";

const GamePage = () => {
    const {id} = useParams() as { id: string };
    const {data: game, isLoading, error} = useGameDetailsQuery(id!);
    const {data: screenshots} = useGameScreenshotsQuery(id!);
    const {data: video} = useGameVideosQuery(id!);
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

    console.log(game)

    if (isLoading)
        return (
            <div className="flex justify-center items-center h-screen text-text-secondary">
                loading...
            </div>
        );

    if (error || !game)
        return (
            <div className="flex justify-center items-center h-screen text-error">
                Error loading game details.
            </div>
        );

    const mediaItems = [
        ...(video?.results?.length
            ? [{type: "video", url: video.results[0].data.max}]
            : []),
        ...(screenshots?.map((s: Screenshot) => ({type: "image", url: s.image})) ?? []),
    ];

    return (
        <div className="flex-1 bg-bg-secondary flex flex-col justify-center items-center 2xl:p-8 overflow-y-scroll">
            <div className={'w-full px-2 max-w-[500px] justify-start md:max-w-[700px] lg:max-w-[940px] flex flex-col lg:justify-center items-center space-y-4'}>
                <h1 className=" font-bold text-2xl m-3 self-center md:self-start md:font-extrabold md:text-4xl text-text tracking-tight">
                    {game.name}
                </h1>

                <div className="flex flex-col xl:flex-row-reverse  justify-center items-center w-full gap-4 ">
                    <div className="flex flex-col md:flex-row xl:flex-col justify-between gap-3 w-full">
                        <div className="min-w-[324px] ">
                            <img
                                src={game.background_image}
                                alt={game.name}
                                className="w-full h-full object-cover aspect-[2.1/1] rounded-md"
                            />
                        </div>
                        <div className="flex flex-col w-full gap-3 min-w-[324px]">
                            {game.parent_platforms?.length > 0 && (
                                <div className="flex gap-3 px-3 py-1 rounded-md bg-bg/65 w-fit">
                                    {game.parent_platforms.map(({platform}) => (
                                        <PlatformIcon key={platform.id} slug={platform.slug}/>
                                    ))}
                                </div>
                            )}
                            <p className="m-0 border-b-2 border-accent/20 pb-1 text-text-secondary leading-relaxed whitespace-pre-line overflow-hidden tracking-wide font-thin text-sm text-ellipsis line-clamp-4 pr-4">
                                {game.description_raw}
                            </p>

                            <div className="text-text-secondary text-sm m-0">
                                <span className={'font-normal tracking-wide uppercase'}>Release Date:</span> <span
                                className={'text-text ml-1 font-medium'}>
                            {new Date(game.released).toLocaleDateString('en-US', {
                                year: 'numeric', month: 'short', day: 'numeric'
                            })}</span>
                            </div>
                            <div className="flex justify-between items-center ">
                            <span
                                className="font-semibold text-text-secondary">Rating</span>
                                <div className="text-right">
                                    <p className="font-bold text-text text-lg">
                                        {game.rating}
                                        <span className="text-text-secondary text-sm font-normal"> / 5</span>
                                    </p>
                                    <p className="text-xs text-text-secondary mt-[-4px]">
                                        {game.ratings_count} votes
                                    </p>
                                </div>
                            </div>

                            {game.metacritic && (
                                <div className="flex justify-between items-center bg-background">
                                <span className="font-semibold text-text-secondary">
                                    Metacritic
                                </span>
                                    <span className="bg-success text-white font-bold text-base px-3 py-1 rounded-md">
                                    {game.metacritic}
                                </span>
                                </div>
                            )}
                        </div>
                    </div>


                    <div className="w-full max-w-[400px] sm:max-w-[600px] md:max-w-full xl:max-w-[600px] select-none">
                        <Swiper
                            style={
                                {
                                    "--swiper-navigation-color": "#fff",
                                    "--swiper-pagination-color": "#fff",
                                } as React.CSSProperties
                            }
                            loop
                            spaceBetween={10}
                            observer={true}
                            observeParents={true}
                            navigation
                            thumbs={{swiper: thumbsSwiper}}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className="rounded-md overflow-hidden mySwiper2 w-full"
                        >
                            {mediaItems.map((item, index) => (
                                <SwiperSlide key={index}>
                                    {item.type === "video" ? (
                                        <video
                                            className="w-full object-cover rounded-md"
                                            controls
                                            poster={game.background_image}
                                        >
                                            <source src={item.url} type="video/mp4"/>
                                            Your browser does not support HTML5 video. {/* Already English */}
                                        </video>
                                    ) : (
                                        <img
                                            src={item.url}
                                            alt={`screenshot-${index}`}
                                            className="w-full object-cover rounded-md"
                                        />
                                    )}
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        {mediaItems.length > 1 && (
                            <Swiper
                                onSwiper={setThumbsSwiper}
                                loop
                                spaceBetween={10}
                                slidesPerView={4}
                                freeMode
                                watchSlidesProgress
                                modules={[FreeMode, Navigation, Thumbs]}
                                className="mt-4 mySwiper w-full"
                            >
                                {mediaItems.map((item, index) => (
                                    <SwiperSlide key={`thumb-${index}`}>
                                        {item.type === "video" ? (
                                            <div className="relative w-full max-h-24">
                                                <video
                                                    className="w-full h-full object-cover rounded-lg opacity-80 hover:opacity-100 transition"
                                                    poster={game.background_image}
                                                >
                                                    <source src={item.url} type="video/mp4"/>
                                                </video>
                                                <span
                                                    className="absolute inset-0 flex items-center justify-center text-white text-sm bg-black/40 rounded-md">

                                                </span>
                                            </div>
                                        ) : (
                                            <img
                                                src={item.url}
                                                alt={`thumb-${index}`}
                                                className="w-full max-h-24 object-cover rounded-md cursor-pointer opacity-70 hover:opacity-100 transition"
                                            />
                                        )}
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        )}
                    </div>
                </div>


                <div className="w-full mt-8 text-text">
                    <div className="">
                        <h2 className="text-2xl font-bold border-b-2 border-accent/20 pb-2 mb-4">
                            Description
                        </h2>
                        <p className="text-text-secondary leading-relaxed whitespace-pre-line">
                            {game.description_raw}
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default GamePage;