import { useTranslation } from "react-i18next";

export default function LangSwitcher() {
    const { i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === "en" ? "uk" : "en";
        i18n.changeLanguage(newLang);
    };

    const isEnglish = i18n.language === "en";

    return (
        <button
            onClick={toggleLanguage}
            className={`
                relative inline-flex h-7 w-12 items-center rounded-full
                transition-colors duration-300 ease-in-out bg-contrast
            `}
        >
            <span
                className={`
                    inline-block h-5 w-5 text-center transform rounded-full bg-bg text-xs font-bold
                    transition-transform duration-300 ease-in-out   
                    ${isEnglish ? "translate-x-6" : "translate-x-1"}
                `}
            >
                {isEnglish ? "en" : "uk"}
            </span>
        </button>
    );
}
