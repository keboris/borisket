import type { MenuProps, SongProps } from "../../types";
import * as LucideIcons from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { useLanguage } from "../../contexts";

const BreadCrumbs = ({
  track,
  menus,
  pathnameToCheck,
}: {
  track: SongProps | null;
  menus: MenuProps[];
  pathnameToCheck: string;
}) => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const pathSegments = pathnameToCheck.split("/").filter(Boolean);

  const crumbs: MenuProps[] = [];
  let parentId: string | null = null;

  for (const segment of pathSegments) {
    const matchedMenu = menus.find((menu) => {
      const menuSegments = menu.path.split("/").filter(Boolean);
      const lastSegment = menuSegments[menuSegments.length - 1];

      return (
        lastSegment === segment &&
        (parentId === null || menu.parentId === parentId)
      );
    });

    if (!matchedMenu) break;

    crumbs.push(matchedMenu);
    parentId = matchedMenu._id;
  }

  if (crumbs.length === 0) return null;

  const allCrumbs = [
    {
      _id: "home",
      name: { fr: "Accueil", en: "Home" },
      path: "/",
      icon: "Home",
      glow: "shadow-blue-500/30",
      color: "text-blue-500",
    },
    ...crumbs,
  ];

  const crumbsToDisplay = track ? allCrumbs : allCrumbs.slice(0, -1);

  return (
    <>
      {/* Breadcrumb icons flottantes sur mobile */}
      <div
        className="sm:hidden absolute z-50 flex gap-4"
        style={{ top: "90px", left: "50%", transform: "translateX(-50%)" }}
      >
        {crumbsToDisplay.map((crumb) => {
          const Icon =
            (LucideIcons as any)[crumb.icon] || LucideIcons.HelpCircle;
          return (
            <button
              key={crumb._id}
              onClick={() => navigate(crumb.path)}
              className={`w-12 h-12 cursor-pointer rounded-full bg-base-100 flex items-center justify-center shadow-md ${crumb.glow}`}
            >
              <div className={`${crumb.color}`}>
                <Icon />
              </div>
            </button>
          );
        })}
      </div>

      {/* Breadcrumbs classiques sur desktop */}
      <div className="hidden sm:flex w-full gap-3">
        {crumbsToDisplay.map((crumb, index) => {
          //const isLast = index === allCrumbs.length - 1 && !track;
          const Icon =
            (LucideIcons as any)[crumb.icon] || LucideIcons.HelpCircle;
          const isLast = index === crumbsToDisplay.length - 1;

          return (
            <div key={crumb._id} className="flex flex-1 items-center gap-3">
              <motion.button
                whileHover={!isLast ? { scale: 1.06 } : undefined}
                whileTap={!isLast ? { scale: 0.96 } : undefined}
                onClick={() => navigate(crumb.path)}
                className={`
                    group relative
                    bg-base-100 rounded-2xl
                    flex flex-col items-center justify-center
                    p-3 min-w-[90px] h-[80px] text-center
                    cursor-pointer
                    transition-all duration-300
                    shadow-md hover:shadow-2xl ${crumb.glow}
                    font-medium hover:font-semibold
                    ${isLast ? "opacity-90 cursor-default" : "hover:shadow-xl cursor-pointer"}
                    `}
              >
                {/* HALO */}
                <div
                  className={`
                    absolute inset-0 rounded-2xl
                    opacity-0 group-hover:opacity-100
                    transition duration-300
                    blur-xl
                    ${crumb.glow}
                `}
                />

                {/* ICON */}
                <div className={`w-8 h-8 mb-2 relative z-10 ${crumb.color}`}>
                  <Icon />
                </div>

                {/* LABEL */}
                <span
                  className="
                    text-xs
                    whitespace-nowrap
                    overflow-hidden
                    text-ellipsis
                    relative z-10
                    max-w-full
                    "
                >
                  {crumb.name[language] ?? crumb.name.fr}
                </span>
              </motion.button>

              {/* SEPARATOR LUMINEUX */}
              {!isLast && (
                <div
                  className="
                    w-4 h-px
                    bg-gradient-to-r
                    from-transparent
                    via-primary
                    to-transparent
                    opacity-60
                    flex-shrink-0
                    "
                />
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default BreadCrumbs;
