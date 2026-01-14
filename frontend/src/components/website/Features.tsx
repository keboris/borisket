const Features = () => {
  const features = [
    {
      title: "Musique & Albums",
      description:
        "Écoutez mes derniers sons et albums en streaming ou achetez-les directement.",
      icon: "🎵",
    },
    {
      title: "Réseaux Sociaux",
      description: "Suivez-moi sur Instagram, TikTok, YouTube et plus encore.",
      icon: "📱",
    },
    {
      title: "Actualités & Notifications",
      description:
        "Recevez toutes mes actualités en temps réel, où que vous soyez.",
      icon: "🔔",
    },
    {
      title: "Boutique exclusive",
      description:
        "Accédez à des produits et éditions limitées réservés à mes fans.",
      icon: "🛒",
    },
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-12">Mon univers</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 border rounded-xl shadow-lg hover:shadow-2xl transition duration-300"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
