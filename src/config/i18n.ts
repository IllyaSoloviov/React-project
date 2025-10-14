import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "@/locales/en/en.translations.json";
import uk from "@/locales/uk/uk.translations.json"; // у тебя язык "uk", но файл можно оставить как ua.json

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            uk: { translation: uk },
        },
        lng: "en", // язык по умолчанию
        fallbackLng: "en",
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
