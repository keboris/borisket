import { useEffect, useState } from "react";
import { Link } from "react-router";

const NavBar = () => {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "dark" | "light";
    const applied = saved ?? "dark";
    setTheme(applied);
    document.documentElement.setAttribute("data-theme", applied);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  };

  return (
    <header className="fixed top-0 z-50 w-full">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mt-4 rounded-2xl bg-base-100/70 backdrop-blur-xl border border-base-300 shadow-lg">
          <div className="flex items-center justify-between px-6 py-4">
            {/* LOGO */}
            <Link
              to="/"
              className="text-2xl font-extrabold tracking-[0.25em] uppercase"
            >
              BORISKET
            </Link>

            {/* MENU DESKTOP */}
            <nav className="hidden md:flex gap-10 text-sm uppercase tracking-widest">
              <a href="#playlist" className="hover:opacity-70 transition">
                Sons
              </a>
              <a href="#videos" className="hover:opacity-70 transition">
                Vidéos
              </a>
              <a href="#gallery" className="hover:opacity-70 transition">
                Galerie
              </a>
            </nav>

            {/* ACTIONS */}
            <div className="flex items-center gap-4">
              {/* Theme */}
              <button
                onClick={toggleTheme}
                className="btn btn-ghost btn-circle text-lg"
              >
                {theme === "dark" ? "🌙" : "☀️"}
              </button>

              {/* CTA */}
              <Link
                to="/app/subscribe"
                className="btn btn-sm btn-primary rounded-full px-6"
              >
                Rejoindre
              </Link>

              {/* MOBILE */}
              <label htmlFor="menu-drawer" className="btn btn-ghost md:hidden">
                ☰
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      <input
        id="menu-drawer"
        type="checkbox"
        className="drawer-toggle hidden"
      />
      <div className="drawer drawer-end">
        <div className="drawer-side z-50">
          <label htmlFor="menu-drawer" className="drawer-overlay"></label>
          <div className="min-h-full w-80 bg-base-100 p-8">
            <ul className="menu text-lg gap-4 uppercase tracking-widest">
              <li>
                <a href="#playlist">Sons</a>
              </li>
              <li>
                <a href="#videos">Vidéos</a>
              </li>
              <li>
                <a href="#gallery">Galerie</a>
              </li>
              <li>
                <Link to="/app/subscribe">S’abonner</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
