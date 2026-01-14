import { useState } from "react";

type Track = {
  id: number;
  title: string;
  cover: string;
};

const tracks: Track[] = Array.from({ length: 18 }).map((_, i) => ({
  id: i + 1,
  title: `Son ${i + 1}`,
  cover: `/covers/cover-${(i % 3) + 1}.jpg`,
}));

const PER_PAGE_DESKTOP = 6;
const PER_PAGE_MOBILE = 6;

const chunk = <T,>(arr: T[], size: number) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );

const Music = () => {
  const [page, setPage] = useState(1);

  /* Pagination desktop */
  const totalPages = Math.ceil(tracks.length / PER_PAGE_DESKTOP);
  const desktopTracks = tracks.slice(
    (page - 1) * PER_PAGE_DESKTOP,
    page * PER_PAGE_DESKTOP
  );

  /* Pages mobile */
  const mobilePages = chunk(tracks, PER_PAGE_MOBILE);

  return (
    <section className="min-h-screen py-16 bg-base-100">
      <h1 className="text-4xl font-bold text-center mb-12">Ma Musique</h1>

      {/* ================= DESKTOP ================= */}
      <div className="hidden md:block">
        <div className="grid grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
          {desktopTracks.map((track) => (
            <div
              key={track.id}
              className="group rounded-2xl overflow-hidden bg-base-200 shadow-xl hover:shadow-2xl transition cursor-pointer"
            >
              <img
                src={track.cover}
                alt={track.title}
                className="w-full h-64 object-cover transition group-hover:brightness-75"
              />
              <div className="p-4 text-center font-semibold">{track.title}</div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-10 gap-3">
          {Array.from({ length: totalPages }).map((_, i) => {
            const index = i + 1;
            return (
              <button
                key={index}
                onClick={() => setPage(index)}
                className={`btn btn-sm rounded-full ${
                  page === index ? "btn-primary" : "btn-outline"
                }`}
              >
                {index}
              </button>
            );
          })}
        </div>
      </div>

      {/* ================= MOBILE (IPHONE STYLE) ================= */}
      <div className="md:hidden overflow-x-scroll snap-x snap-mandatory">
        <div className="flex w-full">
          {mobilePages.map((pageTracks, pageIndex) => (
            <div key={pageIndex} className="snap-center shrink-0 w-full px-6">
              <div className="grid grid-cols-2 gap-6">
                {pageTracks.map((track) => (
                  <div
                    key={track.id}
                    className="rounded-2xl overflow-hidden bg-base-200 shadow-lg"
                  >
                    <img
                      src={track.cover}
                      alt={track.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-2 text-center text-sm font-semibold">
                      {track.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Music;
