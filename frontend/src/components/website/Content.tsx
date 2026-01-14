const Content = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-12">Plongez dans mon monde</h2>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition duration-300">
            <h3 className="text-2xl font-semibold mb-4">Écoutez mes sons</h3>
            <p className="mb-6 text-gray-600">
              Découvrez mes derniers titres et albums directement ici.
            </p>
            <a href="/app/music" className="btn btn-primary btn-sm">
              Écouter maintenant
            </a>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition duration-300">
            <h3 className="text-2xl font-semibold mb-4">Rejoignez mes fans</h3>
            <p className="mb-6 text-gray-600">
              Abonnez-vous pour recevoir mes actualités et ne rien manquer.
            </p>
            <a href="/app/subscribe" className="btn btn-primary btn-sm">
              S’abonner
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Content;
