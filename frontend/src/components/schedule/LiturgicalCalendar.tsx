export function LiturgicalCalendar() {
  const calendar = [
    {
      date: "19 Januari 2025",
      name: "Minggu Biasa II",
      color: "Hijau",
      description: "Minggu kedua dalam masa biasa setelah Epifani",
    },
    {
      date: "26 Januari 2025",
      name: "Minggu Biasa III",
      color: "Hijau",
      description: "Minggu ketiga dalam masa biasa setelah Epifani",
    },
  ];

  const colorClasses = {
    Hijau: "bg-green-100 text-green-800",
    Ungu: "bg-purple-100 text-purple-800",
    Putih: "bg-gray-100 text-gray-800",
    Merah: "bg-red-100 text-red-800",
  };

  return (
    <section>
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">Kalender Liturgis</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Jadwal kalender liturgis GKJ Grogol Jakarta
        </p>
      </div>

      <div className="space-y-4">
        {calendar.map((item, index) => (
          <div
            key={index}
            className="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              {/* Date */}
              <div className="md:w-48 flex-shrink-0">
                <p className="text-lg font-bold">{item.date}</p>
              </div>

              {/* Details */}
              <div className="flex-grow">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${colorClasses[item.color as keyof typeof colorClasses]}`}
                  >
                    {item.color}
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
