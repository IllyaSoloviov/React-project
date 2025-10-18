import { motion, AnimatePresence } from "framer-motion";
import ThemeSwitcher from "@/components/theme-switcher/ThemeSwitcher.tsx";
import LangSwitcher from "@/components/lang-switcher/LangSwitcher.tsx";
import { SettingsSvg } from "@/assets/icons/Settings.svg.tsx";
import { useTranslation } from "react-i18next";
import type {FC} from "react";

interface SettingsMenuProps {
    isOpen: boolean;
    onToggle: () => void;
}

export const SettingsMenu: FC<SettingsMenuProps> = ({ isOpen, onToggle }) => {
    const { t } = useTranslation();

    return (
        <div className=" flex items-center justify-end ">
            <button
                onClick={onToggle}
                aria-label="Toggle settings"
                className="p-2 rounded-md hover:bg-contrast/30 transition-colors z-40"
            >
                <SettingsSvg
                    className={`h-6 w-6 text-text hover:scale-105 transition-transform duration-500 ${
                        isOpen ? "rotate-90" : "rotate-0"
                    }`}
                />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.aside
                        key="settings-menu"
                        initial={{ x: "100%", opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: "100%", opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="absolute right-0 top-full z-40 w-64 sm:w-72
                            bg-bg/70 backdrop-blur-md border-l border-slate-700/40
                            shadow-2xl
                            text-text rounded-l-md overflow-hidden"
                    >
                        <nav className="flex flex-col py-4">
                            <h3 className="px-6 pb-3 text-lg font-semibold text-indigo-400 border-b border-slate-700/40">
                                {t("settings.title") || "Settings"}
                            </h3>

                            <ul className="flex flex-col gap-2 mt-2">
                                <li className="px-6 py-2 text-text-secondary text-sm hover:bg-slate-700/40 transition-colors cursor-pointer">
                                    {t("settings.profile")}
                                </li>

                                <li className="px-6 py-2 text-text text-sm flex justify-between items-center hover:bg-slate-700/40 transition-colors cursor-pointer">
                                    <span>{t("settings.language")}</span>
                                    <LangSwitcher />
                                </li>

                                <li className="px-6 py-2 text-sm flex justify-between items-center hover:bg-slate-700/40 transition-colors cursor-pointer">
                                    <span>{t("settings.theme")}</span>
                                    <ThemeSwitcher />
                                </li>

                                <li className="px-6 py-2 text-text-secondary text-sm hover:bg-slate-700/40 transition-colors cursor-pointer">
                                    {t("settings.exit")}
                                </li>
                            </ul>
                        </nav>
                    </motion.aside>
                )}
            </AnimatePresence>
        </div>
    );
};
