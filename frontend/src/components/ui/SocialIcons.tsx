import { FaTiktok, FaYoutube } from "react-icons/fa";
import { FaFacebookF, FaInstagram } from "react-icons/fa6";
import { useTheme } from "../../contexts";
import { useEffect, useState } from "react";

const SocialIcons = ({ option }: { option: string }) => {
  const { theme } = useTheme();

  function useIsDesktop() {
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

    useEffect(() => {
      const onResize = () => setIsDesktop(window.innerWidth >= 768);
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }, []);

    return isDesktop;
  }

  const isDesktop = useIsDesktop();

  const iconColor = (lightColor: string) =>
    isDesktop ? "text-white" : theme === "light" ? lightColor : "text-white";

  return (
    <>
      <a
        href="https://facebook.com/BorisKetOfficiel"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaFacebookF className={`${iconColor("text-blue-600")} text-xl`} />
      </a>

      <a
        href="https://instagram.com/BorisKet"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaInstagram className={`${iconColor("text-pink-600")} text-xl`} />
      </a>

      <a
        href="https://tiktok.com/@BorisKet"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaTiktok className={`${iconColor("text-black")} text-xl`} />
      </a>

      <a
        href="https://youtube.com/@BorisKet"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaYoutube className={`${iconColor("text-red-600")} text-xl`} />
      </a>
    </>
  );
};

export default SocialIcons;
