import { BrowserRouter, Route, Routes } from "react-router";
import {
  MainLayout,
  ProtectedLayout,
  ScrollToTop,
  WebSiteLayout,
} from "./layouts";
import { Dashboard, Login, NotFound, Register, WebSite } from "./pages";
import { Music, Pages } from "./components";

function App() {
  const dashboardRoutes = ["music", "videos"];
  const uiRoutes = [
    "music",
    "music/singles",
    "music/albums",
    "music/clips",
    "music/lyrics",
    "socials",
    "events",
    "shop",
    "contact",
  ];

  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Pages />} />
            {uiRoutes.map((path) => (
              <Route key={path} path={path} element={<Pages />} />
            ))}
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/musique" element={<Music />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route path="/website" element={<WebSiteLayout />}>
            <Route index element={<WebSite />} />
          </Route>

          <Route path="app" element={<ProtectedLayout />}>
            <Route index element={<Dashboard />} />
            {dashboardRoutes.map((path) => (
              <Route key={path} path={path} element={<Dashboard />} />
            ))}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
