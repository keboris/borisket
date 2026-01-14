const images = [
  "/images/photo1.jpg",
  "/images/photo2.jpg",
  "/images/photo3.jpg",
];

const Gallery = () => {
  return (
    <section className="py-24 bg-white text-center">
      <h2 className="text-4xl font-bold mb-12">Galerie</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 px-6">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            className="w-full h-64 object-cover rounded-lg hover:scale-105 transition"
          />
        ))}
      </div>
    </section>
  );
};

export default Gallery;
