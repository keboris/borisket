import {
  ListMusic,
  Video,
  Disc,
  CreditCard,
  ArrowLeft,
  Music,
  FileText,
  Globe,
  Megaphone,
  Heart,
  User,
  Mail,
  Info,
  Laptop,
  Calendar,
  ShoppingCart,
  Gift,
} from "lucide-react";
import type { MenuOption } from "../types";
import {
  FaFacebookF,
  FaInstagram,
  FaTelegram,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

export const menuItems = [
  {
    label: "Ma Musique",
    icon: Music,
    path: "/music",
    color: "text-purple-500",
    glow: "shadow-purple-500/40",
  },
  {
    label: "Mes clips",
    icon: Video,
    path: "/clips",
    color: "text-pink-500",
    glow: "shadow-pink-500/40",
  },

  {
    label: "Mes Réseaux",
    icon: Globe,
    path: "/socials",
    color: "text-cyan-500",
    glow: "shadow-cyan-500/40",
  },
  {
    label: "Actus",
    icon: Megaphone,
    path: "/news",
    color: "text-orange-500",
    glow: "shadow-orange-500/40",
  },
  {
    label: "Evénements",
    icon: Calendar,
    path: "/events",
    color: "text-violet-500",
    glow: "shadow-violet-500/40",
  },
  {
    label: "Site web",
    icon: Laptop,
    path: "/website",
    color: "text-sky-500",
    glow: "shadow-sky-500/40",
  },
  {
    label: "Me soutenir",
    icon: Heart,
    path: "/support",
    color: "text-red-500",
    glow: "shadow-red-500/40",
  },
  {
    label: "Boutique",
    icon: ShoppingCart,
    path: "/shop",
    color: "text-teal-400",
    glow: "shadow-teal-400/40",
  },
  {
    label: "Surprises",
    icon: Gift,
    path: "/surprises",
    color: "text-yellow-400",
    glow: "shadow-yellow-400/40",
  },

  {
    label: "Contact",
    icon: Mail,
    path: "/contact",
    color: "text-blue-500",
    glow: "shadow-blue-500/40",
  },
  {
    label: "Savoir plus",
    icon: Info,
    path: "/about",
    color: "text-slate-500",
    glow: "shadow-slate-500/40",
  },
  {
    label: "Ton espace",
    icon: User,
    path: "/account",
    color: "text-emerald-500",
    glow: "shadow-emerald-500/40",
  },
];

export const musicMenuItems = [
  {
    label: "Singles",
    icon: ListMusic,
    path: "/music/singles",
    color: "text-purple-400",
    glow: "shadow-purple-400/40",
  },
  {
    label: "Albums",
    icon: Disc,
    path: "/music/albums",
    color: "text-yellow-500",
    glow: "shadow-yellow-500/40",
  },
  {
    label: "Clips",
    icon: Video,
    path: "/music/clips",
    color: "text-pink-500",
    glow: "shadow-pink-500/40",
  },
  {
    label: "Lyrics",
    icon: FileText,
    path: "/music/lyrics",
    color: "text-blue-500",
    glow: "shadow-blue-500/40",
  },
  {
    label: "Payer ma musique",
    icon: CreditCard,
    path: "/music/pay",
    color: "text-emerald-500",
    glow: "shadow-emerald-500/40",
  },
  {
    label: "Retour",
    icon: ArrowLeft,
    path: "/",
    color: "text-gray-500",
    glow: "shadow-gray-500/40",
  },
];

export const socialMenuItems = [
  {
    label: "Facebook",
    icon: FaFacebookF,
    path: "https://facebook.com/BorisKetOfficiel",
    color: "text-blue-600",
    glow: "shadow-blue-600/40",
    external: true,
  },
  {
    label: "Instagram",
    icon: FaInstagram,
    path: "https://instagram.com/BorisKet",
    color: "text-pink-500",
    glow: "shadow-pink-500/40",
    external: true,
  },
  {
    label: "TikTok",
    icon: FaTiktok,
    path: "https://tiktok.com/@BorisKet",
    color: "text-black",
    glow: "shadow-black/40",
    external: true,
  },
  {
    label: "YouTube",
    icon: FaYoutube,
    path: "https://youtube.com/@BorisKet",
    color: "text-red-600",
    glow: "shadow-red-600/40",
    external: true,
  },
  {
    label: "Telegram",
    icon: FaTelegram,
    path: "https://t.me/BorisKetNews",
    color: "text-blue-400",
    glow: "shadow-blue-400/40",
    external: true,
  },
  {
    label: "Twitter (X)",
    icon: FaTwitter,
    path: "https://twitter.com/BorisKet",
    color: "text-sky-400",
    glow: "shadow-sky-400/40",
    external: true,
  },
  {
    label: "Site officiel",
    icon: Globe,
    path: "/website",
    color: "text-yellow-500",
    glow: "shadow-yellow-500/40",
    external: false,
  },
  {
    label: "Retour",
    icon: ArrowLeft,
    path: "/",
    color: "text-gray-500",
    glow: "shadow-gray-500/40",
    external: false,
  },
  // Add other social media menu items here
];

export const menuOptions: Record<string, MenuOption> = {
  home: {
    match: (path: string) => path === "/",
    title: "Bienvenue dans mon univers musical",
    description: "Choisis une section et plonge dans mon monde.",
    image: "/boris.jpg",
    menuItems: menuItems,
  },

  music: {
    match: (path: string) => path.startsWith("/music"),
    title: "Ma musique",
    description: "Singles, albums et projets musicaux.",
    image: "/musique.jpg",
    menuItems: musicMenuItems,
  },

  clips: {
    match: (path: string) => path.startsWith("/clips"),
    title: "Mes clips",
    description: "Entre dans l’univers visuel de mes chansons.",
    image: "/clips.jpg",
  },

  lyrics: {
    match: (path: string) => path.startsWith("/lyrics"),
    title: "Lyrics",
    description: "Lis et ressens chaque mot de mes textes.",
    image: "/lyrics.jpg",
  },

  albums: {
    match: (path: string) => path.startsWith("/music/albums"),
    title: "Albums",
    description: "Découvre mes albums complets et leurs histoires.",
    image: "/albums.jpg",
  },

  socials: {
    match: (path: string) => path.startsWith("/socials"),
    title: "Réseaux sociaux",
    description: "Suis-moi et reste connecté à mon actualité.",
    image: "/socials.jpg",
    menuItems: socialMenuItems,
  },
};
