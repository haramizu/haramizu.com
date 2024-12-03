import { useEffect, useContext } from "react";
import languages, { Language } from "@/data/locales";
import { LanguageContext, ILanguageContext } from "@/contexts/languageContext";

export default function LocaleSelector() {
    const { language, setLanguage } =
        useContext<ILanguageContext>(LanguageContext);

    useEffect(() => {
        const savedLanguage = window.localStorage.getItem(
            "lang"
        ) as Language | null;
        if (savedLanguage && languages[savedLanguage]) {
            setLanguage(savedLanguage);
        }
    }, [setLanguage]);

    const handleLanguageChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const newLanguage = event.target.value as Language;
        setLanguage(newLanguage);

        window.localStorage.setItem("lang", newLanguage);
    };

    return (
        <div>
            <select onChange={handleLanguageChange} value={language || ""}>
                <option value="">Select a language</option>
                {Object.keys(languages).map((key) => (
                    <option key={key} value={key}>
                        {languages[key as Language].label}
                    </option>
                ))}
            </select>
            <p></p>
        </div>
    );
}