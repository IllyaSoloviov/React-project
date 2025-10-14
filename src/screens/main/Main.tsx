import PopularGamesSlider from "@/components/swipers/PopularGamesSlider.tsx";
import GamesGrid from "@/components/games-grid/GamesGrid.tsx";
import {GameSearch} from "@/components/game-search/GameSearch.tsx";




const Main = () => {
    return (
        <main className=" reletive flex-1 max-w-full bg-linear-to-r from-bg-secondary  via-bg3 to-bg-secondary flex flex-col justify-center items-center p-8  pt-0 xl:p-0 mt-[-1px]">
            <GameSearch/>
            <PopularGamesSlider />
            <GamesGrid/>
        </main>
    );
};

export default Main;
