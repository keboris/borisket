import { Outlet, useLocation } from "react-router";
import { MENUPAGES_API_URL, MENUS_API_URL } from "../config";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Loading, SocialIcons } from "../components";
import type { MenuPageProps, MenuProps } from "../types";
import { useLanguage } from "../contexts";

const Layout = () => {
  const { pathname } = useLocation();
  const { language } = useLanguage();
  const [time, setTime] = useState(new Date());

  const [loading, setLoading] = useState(false);
  const [menus, setMenus] = useState<MenuProps[]>([]);
  const [menuPage, setMenuPage] = useState<MenuPageProps | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch menuPages
        const pagesRes = await fetch(`${MENUPAGES_API_URL}`);
        const pagesData: MenuPageProps[] = await pagesRes.json();

        // Déterminer la page actuelle
        let currentMenuPage: MenuPageProps | undefined;
        let parentId: string | null = null;

        if (pathname === "/") {
          currentMenuPage = pagesData.find((page) => page.matchPath === "/");
          parentId = null;
          document.title = "Boris Ket - Home";
        } else {
          currentMenuPage = pagesData.find(
            (page) => page.matchPath === pathname
          );
          parentId = currentMenuPage?.menuItems?._id ?? null;
          document.title =
            (currentMenuPage
              ? currentMenuPage.menuItems?.name[language] ??
                currentMenuPage.menuItems?.name.fr
              : "Not Found") + " - Boris Ket";
        }
        console.log("Current Menu Page:", currentMenuPage);
        console.log("Determined parentId:", parentId);
        setMenuPage(currentMenuPage || null);

        // Fetch menus pour la grille
        const menusRes = await fetch(`${MENUS_API_URL}/parent/${parentId}`);
        const menusData: MenuProps[] = await menusRes.json();

        setMenus(menusData || []);
      } catch (error) {
        console.error("Error fetching menus or pages:", error);
        setMenus([]); // fallback
        setMenuPage(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pathname]);

  /* Update time every second */
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const hour = time.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const date = time.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  if (loading) return <Loading />;

  return (
    <>
      <div className="max-w-7xl mx-auto pt-24 md:pt-28 px-6 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* LEFT */}
        <div className="flex flex-col gap-2">
          <p className="text-3xl md:text-5xl font-bold text-center md:text-left">
            {hour}
          </p>
          <p className="opacity-70 capitalize text-center md:text-left">
            {date}
          </p>

          {menuPage && (
            <div className="relative w-full h-16 md:h-96 rounded-lg mt-2 overflow-hidden bg-black text-white">
              <img
                src={menuPage.image}
                alt={menuPage.title[language] ?? menuPage.title.fr}
                className="absolute inset-0 w-full h-full object-cover opacity-40"
              />

              <motion.div
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1 }}
                className="relative z-10 flex flex-col items-center justify-center h-full text-center"
              >
                <h2 className="text-white text-xl md:text-2xl font-bold drop-shadow-lg">
                  {menuPage.title[language] ?? menuPage.title.fr}
                </h2>
                <p className="mt-1 md:mt-2 text-white text-sm md:text-lg opacity-90 drop-shadow-md max-w-md">
                  {menuPage.description[language] ?? menuPage.description.fr}
                </p>

                {/* Réseaux sociaux */}
                <div className="absolute bottom-4 w-full hidden md:flex justify-center space-x-6 text-xl drop-shadow-md">
                  <SocialIcons />
                </div>
              </motion.div>
            </div>
          )}
        </div>

        {/* RIGHT */}
        <Outlet context={{ menus, pathname }} />

        {/* FOOTER MOBILE SOCIALS */}
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10 flex flex-col md:hidden items-center justify-center h-full text-center"
        >
          {/* Réseaux sociaux */}
          <div className="w-full flex justify-center space-x-6 text-white text-xl drop-shadow-md mb-4">
            <SocialIcons />
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Layout;
