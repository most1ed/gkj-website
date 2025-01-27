export function UpcomingEvents() {
  const events = [
    {
      title: "Persiapan Sakramen Perjamuan",
      date: "24 Januari 2025",
      time: "19:00 WIB",
      location: "Via Zoom",
      description: "Persiapan untuk Sakramen Perjamuan yang akan dilaksanakan pada tanggal 2 Februari 2025",
      category: "Sakramen",
    },
    {
      title: "Persiapan Sakramen Perjamuan",
      date: "31 Januari 2025",
      time: "19:00 WIB",
      location: "Via Zoom",
      description: "Persiapan lanjutan untuk Sakramen Perjamuan",
      category: "Sakramen",
    },
    {
      title: "Sakramen Perjamuan",
      date: "2 Februari 2025",
      time: "07:00 WIB",
      location: "Gedung Gereja",
      description: "Pelaksanaan Sakramen Perjamuan Kudus",
      category: "Sakramen",
    },
    {
      title: "Perayaan Paskah",
      date: "Maret-April 2025",
      location: "Gedung Gereja",
      description: "Rangkaian perayaan Paskah termasuk Kamis Putih, Jumat Agung, dan Minggu Paskah",
      category: "Perayaan",
    },
    {
      title: "Pekan Keluarga",
      date: "Juni 2025",
      location: "Gedung Gereja",
      description: "Rangkaian kegiatan untuk memperkuat hubungan keluarga dalam jemaat",
      category: "Kegiatan",
    },
    {
      title: "PORSENI GKJ",
      date: "Juli 2025",
      location: "Akan diumumkan",
      description: "Pekan Olahraga dan Seni antar jemaat GKJ",
      category: "Kegiatan",
    },
  ];

  const categoryColors = {
    Sakramen: "bg-blue-100 text-blue-800",
    Perayaan: "bg-green-100 text-green-800",
    Kegiatan: "bg-purple-100 text-purple-800",
  };

  return (
    <section>
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">Agenda Mendatang</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Jadwal kegiatan dan acara khusus yang akan datang di GKJ Grogol Jakarta
        </p>
      </div>

      <div className="space-y-6">
        {events.map((event, index) => (
          <div
            key={index}
            className="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              {/* Date Column */}
              <div className="md:w-48 flex-shrink-0">
                <p className="text-lg font-bold">{event.date}</p>
                {event.time && (
                  <p className="text-sm text-muted-foreground">{event.time}</p>
                )}
              </div>

              {/* Details Column */}
              <div className="flex-grow">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      📍 {event.location}
                    </p>
                    <p className="text-muted-foreground">{event.description}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${categoryColors[event.category as keyof typeof categoryColors]}`}
                  >
                    {event.category}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
