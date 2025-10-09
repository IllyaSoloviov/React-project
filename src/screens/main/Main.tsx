import PopularGamesSlider from "@/components/swipers/PopularGamesSlider.tsx";
import GamesGrid from "@/components/games-grid/GamesGrid.tsx";




const Main = () => {
    return (
        <main className="flex-1 bg-bg-secondary flex flex-col justify-center items-center p-8">
           <PopularGamesSlider />
            <GamesGrid/>
        </main>
    );
};

export default Main;
