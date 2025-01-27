export function History() {
  const milestones = [
    {
      year: "[Tahun Pendirian]",
      title: "Awal Mula GKJ Grogol",
      description:
        "GKJ Grogol Jakarta didirikan sebagai respons atas kebutuhan pelayanan rohani bagi jemaat di wilayah Jakarta Barat.",
    },
    {
      year: "[Tahun]",
      title: "Pembangunan Gedung Gereja",
      description:
        "Pembangunan gedung gereja di Kompleks Rasa Sayang sebagai pusat ibadah dan pelayanan.",
    },
    {
      year: "[Tahun]",
      title: "Pengembangan Pelayanan",
      description:
        "Perluasan pelayanan dengan berbagai program untuk melayani kebutuhan jemaat dan masyarakat.",
    },
    {
      year: "Sekarang",
      title: "Melangkah ke Masa Depan",
      description:
        "Terus bertumbuh dan melayani dengan kasih Kristus di tengah perkembangan zaman.",
    },
  ];

  return (
    <section>
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">Perjalanan Sejarah Kami</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Melihat kembali perjalanan iman dan pelayanan GKJ Grogol Jakarta dari masa ke masa.
        </p>
      </div>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-border" />

        {/* Timeline Items */}
        <div className="space-y-16">
          {milestones.map((milestone, index) => (
            <div
              key={index}
              className={`relative flex items-center ${
                index % 2 === 0 ? "justify-start" : "justify-end"
              }`}
            >
              {/* Content */}
              <div
                className={`w-5/12 ${
                  index % 2 === 0 ? "text-right pr-8" : "text-left pl-8"
                }`}
              >
                <div className="bg-card p-6 rounded-xl shadow-lg">
                  <div className="inline-block px-3 py-1 rounded bg-primary/10 text-primary font-semibold mb-2">
                    {milestone.year}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                  <p className="text-muted-foreground">{milestone.description}</p>
                </div>
              </div>

              {/* Timeline Dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
