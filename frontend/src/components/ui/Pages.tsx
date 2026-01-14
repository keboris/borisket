import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { type MenuProps, type SongProps } from "../../types";
import * as LucideIcons from "lucide-react";
import { useOutletContext } from "react-router";
import { useLanguage } from "../../contexts";
import { useEffect, useMemo, useRef, useState } from "react";
import { SONGS_API_URL } from "../../config";
import Loading from "./Loading";
import Back from "./Back";
import { useClickSound } from "../../lib";

const Pages = () => {
  const { menus, pathname } = useOutletContext<{
    menus: MenuProps[];
    pathname: string;
  }>();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [songs, setSongs] = useState<SongProps[]>([]);
  const [page, setPage] = useState(1);

  const playClick = useClickSound();

  const PER_PAGE_DESKTOP = 8;
  const PER_PAGE_MOBILE = 5;

  const mobileSliderRef = useRef<HTMLDivElement | null>(null);
  const [activeMobilePage, setActiveMobilePage] = useState(0);

  const chunk = <T,>(arr: T[], size: number) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
      arr.slice(i * size, i * size + size)
    );

  const handleMobileScroll = () => {
    if (!mobileSliderRef.current) return;

    const scrollLeft = mobileSliderRef.current.scrollLeft;
    const width = mobileSliderRef.current.offsetWidth;
    const index = Math.round(scrollLeft / width);

    setActiveMobilePage(index);
  };

  const fetchSongs = async ({ type }: { type: string }) => {
    try {
      setLoading(true);

      // Fetch Songs
      const songsRes = await fetch(`${SONGS_API_URL}/${type}s`);
      const songsData: SongProps[] = await songsRes.json();

      console.log("Fetched songs data:", songsData);
      setSongs(songsData || []);
      setPage(1);
    } catch (error) {
      console.error("Error fetching menus or pages:", error);
      setSongs([]); // fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (pathname === "/music/singles" && songs.length === 0) {
      fetchSongs({ type: "single" });
    }
    if (pathname === "/music/albums" && songs.length === 0) {
      fetchSongs({ type: "album" });
    }
    if (pathname === "/music/clips" && songs.length === 0) {
      fetchSongs({ type: "clip" });
    }
    if (pathname === "/music/lyrics" && songs.length === 0) {
      fetchSongs({ type: "lyric" });
    }
  }, [pathname]);

  /* Pagination desktop */
  const totalPages = Math.ceil(songs.length / PER_PAGE_DESKTOP);
  const desktopTracks = songs.slice(
    (page - 1) * PER_PAGE_DESKTOP,
    page * PER_PAGE_DESKTOP
  );

  /* Pages mobile */
  const mobilePages = useMemo(() => chunk(songs, PER_PAGE_MOBILE), [songs]);
  console.log("Pathname in Pages component:", pathname);
  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        {menus?.map((item) => {
          const Icon =
            (LucideIcons as any)[item.icon] || LucideIcons.HelpCircle;

          return (
            <motion.button
              key={item._id}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.07 }}
              onClick={() => {
                playClick();
                console.log("Clicked on menu item:", item);
                item.external
                  ? window.open(item.path, "_blank")
                  : navigate(item.path);
              }}
              className={`
                  group relative
                  bg-base-100 rounded-2xl
                  flex flex-col items-center justify-center
                  p-4 text-center
                  cursor-pointer
                  transition-all duration-300
                  shadow-md hover:shadow-2xl ${item.glow}
                  font-medium hover:font-bold
                `}
            >
              {/* HALO */}
              <div
                className={`
                    absolute inset-0 rounded-2xl
                    opacity-0 group-hover:opacity-100
                    transition duration-300
                    blur-xl
                    ${item.glow}
                  `}
              />

              {/* ICON */}
              <div className={`w-8 h-8 mb-2 relative z-10 ${item.color}`}>
                <Icon />
              </div>

              {/* LABEL */}
              <span className="text-sm relative z-10">
                {item.name[language] ?? item.name.fr}
              </span>
            </motion.button>
          );
        })}
        {pathname != "/" &&
          pathname !== "/music/singles" &&
          pathname !== "/music/albums" &&
          pathname !== "/music/clips" &&
          pathname !== "/music/lyrics" && <Back />}

        {/* SINGLES */}
        {(pathname === "/music/singles" ||
          pathname === "/music/albums" ||
          pathname === "/music/clips" ||
          pathname === "/music/lyrics") && (
          <div className="col-span-3">
            {loading && <Loading />}
            {!loading && (
              <>
                {/* ================= DESKTOP ================= */}
                <div className="hidden md:grid grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
                  {desktopTracks.map((track) => (
                    <motion.div
                      key={track._id}
                      whileTap={{ scale: 0.95 }}
                      whileHover={{ scale: 1.07 }}
                      onClick={() =>
                        navigate(
                          `/music/${pathname.split("/")[2]}/${track._id}`
                        )
                      }
                      className={`
                  group relative
                  bg-base-100 rounded-2xl
                  flex flex-col items-center justify-center
                  p-4 text-center
                  cursor-pointer
                  transition-all duration-300
                  shadow-md hover:shadow-2xl shadow-gray-500/40
                  font-medium hover:font-bold
                `}
                    >
                      {/* HALO */}
                      <div
                        className="
                    absolute inset-0 rounded-2xl
                    opacity-0 group-hover:opacity-100
                    transition duration-300
                    blur-xl shadow-gray-500/40"
                      />
                      {/* ICON */}
                      <div className="w-20 h-20 mb-2 relative z-10">
                        <img
                          src={track.coverImage}
                          alt={track.title}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      {/* LABEL */}
                      <span className="text-sm relative z-10">
                        {track.title}
                      </span>
                    </motion.div>
                  ))}
                  <Back />
                </div>
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="hidden md:flex justify-center mt-8 gap-3 mb-6">
                    {Array.from({ length: totalPages }).map((_, i) => {
                      const index = i + 1;
                      return (
                        <button
                          key={index}
                          onClick={() => setPage(index)}
                          className={`btn btn-sm rounded-full ${
                            page === index ? "btn-primary" : "btn-outline"
                          }`}
                        >
                          {index}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* ================= MOBILE (IPHONE STYLE) ================= */}
                <div className="md:hidden">
                  {/* SLIDER */}
                  <div
                    ref={mobileSliderRef}
                    onScroll={handleMobileScroll}
                    className="overflow-x-scroll snap-x snap-mandatory scroll-smooth no-scrollbar"
                  >
                    <div className="flex w-full">
                      {mobilePages.map((pageTracks, pageIndex) => (
                        <div
                          key={pageIndex}
                          className="snap-center shrink-0 w-full px-6 mb-8"
                        >
                          <div className="grid grid-cols-2 gap-6">
                            {pageTracks.map((track) => (
                              <motion.div
                                key={track._id}
                                whileTap={{ scale: 0.95 }}
                                whileHover={{ scale: 1.07 }}
                                onClick={() =>
                                  navigate(`/singles/${track._id}`)
                                }
                                className={`
                  group relative
                  bg-base-100 rounded-2xl
                  flex flex-col items-center justify-center
                  p-4 text-center
                  cursor-pointer
                  transition-all duration-300
                  shadow-md hover:shadow-2xl shadow-gray-500/40
                  font-medium hover:font-bold
                `}
                              >
                                {/* HALO */}
                                <div
                                  className="
                    absolute inset-0 rounded-2xl
                    opacity-0 group-hover:opacity-100
                    transition duration-300
                    blur-xl shadow-gray-500/40"
                                />
                                {/* ICON */}
                                <div className="w-20 h-20 mb-2 relative z-10">
                                  <img
                                    src={track.coverImage}
                                    alt={track.title}
                                    className="w-full h-full object-cover rounded-lg"
                                  />
                                </div>
                                {/* LABEL */}
                                <span className="text-sm relative z-10">
                                  {track.title}
                                </span>
                              </motion.div>
                            ))}
                            <Back />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* DOTS */}
                  <div className="flex justify-center gap-2 mt-4">
                    {mobilePages.length > 1 &&
                      mobilePages.map((_, index) => (
                        <span
                          key={index}
                          className={`
          h-2 rounded-full transition-all duration-300
          ${
            activeMobilePage === index
              ? "bg-primary w-5"
              : "bg-gray-400 dark:bg-gray-600 w-2"
          }
        `}
                        />
                      ))}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
        {/* BACK BUTTON */}
      </div>
    </>
  );
};

export default Pages;
