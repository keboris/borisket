import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative h-screen overflow-hidden bg-black text-white">
      {/* Background video / image */}
      <video
        autoPlay
        muted
        loop
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      >
        <source src="/videos/bg-hero.mp4" type="video/mp4" />
      </video>

      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 flex flex-col items-center justify-center h-full text-center"
      >
        <h1 className="text-6xl md:text-7xl font-bold uppercase tracking-wide">
          BORISKET
        </h1>
        <p className="mt-4 text-xl md:text-2xl">
          Plonge dans mon univers musical
        </p>

        <div className="mt-8 flex space-x-4">
          <a
            href="#playlist"
            className="btn btn-xl btn-primary bg-gradient-to-r from-yellow-400 to-yellow-600 text-black"
          >
            Écouter Maintenant
          </a>
          <a
            href="#videos"
            className="btn btn-xl btn-outline text-white border-white hover:bg-white hover:text-black"
          >
            Voir Vidéos
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
