import React, { createContext, useContext, useMemo, useEffect, useState } from "react";

const LanguageContext = createContext({ lang: "en", setLang: () => {}, t: (k) => k });

const translations = {
  en: {
    PROPERTIES: "PROPERTIES",
    ExclusiveListings: "Exclusive Listings",
    OurSoldListings: "Our Sold Listings",
    Contact: "Contact",
    Phone: "(201)-742-1625",
    Home: "Home",
    About: "About",
    Emma: "Emma",
    FeaturedListings: "Featured Listings",
    HomeValuation: "Home Valuation",
    LetsConnect: "Let's Connect",
    LatestVideos: "Latest Videos",
  },
  zh: {
    PROPERTIES: "房源",
    ExclusiveListings: "独家房源",
    OurSoldListings: "已售房源",
    Contact: "联系",
    Phone: "(201)-742-1625",
    Home: "首页",
    About: "关于",
    Emma: "Emma",
    FeaturedListings: "精选房源",
    HomeValuation: "房屋估价",
    LetsConnect: "联系我们",
    LatestVideos: "最新视频",
  },
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem("app_lang") || "en");
  useEffect(() => {
    localStorage.setItem("app_lang", lang);
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  }, [lang]);

  const t = useMemo(() => {
    const dict = translations[lang] || translations.en;
    return (key) => dict[key] ?? key;
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, t]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}
