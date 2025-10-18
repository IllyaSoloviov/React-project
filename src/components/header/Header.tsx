import {Link, useNavigate} from "react-router-dom";
import {SettingsMenu} from "@/components/header/settings-menu/SettingsMenu";
import {useState} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {useGenresQuery} from "@/hooks/useGamesGridQuery.ts";
import {useTranslation} from "react-i18next";

const Header = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const {data: genres, isLoading} = useGenresQuery();
    const navigate = useNavigate();
    const {t} = useTranslation();

    const handleGenreClick = (slug: string) => {
        setIsMenuOpen(false);
        navigate(`/genre/${slug}`);
    };

    const toggleMainMenu = () => {
        setIsMenuOpen(prev => !prev);
        if (window.innerWidth < 768) setIsSettingsOpen(false);
    };

    const toggleSettingsMenu = () => {
        setIsSettingsOpen(prev => !prev);
        if (window.innerWidth < 768) setIsMenuOpen(false);
    };

    return (
        <header className="sticky top-0 z-40">
            <div
                className="relative bg-gradient-to-t from-bg-secondary to-bg
        text-text shadow-lg shadow-slate-900/40 p-4
        flex items-center justify-between"
            >
                <button
                    onClick={toggleMainMenu}
                    className="p-2 rounded-md hover:bg-contrast/30 transition-colors"
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? (
                        // Крестик
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    ) : (
                        // Бургер
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
                        </svg>
                    )}
                </button>

                <Link
                    to="/"
                    className=" px-4 mb-1 text-2xl justify-self-start sm:justify-self-start font-bold tracking-wide hover:text-indigo-400 transition-colors"
                    onClick={() => {
                        setIsMenuOpen(false);
                        setIsSettingsOpen(false);
                    }}
                >
                    React Game
                </Link>
                <div className={'ml-0 md:ml-auto'}>
                    <SettingsMenu
                        isOpen={isSettingsOpen}
                        onToggle={toggleSettingsMenu}
                    />
                </div>
            </div>

            <AnimatePresence>
                {isMenuOpen  && (
                    <motion.aside
                        key="menu"
                        initial={{x: "-100%", opacity: 0}}
                        animate={{x: 0, opacity: 1}}
                        exit={{x: "-100%", opacity: 0}}
                        transition={{duration: 0.3, ease: "easeInOut"}}
                        className="absolute left-0 top-full z-30 w-64 sm:w-72
              bg-bg/55 backdrop-blur-md border-r border-slate-700/40
              shadow-xl
              text-text rounded-r-md"
                    >
                        <nav className="flex flex-col ">
                            <Link
                                to="/"
                                onClick={() => setIsMenuOpen(false)}
                                className="px-6 py-4 text-lg font-semibold hover:bg-slate-700/50 transition-colors"
                            >
                                {t("settings.home")}
                            </Link>
                            <div className=" border-t border-slate-700/40 pt-3">
                                <h3 className="px-6 pb-2 text-lg font-semibold text-indigo-400">{t("settings.Categories")}</h3>

                                {isLoading && <p className="px-6 text-sm text-slate-400">Loading...</p>}

                                {genres?.results.map((genre) => (
                                    <button
                                        key={genre.id}
                                        onClick={() => handleGenreClick(genre.slug)}
                                        className="ml-1 text-left text-sm w-full px-6 py-2 hover:bg-slate-700/40 transition-colors"
                                    >
                                        {genre.name}
                                    </button>
                                ))}
                            </div>
                        </nav>
                    </motion.aside>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
