import { useEffect, useState } from "react";
import { Container } from "../layouts/Container";

const USER_SAVED_THEME_KEY = "user-pref-theme";
const HTML_THEME_KEY = "data-theme";

export const Header = () => {
  console.log(localStorage.getItem(USER_SAVED_THEME_KEY));
  const [theme, setTheme] = useState(localStorage.getItem(USER_SAVED_THEME_KEY) || "light");

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

  return (
    <header className="bg-white text-gray-950 shadow-sm dark:bg-blue-900 dark:text-white">
      <Container>
        <div className="flex items-center justify-between py-6">
          <h1 className="font-extra-bold text-2xl leading-8">Where in the world?</h1>
          <button
            className="flex aspect-square w-8 items-center justify-center rounded-sm transition-[scale,color] active:scale-95"
            type="button"
            aria-label="Turn on dark mode"
            aria-pressed={theme === "dark"}
            onClick={toggleTheme}
          >
            <svg
              className={theme == "light" ? "hidden" : ""}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2" />
              <path d="M12 20v2" />
              <path d="m4.93 4.93 1.41 1.41" />
              <path d="m17.66 17.66 1.41 1.41" />
              <path d="M2 12h2" />
              <path d="M20 12h2" />
              <path d="m6.34 17.66-1.41 1.41" />
              <path d="m19.07 4.93-1.41 1.41" />
            </svg>
            <svg
              className={theme == "dark" ? "hidden" : ""}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 5h4" />
              <path d="M20 3v4" />
              <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" />
            </svg>
          </button>
        </div>
      </Container>
    </header>
  );
};
