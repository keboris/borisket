import { Features, Gallery, Hero, Playlist, Videos } from "../components";
import Footer from "./Footer";
import NavBar from "./NavBar";

const WebSite = () => {
  return (
    <>
      <NavBar />
      <Hero />
      <Playlist />
      <Videos />
      <Gallery />
      <Features />
      <Footer />
    </>
  );
};

export default WebSite;
