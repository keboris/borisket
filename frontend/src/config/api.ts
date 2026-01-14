// API Configuration for MongoDB Backend
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8080";

export const USER_API_URL = `${API_BASE_URL}/users`;
export const AUTH_API_URL = `${API_BASE_URL}/auth`;
export const MENUS_API_URL = `${API_BASE_URL}/menus`;
export const MENUPAGES_API_URL = `${API_BASE_URL}/menu-pages`;
export const VISITORS_API_URL = `${API_BASE_URL}/visitors`;
export const SONGS_API_URL = `${API_BASE_URL}/songs`;
