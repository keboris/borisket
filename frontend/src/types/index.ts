import type { JSX } from "react/jsx-dev-runtime";

export type Track = {
  id: string;
  title: string;
  cover: string;
  preview: string;
  artist: string;
  duration: number;
  links: {
    spotify?: string;
    apple?: string;
    youtube?: string;
  };
  buyLink: string;
};

export type ThemeContextType = {
  theme: "light" | "dark";
  setTheme: (theme?: "light" | "dark") => void;
};

export type Translations = {
  [key: string]: {
    [lang: string]: string;
  };
};

export type Language = "fr" | "en" | "de";

export type TranslationsMap = {
  [key: string]: {
    [lang in Language]: string;
  };
};

export type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

export type MenuItem = {
  label: string;
  icon: React.ComponentType<any>;
  path: string;
  color: string;
  glow: string;
  external?: boolean;
};

export type MenuOption = {
  match: (path: string) => boolean;
  title: string;
  description: string;
  image: string;
  menuItems?: MenuItem[];
};

export type MenuProps = {
  _id: string;
  name: {
    fr: string;
    en?: string;
    de?: string;
  };
  order?: number;
  parentId?: string | null;
  icon: string;
  path: string;
  color: string;
  glow: string;
  external?: boolean;
};

export type MenuPageProps = {
  key: string;
  matchPath: string;
  title: {
    fr: string;
    en?: string;
    de?: string;
  };
  description: {
    fr: string;
    en?: string;
    de?: string;
  };
  image: string;
  menuItems?: {
    _id: string;
    icon: string;
    parentId?: string | null;
    name: {
      fr: string;
      en?: string;
      de?: string;
    };
  };
};

export type SongProps = {
  _id: string;
  title: string;
  artist: string;
  feat?: string;
  coverImage: string;
  slug?: string;
  releaseDate: Date;
  genres: string[];
  type: "single" | "album" | "ep";
  audioFile: string;
  duration: number;
  previewFile: string;
  previewDuration: number;
  lyrics?: string;
  lyricsFile?: string;
  codeYouTube?: string;
  details?: string;
  available_audio: boolean;
  available_video: boolean;
  available_lyrics: boolean;
  links: {
    spotify?: string;
    apple?: string;
    youtube?: string;
    deezer?: string;
    other?: string;
  };
  inPlaylist: boolean;
  buyLink: string;
};

export type Platform = {
  name: string;
  url?: string;
  icon: JSX.Element;
  bg: string;
  action?: string;
  actionIcon?: JSX.Element;
  text: string;
  border: string;
};
