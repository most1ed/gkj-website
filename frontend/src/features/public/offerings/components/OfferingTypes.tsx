export function OfferingTypes() {
  const types = [
    {
      name: "Persembahan Umum",
      description: "Persembahan yang dikumpulkan setiap ibadah minggu untuk mendukung operasional gereja.",
      schedule: "Setiap ibadah Minggu",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2zM17 16v2a2 2 0 01-2 2H9a2 2 0 01-2-2v-2M12 4v4m0 12v-4" />
        </svg>
      ),
    },
    {
      name: "Persembahan Persepuluhan",
      description: "Persembahan sebesar 10% dari penghasilan sebagai wujud ketaatan dan ucapan syukur kepada Tuhan.",
      schedule: "Setiap bulan atau sesuai penghasilan",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      name: "Persembahan Syukur",
      description: "Persembahan khusus sebagai ungkapan syukur atas berkat istimewa yang diterima.",
      schedule: "Sesuai momentum syukur",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      name: "Persembahan Pembangunan",
      description: "Persembahan untuk mendukung pembangunan dan pemeliharaan fasilitas gereja.",
      schedule: "Setiap saat",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      name: "Persembahan Diakonia",
      description: "Persembahan untuk pelayanan sosial dan bantuan bagi yang membutuhkan.",
      schedule: "Setiap saat",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    },
    {
      name: "Persembahan Khusus",
      description: "Persembahan untuk keperluan khusus seperti misi, bencana alam, atau kebutuhan mendesak lainnya.",
      schedule: "Sesuai kebutuhan",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
  ];

  return (
    <section>
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">Jenis-jenis Persembahan</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Berbagai cara untuk berpartisipasi dalam pelayanan melalui persembahan
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {types.map((type, index) => (
          <div
            key={index}
            className="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
              {type.icon}
            </div>
            
            <h3 className="text-xl font-bold mb-2">{type.name}</h3>
            <p className="text-muted-foreground mb-4">{type.description}</p>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>{type.schedule}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
