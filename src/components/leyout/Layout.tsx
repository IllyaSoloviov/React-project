import Header from "../header/Header.tsx";
import {Outlet} from "react-router";
import Footer from "../footer/Footer.tsx";


export default function Layout(){
    return (
        <div className={"flex flex-col min-h-screen min-w-screen"}>
            <Header />
            <>
                <Outlet/>
            </>
            <Footer />
        </div>
    );
};