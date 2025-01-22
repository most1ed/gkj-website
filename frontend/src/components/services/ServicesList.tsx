export function ServicesList() {
  const services = [
    {
      title: "Paduan Suara",
      description: "Melayani dalam pujian dan penyembahan selama ibadah minggu dan acara khusus.",
      requirements: ["Bisa membaca not", "Komitmen latihan rutin", "Usia minimal 15 tahun"],
      schedule: "Latihan setiap Sabtu, 16:00 WIB",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      ),
    },
    {
      title: "Multimedia",
      description: "Mengelola sistem audio, visual, dan streaming untuk mendukung ibadah dan kegiatan gereja.",
      requirements: ["Familiar dengan peralatan audio/visual", "Bisa mengoperasikan komputer", "Komitmen pelayanan rutin"],
      schedule: "Sesuai jadwal pelayanan mingguan",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
        </svg>
      ),
    },
    {
      title: "Penyambut Jemaat",
      description: "Menyambut dan membantu jemaat yang hadir dalam ibadah, serta mengelola persembahan.",
      requirements: ["Ramah dan sopan", "Berpenampilan rapi", "Komitmen pelayanan rutin"],
      schedule: "Sesuai jadwal pelayanan mingguan",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      title: "Pemusik",
      description: "Mengiringi pujian dan penyembahan dengan berbagai instrumen musik.",
      requirements: ["Menguasai minimal satu alat musik", "Bisa membaca not/chord", "Komitmen latihan rutin"],
      schedule: "Latihan setiap Jumat, 19:00 WIB",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      ),
    },
  ];

  return (
    <section>
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">Bidang Pelayanan</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Berbagai bidang pelayanan yang dapat Anda ikuti untuk melayani Tuhan dan sesama
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
              {service.icon}
            </div>
            
            <h3 className="text-xl font-bold mb-2">{service.title}</h3>
            <p className="text-muted-foreground mb-4">{service.description}</p>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Persyaratan:</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  {service.requirements.map((req, idx) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Jadwal:</h4>
                <p className="text-sm text-muted-foreground">{service.schedule}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
