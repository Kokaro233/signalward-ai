"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Language = "en" | "zh";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);
const LANGUAGE_KEY = "signalward-language";
const LEGACY_LANGUAGE_KEY = "lucid-language";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const saved =
      window.localStorage.getItem(LANGUAGE_KEY) ??
      window.localStorage.getItem(LEGACY_LANGUAGE_KEY);
    if (saved === "zh" || saved === "en") {
      setLanguageState(saved);
      window.localStorage.setItem(LANGUAGE_KEY, saved);
    }
  }, []);

  function setLanguage(nextLanguage: Language) {
    setLanguageState(nextLanguage);
    window.localStorage.setItem(LANGUAGE_KEY, nextLanguage);
    document.documentElement.lang = nextLanguage === "zh" ? "zh-CN" : "en";
  }

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage: () => setLanguage(language === "en" ? "zh" : "en")
    }),
    [language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider.");
  }
  return context;
}
