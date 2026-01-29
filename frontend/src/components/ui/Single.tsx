import { useOutletContext } from "react-router";
import {
  FaSpotify,
  FaApple,
  FaYoutube,
  FaDeezer,
  FaCopy,
  FaShareAlt,
  FaPlay,
  FaLink,
  FaVideo,
  FaList,
} from "react-icons/fa";
import type { Platform, SongProps } from "../../types";
import { useTheme } from "../../contexts";

const Single = () => {
  const { track } = useOutletContext<{
    track: SongProps | undefined;
  }>();

  const { theme } = useTheme();
  const bgColor = theme === "light" ? "bg-white" : "bg-neutral-900";

  // Fetch song data

  if (!track) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${bgColor} text-white`}
      >
        <p>Track not found.</p>
      </div>
    );
  }

  const platforms: Platform[] = [
    {
      name: "Spotify",
      url: track.links.spotify,
      icon: <FaSpotify size={22} />,
      bg: "bg-[#1DB954]",
      action: "Écouter",
      actionIcon: <FaPlay size={14} />,
      text: "text-[#1DB954]",
      border: "#1DB954",
    },
    {
      name: "Apple Music",
      url: track.links.apple,
      icon: <FaApple size={22} />,
      bg: "bg-black",
      action: "Écouter",
      actionIcon: <FaPlay size={14} />,
      text: "text-black",
      border: "#000000",
    },
    {
      name: "YouTube",
      url: track.links.youtube,
      icon: <FaYoutube size={22} />,
      bg: "bg-[#FF0000]",
      action: "Regarder",
      actionIcon: <FaVideo size={14} />,
      text: "text-[#FF0000]",
      border: "#FF0000",
    },
    {
      name: "Deezer",
      url: track.links.deezer,
      icon: <FaDeezer size={22} />,
      bg: "bg-[#A238FF]",
      action: "Écouter",
      actionIcon: <FaPlay size={14} />,
      text: "text-[#A238FF]",
      border: "#A238FF",
    },
    {
      name: "Autres",
      url: track.links.other,
      icon: <FaLink size={22} />,
      bg: "bg-[#3B82F6]",
      action: "Consulter",
      actionIcon: <FaList size={14} />,
      text: "text-[#3B82F6]",
      border: "#3B82F6",
    },
  ];

  return (
    <div className="flex items-center justify-center gap-4">
      <div className="w-full max-w-sm rounded-3xl text-center shadow-2xl overflow-hidden sm:max-w-md sm:rounded-none sm:shadow-none">
        {/* BACKGROUND IMAGE */}
        <div className="relative h-64 md:hidden">
          {/* Image en fond */}
          <img
            src={track?.coverImage}
            alt={track?.title}
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />

          {/* Overlay blur */}
          <div className="absolute inset-0 bg-white/20 dark:bg-black/20 backdrop-blur-sm" />

          {/* Image nette au centre */}
          <div className="relative z-10 flex items-center justify-center h-full">
            <img
              src={track?.coverImage}
              alt={track?.title}
              className="w-48 h-48 rounded-2xl shadow-lg object-cover"
            />
          </div>
        </div>

        {/* TITLE}
        <h1 className="text-xl font-bold text-white">{track.title}</h1>
        <p className="text-sm text-white/60 mb-6">{track.artist}</p>

        {/* PLATFORMS */}
        <div className="space-y-3 bg-base-200 sm:mt-8">
          {platforms.map(
            (p) =>
              p.url && (
                <div
                  key={p.name}
                  className={`
                    flex items-center justify-between
                    w-full px-4 py-3
                    rounded-xl
                    ${theme === "dark" ? p.text : "text-white"}
                  `}
                >
                  {/* LEFT : ICON + NAME */}
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center ${
                        theme === "light" ? p.bg : "bg-white"
                      }`}
                    >
                      {p.icon}
                    </div>

                    <span
                      className={`text-sm sm:text-lg whitespace-nowrap font-semibold ${
                        theme === "light" ? "text-black" : "text-white"
                      }`}
                    >
                      {p.name}
                    </span>
                  </div>

                  {/* RIGHT : ACTIONS */}
                  <div className="flex items-center gap-2">
                    {/* PLAY */}
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`
                        flex items-center gap-1
                        px-3 py-1
                        text-xs sm:text-sm font-semibold
                        rounded-lg
                        ${
                          theme === "dark"
                            ? `text-white hover:border hover:border-[${p.border}] hover:border-opacity-90`
                            : `text-white ${p.bg} hover:bg-white hover:border`
                        }
                        transition-all
                      `}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = p.border;
                        theme === "light"
                          ? (e.currentTarget.style.color = p.border)
                          : null;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "transparent";
                        theme === "light"
                          ? (e.currentTarget.style.color = "white")
                          : null;
                      }}
                    >
                      {p.actionIcon} {p.action}
                    </a>

                    {/* COPY */}
                    <div className="tooltip" data-tip="Copier le lien">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(p.url ?? "");
                          alert("Lien copié !");
                        }}
                        className="
                        flex items-center gap-1
                        px-3 py-1
                        text-xs sm:text-sm font-semibold
                        rounded-lg
                        text-base-content
                        hover:opacity-80
                        transition-all
                        cursor-pointer
                      "
                      >
                        <FaCopy size={14} />
                      </button>
                    </div>
                    {/* SHARE */}
                    <div className="tooltip" data-tip="Partager">
                      <button
                        onClick={() => {
                          if (navigator.share) {
                            navigator.share({
                              title: track?.title,
                              text: `Écoute "${track?.title}" de Boris Ket`,
                              url: p.url ?? "",
                            });
                          } else {
                            navigator.clipboard.writeText(p.url ?? "");
                            alert("Lien copié !");
                          }
                        }}
                        className="
                      
                        flex items-center gap-1
                        px-3 py-1
                        text-xs sm:text-sm font-semibold
                        rounded-lg
                        text-base-content
                        hover:opacity-80
                        transition-all
                        cursor-pointer
                      "
                      >
                        <FaShareAlt size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ),
          )}
        </div>
      </div>
    </div>
  );
};

export default Single;
