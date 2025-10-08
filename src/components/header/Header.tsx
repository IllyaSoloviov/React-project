import {SettingsMenu} from "@/components/header/settings-menu/SettingsMenu.tsx";

const Header = () => {
    return (
        <header>
            <div className="bg-bg text-text shadow-xl/30 shadow-blue-650 p-4 flex items-center justify-between" >
            <div></div>
            <div className="flex items-center gap-4 ">
                <div className="text-2xl font-bold">
                    React Game
                </div>
            </div>
            <SettingsMenu/>
            </div>
        </header>
    );
};

export default Header;