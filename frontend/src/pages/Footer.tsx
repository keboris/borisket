const Footer = () => {
  return (
    <footer className="bg-purple-700 text-white py-10">
      <div className="container mx-auto px-6 text-center">
        <h3 className="text-2xl font-bold mb-4">BORISKET</h3>
        <p className="mb-4">
          Entrez dans mon univers musical et restez connectés !
        </p>

        {/* Réseaux sociaux */}
        <div className="flex justify-center space-x-6 mb-6">
          <a
            href="https://instagram.com"
            target="_blank"
            className="hover:text-yellow-400 transition"
          >
            Instagram
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            className="hover:text-yellow-400 transition"
          >
            YouTube
          </a>
          <a
            href="https://tiktok.com"
            target="_blank"
            className="hover:text-yellow-400 transition"
          >
            TikTok
          </a>
          <a
            href="https://spotify.com"
            target="_blank"
            className="hover:text-yellow-400 transition"
          >
            Spotify
          </a>
        </div>

        <p className="text-gray-300 text-sm">
          &copy; {new Date().getFullYear()} BORISKET. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
