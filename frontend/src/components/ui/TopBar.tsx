import { Moon, Sun } from "lucide-react";
import { useLanguage, useTheme } from "../../contexts";
import ReactCountryFlag from "react-country-flag";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

const TopBar = () => {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();

  function useIsDesktop() {
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

    useEffect(() => {
      const onResize = () => setIsDesktop(window.innerWidth >= 768);
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }, []);

    return isDesktop;
  }

  const isDesktop = useIsDesktop();
  let logo;
  isDesktop
    ? (logo = theme === "light" ? "/logo-desk-dark.png" : "/logo-desk.png")
    : (logo = theme === "light" ? "/logo-dark.png" : "/logo.png");

  return (
    <div
      className={`top-0 fixed z-90 left-0 right-0 bg-base-200 ${
        theme === "light" ? "text-black" : "text-white"
      } flex items-center justify-between px-4 sm:px-6 py-2 border-b border-base-300 shadow-sm`}
    >
      {/* LOGO */}
      <img
        src={logo}
        alt="Boris Ket"
        className="h-10 sm:h-16 cursor-pointer"
        onClick={() => navigate("/")}
      />

      <div className="flex items-center gap-2">
        <button
          onClick={() =>
            setLanguage(
              language === "fr" ? "en" : language === "en" ? "de" : "fr",
            )
          }
          className="p-2.5 rounded-lg text-white hover:bg-white/10 transition-all flex items-center space-x-1 cursor-pointer"
          title="Change Language"
        >
          <ReactCountryFlag
            countryCode={
              language === "fr" ? "FR" : language === "en" ? "GB" : "DE"
            }
            svg
            style={{
              width: "0.9em",
              height: "0.9em",
              borderRadius: "3px",
              marginRight: "6px",
            }}
          />
          <span
            className={`text-sm font-medium uppercase ${
              theme === "light" ? "text-black" : "text-white"
            }`}
          >
            {language}
          </span>
        </button>

        {/* THEME */}
        <button
          onClick={() => setTheme()}
          className="btn btn-outline btn-sm rounded-full cursor-pointer"
        >
          {theme === "light" ? (
            <Moon className="w-4 h-4" />
          ) : (
            <Sun className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
};

export default TopBar;
