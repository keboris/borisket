import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { LanguageContextProvider, ThemeContextProvider } from "./contexts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LanguageContextProvider>
      <ThemeContextProvider>
        <App />
      </ThemeContextProvider>
    </LanguageContextProvider>
  </StrictMode>
);
