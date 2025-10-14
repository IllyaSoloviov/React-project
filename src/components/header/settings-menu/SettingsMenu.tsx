import { useState } from "react";
import ThemeSwitcher from "@/components/theme-switcher/ThemeSwitcher.tsx";
import {SettingsSvg} from "@/assets/icons/Settings.svg.tsx";
import LangSwitcher from "@/components/lang-switcher/LangSwitcher.tsx";
import { useTranslation } from "react-i18next";


export const SettingsMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useTranslation();

    const toggleMenu = () => setIsOpen(prev => !prev);

    return (
        <div className="relative flex flex-row items-center gap-4 mr-4">
            <button
                onClick={toggleMenu}
                className="cursor-pointer transition-transform duration-500 z-20"
            >
                <SettingsSvg
                    className={`h-6 w-6 text-text hover:text-accent transition-transform duration-500 ${
                        isOpen ? "-rotate-60" : "rotate-0"
                    }`}
                />
            </button>


            <div
                className={`absolute z-10 -top-1 -right-1 bg-bg rounded-xl shadow-lg/30 p-4 pt-9 w-48 transform transition-all duration-300 origin-top ${
                    isOpen
                        ? "opacity-100 scale-y-100"
                        : "opacity-0 scale-y-0 pointer-events-none"
                }`}
                style={{
                    transition: "opacity 0.3s ease-in, transform 0.3s ease",
                }}
            >
                <ul className="flex flex-col gap-4 text-text">
                    <li className=" cursor-pointer">
                        <span className="hover:text-accent transition-colors">
                            {t("settings.profile")}
                        </span>
                    </li>
                    <li className="cursor-pointer flex items-center justify-between">
                        <span className="hover:text-accent transition-colors">
                             {t("settings.language")}
                        </span>
                        <LangSwitcher/>
                    </li>
                    <li className="cursor-pointer flex items-center justify-between">
                        <span className="hover:text-accent transition-colors">
                            {t("settings.theme")}
                        </span>
                        <ThemeSwitcher/>
                    </li>
                    <li className="cursor-pointer">
                        <span className="hover:text-accent transition-colors">
                            {t("settings.exit")}
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    );
};
