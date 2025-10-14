import MoonStarIcon from "@/assets/images/moon-star.svg?react";
import SunIcon from "@/assets/images/sun.svg?react";
import { getCountryCodeBySlug, useCountryStore } from "@/stores/countryStore";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Container } from "../layouts/Container";

export const Header = () => {
  const USER_SAVED_THEME_KEY = "user-pref-theme";
  const HTML_THEME_KEY = "data-theme";
  const DEFAULT_TITLE = "Where in the world?";

  const isUserPreferDarkMode = () => window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

  const [theme, setTheme] = useState(
    localStorage.getItem(USER_SAVED_THEME_KEY) || (isUserPreferDarkMode() ? "dark" : "light"),
  );
  const [title, setTitle] = useState(DEFAULT_TITLE);

  const { pathname } = useLocation();
  const countries = useCountryStore((state) => state.countries);

  const saveTheme = () => {
    localStorage.setItem(USER_SAVED_THEME_KEY, theme);
    document.querySelector("html")?.setAttribute(HTML_THEME_KEY, theme);
  };

  const toggleTheme = () => {
    setTheme((v) => (v === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    saveTheme();
  }, [theme]);

  useEffect(() => {
    if (pathname != "/") {
      const countryCode = getCountryCodeBySlug(pathname.slice(1));
      const country = countries.find((v) => v.cca3 === countryCode);
      if (!country) return;
      setTitle(country.name.common);
    } else {
      setTitle(DEFAULT_TITLE);
    }
  }, [pathname]);

  return (
    <header className="bg-white text-gray-950 shadow-sm dark:bg-blue-900 dark:text-white">
      <Container>
        <div className="flex items-center justify-between py-6">
          <h1 className="font-extra-bold text-2xl leading-8">{title}</h1>
          <button
            className="flex aspect-square w-8 items-center justify-center rounded-sm transition-[scale,color] active:scale-95"
            type="button"
            aria-label="Turn on dark mode"
            aria-pressed={theme === "dark"}
            onClick={toggleTheme}
          >
            <SunIcon className={theme == "light" ? "hidden" : ""} />
            <MoonStarIcon className={theme == "dark" ? "hidden" : ""} />
          </button>
        </div>
      </Container>
    </header>
  );
};
