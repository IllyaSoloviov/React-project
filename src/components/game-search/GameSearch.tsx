import {useState, useEffect, useRef} from 'react';
import {useDebounce} from '@/hooks/useDebounce';
import {useSearchGamesQuery} from '@/hooks/usePopularGamesQuery';
import {Link} from 'react-router-dom';
import {SearchSvg} from "@/assets/icons/Search.svg.tsx";
import {useTranslation} from "react-i18next";

export const GameSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [submittedTerm, setSubmittedTerm] = useState(''); // для кнопки поиска
    const debouncedSearchTerm = useDebounce(submittedTerm || searchTerm, 500);
    const { t } = useTranslation();
    const {data: games, isLoading} = useSearchGamesQuery(debouncedSearchTerm);

    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setDropdownVisible(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        if (e.target.value) {
            setDropdownVisible(true);
        } else {
            setDropdownVisible(false);
        }
    };

    const handleSearchClick = () => {
        if (searchTerm.trim()) {
            setSubmittedTerm(searchTerm.trim());
            setDropdownVisible(true);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearchClick();
        }
    };

    return (
        <div className="w-full mt-6 flex items-center justify-center">
            <div ref={searchRef} className="relative flex w-full max-w-xs md:max-w-sm">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onFocus={() => searchTerm && setDropdownVisible(true)}
                    placeholder={t("mainPage.searchGames")}
                    className="
            w-full px-4 py-2
            text-sm text-text
            bg-bg/80
            border border-transparent
            rounded-l-xl
            focus:outline-none
            placeholder:text-text-secondary
            shadow-md
            transition-all duration-200
        "
                />

                <button
                    onClick={handleSearchClick}
                    aria-label="Search"
                    className="
            px-4 py-2
            bg-linear-to-l from-bg-accent-alt from-60% to-bg/80
            rounded-r-xl
            flex items-center justify-center
            transition-all duration-150 shadow-md">
                    <SearchSvg className="w-5 h-5 text-white"/>
                </button>


                {isDropdownVisible && debouncedSearchTerm && (
                    <div
                        className="absolute top-full left-0 z-10 w-full mt-2 bg-bg/90 border border-gray-700 rounded-lg shadow-lg max-h-80 overflow-y-auto">
                        {isLoading && <div className="p-4 text-text">Loading...</div>}

                        {!isLoading && games && games.length > 0 && (
                            <ul>
                                {games.map((game) => (
                                    <li key={game.id}>
                                        <Link
                                            to={`/game/${game.id}`}
                                            onClick={() => {
                                                setSearchTerm('');
                                                setSubmittedTerm('');
                                                setDropdownVisible(false);
                                            }}
                                            className="flex my-1 items-center p-3 hover:bg-linear-to-t from-bg/20 rounded-md via-bg3/60 to-bg/20 transition-colors duration-250"
                                        >
                                            <img
                                                src={game.background_image}
                                                alt={game.name}
                                                className="w-16 h-10 object-cover rounded-md mr-4"
                                            />
                                            <span className="text-text font-medium">{game.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}

                        {!isLoading && games?.length === 0 && (
                            <div className="p-4 text-gray-400">No games found.</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
