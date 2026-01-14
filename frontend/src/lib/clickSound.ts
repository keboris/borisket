import { useRef } from "react";

const useClickSound = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  if (!audioRef.current) {
    audioRef.current = new Audio(
      "https://res.cloudinary.com/dfwyun8bt/video/upload/v1768423009/button-press-382713_wn2szv.mp3"
    );
    audioRef.current.volume = 0.3; // léger
  }

  const play = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  };

  return play;
};

export default useClickSound;
