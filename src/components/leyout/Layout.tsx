import Header from "../header/Header.tsx";
import {Outlet} from "react-router";
import Footer from "../footer/Footer.tsx";


export default function Layout(){
    return (
        <div className={"relative w-full h-auto overflow-y-auto flex flex-col justify-center min-h-dvh "}>
            <Header />
            <>
                <Outlet/>
            </>
            <Footer />
        </div>
    );
};