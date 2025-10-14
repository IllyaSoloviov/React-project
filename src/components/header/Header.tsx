import {SettingsMenu} from "@/components/header/settings-menu/SettingsMenu.tsx";
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <header>
            <div
                className="relative bg-linear-to-t from-bg-secondary to-bg to-50% text-text shadow-xl/15 shadow-blue-650 p-4 flex items-center justify-between">
                <div className="flex gap-4 text-center text-2xl font-bold ml-4">
                    <Link to={'/'}>React Game</Link>
                </div>
                <SettingsMenu/>
            </div>
        </header>
    );
};

export default Header;