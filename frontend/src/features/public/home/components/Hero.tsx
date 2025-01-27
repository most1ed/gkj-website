export function Hero() {
  return (
    <section className="relative h-[600px] flex items-center justify-center bg-gradient-to-r from-primary to-primary-foreground text-white">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold mb-6">
          Selamat Datang di GKJ
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Melayani dengan kasih, bertumbuh dalam iman, dan bersekutu dalam Kristus
        </p>
        <div className="space-x-4">
          <a
            href="/about"
            className="bg-white text-primary px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Tentang Kami
          </a>
          <a
            href="/services"
            className="border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-primary transition-colors"
          >
            Jadwal Ibadah
          </a>
        </div>
      </div>
    </section>
  );
}
