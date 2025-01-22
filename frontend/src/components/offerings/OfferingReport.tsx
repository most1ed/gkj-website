export function OfferingReport() {
  const monthlyReport = {
    month: "Januari 2025",
    categories: [
      {
        name: "Persembahan Umum",
        amount: "Rp 46.250.000",
        details: [
          { week: "Minggu I", amount: "Rp 15.250.000" },
          { week: "Minggu II", amount: "Rp 14.875.000" },
          { week: "Minggu III", amount: "Rp 16.125.000" },
        ],
      },
      {
        name: "Persembahan Persepuluhan",
        amount: "Rp 35.750.000",
        details: [
          { week: "Minggu I", amount: "Rp 12.250.000" },
          { week: "Minggu II", amount: "Rp 11.875.000" },
          { week: "Minggu III", amount: "Rp 11.625.000" },
        ],
      },
      {
        name: "Persembahan Syukur",
        amount: "Rp 8.500.000",
        details: [
          { week: "Minggu I", amount: "Rp 3.250.000" },
          { week: "Minggu II", amount: "Rp 2.875.000" },
          { week: "Minggu III", amount: "Rp 2.375.000" },
        ],
      },
    ],
    specialOfferings: [
      {
        name: "Dana Pembangunan",
        target: "Rp 2.500.000.000",
        collected: "Rp 875.250.000",
        percentage: 35,
        lastUpdate: "20 Januari 2025",
      },
      {
        name: "Dana Diakonia",
        target: "Rp 100.000.000",
        collected: "Rp 45.750.000",
        percentage: 45,
        lastUpdate: "20 Januari 2025",
      },
    ],
  };

  return (
    <section>
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">Laporan Persembahan</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Transparansi penggunaan persembahan jemaat
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Monthly Report */}
        <div>
          <h3 className="text-xl font-semibold mb-6">
            Laporan Bulan {monthlyReport.month}
          </h3>
          <div className="space-y-6">
            {monthlyReport.categories.map((category, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold">{category.name}</h4>
                  <span className="text-lg font-medium text-primary">
                    {category.amount}
                  </span>
                </div>
                <div className="space-y-2">
                  {category.details.map((detail, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center text-sm text-muted-foreground"
                    >
                      <span>{detail.week}</span>
                      <span>{detail.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Special Offerings Progress */}
        <div>
          <h3 className="text-xl font-semibold mb-6">Dana Khusus</h3>
          <div className="space-y-6">
            {monthlyReport.specialOfferings.map((offering, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold">{offering.name}</h4>
                    <span className="text-sm text-muted-foreground">
                      Update: {offering.lastUpdate}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-muted-foreground mb-4">
                    <span>Target: {offering.target}</span>
                    <span>Terkumpul: {offering.collected}</span>
                  </div>
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-primary bg-primary/10">
                          {offering.percentage}%
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 text-xs flex rounded-full bg-muted">
                      <div
                        style={{ width: `${offering.percentage}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary transition-all"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Download Reports */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-6">Unduh Laporan</h3>
            <div className="space-y-4">
              {["Desember 2024", "November 2024", "Oktober 2024"].map(
                (month, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-card rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <svg
                        className="w-5 h-5 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <span>Laporan {month}</span>
                    </div>
                    <svg
                      className="w-5 h-5 text-primary"
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
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
