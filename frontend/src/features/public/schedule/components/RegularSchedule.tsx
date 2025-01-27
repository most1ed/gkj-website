export function RegularSchedule() {
  const schedules = [
    {
      title: "Kebaktian Umum",
      time: "07:00 WIB",
      day: "Minggu",
      description: "Ibadah untuk seluruh jemaat",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      ),
    },
    {
      title: "Kebaktian Anak",
      time: "07:00 WIB",
      day: "Minggu",
      description: "Ibadah khusus untuk anak-anak",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: "Kebaktian Pemuda-Remaja",
      time: "07:00 WIB",
      day: "Minggu",
      description: "Ibadah untuk pemuda dan remaja",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section>
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">Jadwal Ibadah Rutin</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Jadwal ibadah reguler yang dilaksanakan setiap minggu di GKJ Grogol Jakarta
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {schedules.map((schedule, index) => (
          <div
            key={index}
            className="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
              {schedule.icon}
            </div>
            <h3 className="text-xl font-bold mb-2">{schedule.title}</h3>
            <div className="space-y-1 mb-4">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold">Hari:</span> {schedule.day}
              </p>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold">Jam:</span> {schedule.time}
              </p>
            </div>
            <p className="text-sm text-muted-foreground">{schedule.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
