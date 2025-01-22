export function PrayerRequests() {
  const prayers = [
    {
      category: "Jemaat yang Sakit",
      requests: [
        {
          name: "Ibu Siti Rahayu",
          details: "Dirawat di RS Pluit (Ruang 205)",
          condition: "Pemulihan pasca operasi",
        },
        {
          name: "Bpk. Hendry Tanuwijaya",
          details: "Perawatan di rumah",
          condition: "Pemulihan stroke",
        },
      ],
    },
    {
      category: "Jemaat yang Berduka",
      requests: [
        {
          name: "Keluarga Bpk. Gunawan",
          details: "Telah berpulang: Ibu Melisa Gunawan (19 Januari 2025)",
          info: "Kebaktian Penghiburan: 22 Januari 2025, 19:00 WIB",
        },
      ],
    },
    {
      category: "Doa Khusus",
      requests: [
        {
          name: "Persiapan Pembangunan Gedung Gereja",
          details: "Proses perizinan dan pengumpulan dana",
        },
        {
          name: "Pemilihan Majelis Baru",
          details: "Periode 2025-2028",
        },
      ],
    },
  ];

  return (
    <section className="bg-card rounded-xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Pokok Doa</h2>

      <div className="space-y-6">
        {prayers.map((category, index) => (
          <div key={index}>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <svg
                className="w-4 h-4 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              {category.category}
            </h3>

            <div className="space-y-4">
              {category.requests.map((request, idx) => (
                <div key={idx} className="pl-4 border-l-2 border-primary/20">
                  <p className="font-medium">{request.name}</p>
                  <p className="text-sm text-muted-foreground">{request.details}</p>
                  {request.condition && (
                    <p className="text-sm text-muted-foreground">
                      Kondisi: {request.condition}
                    </p>
                  )}
                  {request.info && (
                    <p className="text-sm text-muted-foreground mt-1">{request.info}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
