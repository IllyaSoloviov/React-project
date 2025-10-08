import './index.css'
import {Routes, Route} from "react-router";
import Layout from "./components/leyout/Layout.tsx";
import {RouterEnum} from "./config/RouterEnum.ts";
import Main from "./screens/main/Main.tsx";
import Providers from "@/providers/Providers.tsx";
import GamePage from "@/screens/game-page/GamePage.tsx";



function App() {

    return (
        <Providers>
            <Routes>
                <Route path={RouterEnum.MAIN} element={<Layout/>}>
                    {/*компоненти які рендеряться у Layout і з ними відображається header*/}
                    <Route index element={<Main/>}/>
                    <Route path="/game/:id" element={<GamePage/>} />
                </Route>
            </Routes>
        </Providers>
    )
}

export default App
