export function WeeklyAnnouncements() {
  const announcements = [
    {
      category: "Ibadah",
      items: [
        {
          title: "Persiapan Sakramen Perjamuan",
          details: [
            "Jumat, 24 Januari 2025, pukul 19:00 WIB (via Zoom)",
            "Jumat, 31 Januari 2025, pukul 19:00 WIB (via Zoom)",
          ],
          important: true,
        },
        {
          title: "Sakramen Perjamuan",
          details: ["Minggu, 2 Februari 2025"],
          important: true,
        },
      ],
    },
    {
      category: "Pembinaan",
      items: [
        {
          title: "Katekisasi",
          details: [
            "Setiap Minggu, 09:00 WIB",
            "Ruang Pembinaan",
            "Pembina: Pdt. Wurihanto Handoyo Adi",
          ],
        },
        {
          title: "Kelas Pembinaan Pranikah",
          details: [
            "Pendaftaran dibuka sampai 31 Januari 2025",
            "Kelas dimulai Februari 2025",
          ],
        },
      ],
    },
    {
      category: "Kegiatan",
      items: [
        {
          title: "Pekan Keluarga",
          details: [
            "15-21 Juni 2025",
            "Tema: 'Keluarga yang Diberkati, Menjadi Berkat'",
            "Pendaftaran dibuka mulai Mei 2025",
          ],
        },
        {
          title: "PORSENI GKJ",
          details: [
            "Juli 2025",
            "Cabang: Futsal, Badminton, Vocal Group",
            "Pendaftaran tim akan dibuka April 2025",
          ],
        },
      ],
    },
    {
      category: "Pastoral",
      items: [
        {
          title: "Kunjungan Pastoral",
          details: [
            "Wilayah Grogol: 22-26 Januari 2025",
            "Wilayah Jelambar: 29 Januari - 2 Februari 2025",
          ],
        },
        {
          title: "Konseling Pastoral",
          details: [
            "Selasa: 09:00 - 12:00 WIB",
            "Kamis & Jumat: 16:00 - 20:00 WIB",
            "Harap membuat janji terlebih dahulu",
          ],
        },
      ],
    },
  ];

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Warta Minggu Ini</h2>
      <div className="space-y-8">
        {announcements.map((section, index) => (
          <div key={index} className="bg-card rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
              {section.category}
            </h3>
            <div className="space-y-6">
              {section.items.map((item, idx) => (
                <div key={idx} className="space-y-2">
                  <h4 className={`font-semibold ${item.important ? 'text-primary' : ''}`}>
                    {item.title}
                  </h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    {item.details.map((detail, detailIdx) => (
                      <li key={detailIdx}>{detail}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
