import { Outlet, useLocation, useParams } from "react-router";
import { MENUPAGES_API_URL, MENUS_API_URL, SONGS_API_URL } from "../config";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BreadCrumbs, Loading, SocialIcons } from "../components";
import type { MenuPageProps, MenuProps, SongProps } from "../types";
import { useLanguage } from "../contexts";
import { isMatchPath, isShortLink } from "../lib";
import * as LucideIcons from "lucide-react";

const Layout = () => {
  const { pathname } = useLocation();
  const { language } = useLanguage();
  const [time, setTime] = useState(new Date());

  const { slug } = useParams();

  const [loading, setLoading] = useState(false);
  const [menus, setMenus] = useState<MenuProps[]>([]);
  const [allMenus, setAllMenus] = useState<MenuProps[]>([]);
  const [menuPage, setMenuPage] = useState<MenuPageProps | null>(null);
  const [track, setTrack] = useState<SongProps | null>(null);

  // Define pathnameToCheck for use in BreadCrumbs
  let pathnameToCheck = pathname;
  if (isShortLink(pathname, "s")) {
    pathnameToCheck = "/music/singles/" + slug;
  }

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
        let currentPage: SongProps | null = null;
        let menuName: string | null = null;

        if (pathname === "/") {
          currentMenuPage = pagesData.find((page) => page.matchPath === "/");
          parentId = null;
          document.title = "Boris Ket - Home";
        } else {
          currentMenuPage = pagesData.find(
            (page) => page.matchPath === pathnameToCheck,
          );

          if (!currentMenuPage) {
            const matchedPage = pagesData.find((page) =>
              isMatchPath(pathnameToCheck, page.matchPath),
            );
            if (matchedPage) {
              currentMenuPage = matchedPage;
              if (pathnameToCheck.startsWith("/music/")) {
                const songData: SongProps = await fetch(
                  `${SONGS_API_URL}/slug/${slug}`,
                ).then((res) => res.json());
                currentPage = songData._id ? songData : null;
              }
            }
          }

          parentId = currentMenuPage?.menuItems?._id ?? null;

          if (currentPage) {
            menuName =
              currentPage.title +
              (currentPage.feat ? ` ft. ${currentPage.feat}` : "");
          } else {
            menuName =
              currentMenuPage?.menuItems?.name[language] ??
              currentMenuPage?.menuItems?.name.fr ??
              "Boris Ket";
          }

          document.title = menuName.includes("Boris Ket")
            ? menuName
            : `${menuName} - Boris Ket`;
        }
        console.log("Current Menu Page:", currentMenuPage);
        console.log("Determined parentId:", parentId);
        setTrack(currentPage || null);
        setMenuPage(currentMenuPage || null);

        // Fetch menus pour la grille
        const menusRes = await fetch(`${MENUS_API_URL}/parent/${parentId}`);
        const menusData: MenuProps[] = await menusRes.json();

        setMenus(menusData || []);

        // Fetch all menus pour la grille
        const allMenusRes = await fetch(`${MENUS_API_URL}`);
        const allMenusData: MenuProps[] = await allMenusRes.json();

        setAllMenus(allMenusData || []);
      } catch (error) {
        console.error("Error fetching menus or pages:", error);
        setTrack(null);
        setMenus([]); // fallback
        setAllMenus([]); // fallback
        setMenuPage(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pathname, language, slug]);

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

  const Icon =
    (LucideIcons as any)[menuPage?.menuItems?.icon ?? "HelpCircle"] ||
    LucideIcons.HelpCircle;
  console.log("Menu Page in Layout:", menuPage);

  return (
    <>
      {/* ================= MOBILE BACKGROUND ================= */}
      {pathnameToCheck !== "/" && (
        <>
          {/* BREADCRUMBS MOBILE */}
          <div className="md:hidden mb-12">
            <BreadCrumbs
              track={track}
              menus={allMenus}
              pathnameToCheck={pathnameToCheck}
            />
          </div>
        </>
      )}

      {menuPage && (
        <>
          {slug && track ? (
            <img
              className="absolute top-[80px] left-0 w-full h-[calc(100vh-80px)] object-cover opacity-40 md:hidden"
              src={track?.coverImage}
              alt={track?.title}
            />
          ) : (
            <img
              src={menuPage.image}
              alt=""
              className="absolute inset-0 w-full h-full object-cover md:hidden "
            />
          )}
          <div className="absolute inset-0 bg-white/70 dark:bg-black/70 backdrop-blur-sm md:hidden" />
        </>
      )}

      <div className="max-w-7xl mx-auto pt-24 md:pt-28 px-6 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 relative">
        {/* LEFT */}
        <div className="flex flex-col gap-2">
          {/* TIME & DATE */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden md:grid md:grid-flow-col md:auto-cols-max md:gap-6 items-center"
          >
            <div className="flex flex-col items-start">
              <p className="md:text-5xl font-bold">{hour}</p>
              <p className="opacity-70 capitalize">{date}</p>
            </div>

            <BreadCrumbs
              track={track}
              menus={allMenus}
              pathnameToCheck={pathnameToCheck}
            />
          </motion.div>

          {/* PAGE HEADER */}

          {menuPage && (
            <div className="relative w-full h-16 md:h-96 rounded-lg mt-2 overflow-hidden md:bg-black text-white bg-none">
              {/* Desktop image */}
              {slug && track ? (
                <img
                  className="hidden md:block absolute inset-0 w-full h-full object-cover opacity-40"
                  src={track?.coverImage}
                  alt={track?.title}
                />
              ) : (
                <img
                  className="hidden md:block absolute inset-0 w-full h-full object-cover opacity-40"
                  src={menuPage.image}
                  alt={menuPage.title[language] ?? menuPage.title.fr}
                />
              )}

              <motion.div
                initial={{ scale: 1.05 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1 }}
                className="relative z-10 flex flex-col items-center justify-center h-full text-center"
              >
                {menuPage?.menuItems?.icon && (
                  <Icon className="text-white opacity-90" size={48} />
                )}
                <h2 className="text-white text-xl md:text-2xl font-bold drop-shadow-lg">
                  {slug && track
                    ? track.title
                    : (menuPage.title[language] ?? menuPage.title.fr)}
                </h2>
                <p className="mt-1 md:mt-2 text-white text-sm md:text-lg opacity-90 drop-shadow-md max-w-md">
                  {slug && track
                    ? track.artist
                    : (menuPage.description[language] ??
                      menuPage.description.fr)}
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
        <Outlet context={{ menus, track, pathname }} />

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
