import {SettingsMenu} from "@/components/header/settings-menu/SettingsMenu.tsx";
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <header>
            <div className="bg-bg text-text shadow-xl/30 shadow-blue-650 p-4 flex items-center justify-between" >
            <div></div>
            <div className="flex items-center gap-4 ">
                <div className="text-2xl font-bold">
                    <Link to={'/'} >React Game</Link>
                </div>
            </div>
            <SettingsMenu/>
            </div>
        </header>
    );
};

export default Header;