import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const tracks = [
  {
    id: 1,
    title: "Validé",
    cover: "/images/valide.jpg",
    preview: "/audios/valide-preview.mp3",
    buyLink: "/app/buy/1",
    artist: "BORIS KET",
    duration: 32,
    links: {
      spotify: "https://spotify.com",
      apple: "https://music.apple.com",
      youtube: "https://youtube.com",
    },
  },
  {
    id: 2,
    title: "Va Douwe",
    cover: "/images/va_douwe.jpg",
    preview: "/audios/va-douwe-preview.mp3",
    buyLink: "/app/buy/2",
    artist: "BORIS KET",
    duration: 29,
    links: {
      spotify: "https://spotify.com",
      apple: "https://music.apple.com",
      youtube: "https://youtube.com",
    },
  },
  {
    id: 3,
    title: "Fa",
    cover: "/images/fa.jpg",
    preview: "/audios/fa-preview.mp3",
    buyLink: "/app/buy/3",
    artist: "BORIS KET",
    duration: 31,
    links: {
      spotify: "https://spotify.com",
      apple: "https://music.apple.com",
      youtube: "https://youtube.com",
    },
  },
];

const Playlist = () => {
  const [current, setCurrent] = useState(tracks[0]);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    audioRef.current = new Audio(current.preview);
    audioRef.current.volume = 0.4;

    if (playing) {
      audioRef.current.play();
      const time = audioRef.current.currentTime;
      setProgress(time);

      if (time >= current.duration) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setProgress(0);
        setPlaying(false);
      }
    }

    return () => {
      audioRef.current?.pause();
    };
  }, [current]);

  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    // Met à jour la barre de progression quand le temps change
    const updateProgress = () => {
      setProgress(audio.currentTime);
      if (audio.currentTime >= current.duration) {
        audio.pause();
        audio.currentTime = 0;
        setProgress(0);
        setPlaying(false);
      }
    };

    audio.addEventListener("timeupdate", updateProgress);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
    };
  }, [current]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <section
      id="playlist"
      className="py-20 bg-gradient-to-b from-base-200 to-base-100"
    >
      <h2 className="text-4xl font-bold text-center mb-14">
        Playlist Exclusive
      </h2>

      <div className="hidden md:grid max-w-6xl mx-auto grid-cols-2 gap-10 px-4">
        {/* PLAYER */}
        <motion.div
          key={current.id}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="
          rounded-2xl overflow-hidden shadow-2xl bg-base-100
          md:sticky md:top-24
        "
        >
          {/* COVER */}
          <div className="relative group">
            <img
              src={current.cover}
              alt={current.title}
              className="
              w-full
              h-[55vh] md:h-96
              object-cover
              transition
              group-hover:brightness-50
            "
            />

            <button
              onClick={togglePlay}
              className="
              absolute inset-0 flex items-center justify-center
              text-6xl text-white
              opacity-100 md:opacity-0
              md:group-hover:opacity-100
              transition
            "
            >
              {playing ? "⏸" : "▶"}
            </button>
          </div>

          {/* INFOS */}
          <div className="p-6 space-y-5">
            <h3 className="text-2xl font-bold">{current.title}</h3>

            {/* LINKS */}
            <div className="flex flex-wrap gap-3">
              {current.links.spotify && (
                <a
                  href={current.links.spotify}
                  target="_blank"
                  className="btn btn-sm btn-outline rounded-full"
                >
                  Spotify
                </a>
              )}
              {current.links.apple && (
                <a
                  href={current.links.apple}
                  target="_blank"
                  className="btn btn-sm btn-outline rounded-full"
                >
                  Apple Music
                </a>
              )}
              {current.links.youtube && (
                <a
                  href={current.links.youtube}
                  target="_blank"
                  className="btn btn-sm btn-outline rounded-full"
                >
                  YouTube
                </a>
              )}
            </div>

            {/* BUY */}
            <a
              href={current.buyLink}
              className="btn btn-primary w-full rounded-full text-lg"
            >
              Acheter le son
            </a>
          </div>
        </motion.div>

        {/* TRACK LIST */}

        <div className="space-y-4">
          {/* STICKY PLAYER */}
          <div className="sticky top-0 z-50 bg-neutral text-neutral-content">
            <div className="flex items-center gap-3 p-3">
              {/* COVER */}
              <img
                src={current.cover}
                className="w-14 h-14 rounded-md object-cover"
              />

              {/* INFOS */}
              <div className="flex-1">
                <p className="font-semibold leading-tight">{current.title}</p>
                <p className="text-xs opacity-70">BORIS KET</p>

                {/* PROGRESS */}
                <input
                  type="range"
                  min={0}
                  max={current.duration}
                  value={progress}
                  className="range range-xs"
                  onChange={(e) => {
                    const newTime = Number(e.target.value);
                    if (audioRef.current) {
                      audioRef.current.currentTime = newTime;
                    }
                    setProgress(newTime);
                  }}
                />
              </div>

              {/* CONTROLS */}
              <button onClick={togglePlay} className="text-2xl">
                {playing ? "⏸" : "▶"}
              </button>
            </div>

            {/* LINKS */}
            <div className="flex gap-4 px-4 pb-3 text-xs">
              <a
                href={current.links.spotify}
                target="_blank"
                className="link link-hover"
              >
                Spotify
              </a>
              <a
                href={current.links.apple}
                target="_blank"
                className="link link-hover"
              >
                Apple Music
              </a>
              <a
                href={current.links.youtube}
                target="_blank"
                className="link link-hover"
              >
                YouTube
              </a>
            </div>
          </div>

          {/* PLAYLIST */}
          <div className="divide-y divide-base-300">
            {tracks.map((track) => (
              <button
                key={track.id}
                onClick={() => {
                  setCurrent(track);
                  setPlaying(true);
                }}
                className={`
          w-full flex items-center justify-between px-4 py-4 text-left
          ${
            current.id === track.id
              ? "bg-primary text-primary-content shadow-lg scale-[1.02]"
              : "bg-base-100 hover:bg-base-200"
          }
        `}
              >
                <div>
                  <p className="font-medium">{track.title}</p>
                  <p className="text-xs opacity-60">{track.artist}</p>
                </div>

                <span className="text-xs opacity-60">{track.duration}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* MOBILE PLAYER + PLAYLIST */}
      <div className="md:hidden p-2 mx-4 rounded-2xl shadow-2xl bg-base-100">
        {/* STICKY PLAYER */}
        <div className="sticky top-0 z-50 bg-neutral text-neutral-content">
          <div className="flex items-center gap-3 p-3">
            {/* COVER */}
            <img
              src={current.cover}
              className="w-14 h-14 rounded-md object-cover"
            />

            {/* INFOS */}
            <div className="flex-1">
              <p className="font-semibold leading-tight">{current.title}</p>
              <p className="text-xs opacity-70">BORIS KET</p>

              {/* PROGRESS */}
              <input
                type="range"
                min={0}
                max={current.duration}
                value={progress}
                className="range range-xs"
                onChange={(e) => {
                  const newTime = Number(e.target.value);
                  if (audioRef.current) {
                    audioRef.current.currentTime = newTime;
                  }
                  setProgress(newTime);
                }}
              />
            </div>

            {/* CONTROLS */}
            <button onClick={togglePlay} className="text-2xl">
              {playing ? "⏸" : "▶"}
            </button>
          </div>

          {/* LINKS */}
          <div className="flex gap-4 px-4 pb-3 text-xs">
            <a
              href={current.links.spotify}
              target="_blank"
              className="link link-hover"
            >
              Spotify
            </a>
            <a
              href={current.links.apple}
              target="_blank"
              className="link link-hover"
            >
              Apple Music
            </a>
            <a
              href={current.links.youtube}
              target="_blank"
              className="link link-hover"
            >
              YouTube
            </a>
          </div>
        </div>

        {/* PLAYLIST */}
        <div className="divide-y divide-base-300">
          {tracks.map((track) => (
            <button
              key={track.id}
              onClick={() => {
                setCurrent(track);
                setPlaying(true);
              }}
              className={`
          w-full flex items-center justify-between px-4 py-4 text-left
          ${
            current.id === track.id
              ? "bg-primary text-primary-content shadow-lg scale-[1.02]"
              : "bg-base-100 hover:bg-base-200"
          }
        `}
            >
              <div>
                <p className="font-medium">{track.title}</p>
                <p className="text-xs opacity-60">{track.artist}</p>
              </div>

              <span className="text-xs opacity-60">{track.duration}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Playlist;
