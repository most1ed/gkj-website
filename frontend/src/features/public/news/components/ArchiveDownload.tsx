export function ArchiveDownload() {
  const archives = [
    {
      date: "14 Januari 2025",
      title: "Warta Minggu - Minggu Epifania II",
      size: "2.5 MB",
      type: "PDF",
    },
    {
      date: "7 Januari 2025",
      title: "Warta Minggu - Minggu Epifania I",
      size: "2.3 MB",
      type: "PDF",
    },
    {
      date: "31 Desember 2024",
      title: "Warta Minggu - Minggu Akhir Tahun",
      size: "2.8 MB",
      type: "PDF",
    },
  ];

  return (
    <section className="bg-card rounded-xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Arsip Warta</h2>

      <div className="space-y-4">
        {archives.map((archive, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group"
          >
            {/* PDF Icon */}
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
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
                  d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </div>

            {/* Content */}
            <div className="flex-grow">
              <h3 className="font-medium group-hover:text-primary transition-colors">
                {archive.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {archive.date} • {archive.size}
              </p>
            </div>

            {/* Download Icon */}
            <div className="text-muted-foreground group-hover:text-primary transition-colors">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <button className="w-full mt-6 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
        Lihat Semua Arsip →
      </button>
    </section>
  );
}
