const videos = [{ id: "X3mSuFmZA3E" }, { id: "1_QRvomGYQA" }];

const Videos = () => {
  return (
    <section id="videos" className="py-24 bg-black text-white text-center">
      <h2 className="text-4xl font-bold mb-12">Vidéos Officielles</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6">
        {videos.map((v, i) => (
          <div key={i} className="w-full h-64">
            <iframe
              className="w-full h-full rounded-lg shadow-lg"
              src={`https://www.youtube.com/embed/${v.id}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Videos;
