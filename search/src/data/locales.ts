export type Language = "en" | "ja";

export interface LanguageInfo {
  country: string;
  language: Language;
  label: string;
}

const languages: Record<Language, LanguageInfo> = {
  en: { country: "us", language: "en", label: "English" },
  ja: { country: "jp", language: "ja", label: "日本語" },
};

export default languages;