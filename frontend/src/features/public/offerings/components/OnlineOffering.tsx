export function OnlineOffering() {
  const bankAccounts = [
    {
      bank: "Bank Central Asia (BCA)",
      number: "123-456-7890",
      name: "GKJ GROGOL JAKARTA",
      type: "Persembahan Umum & Persepuluhan",
    },
    {
      bank: "Bank Mandiri",
      number: "987-654-3210",
      name: "GKJ GROGOL JAKARTA",
      type: "Persembahan Pembangunan",
    },
    {
      bank: "Bank Rakyat Indonesia (BRI)",
      number: "456-789-0123",
      name: "GKJ GROGOL JAKARTA",
      type: "Persembahan Diakonia",
    },
  ];

  const qrCodes = [
    {
      name: "QRIS",
      description: "Scan kode QR untuk transfer melalui aplikasi e-wallet atau mobile banking",
    },
    {
      name: "GoPay",
      description: "Tersedia untuk transfer melalui aplikasi Gojek",
    },
    {
      name: "OVO",
      description: "Tersedia untuk transfer melalui aplikasi OVO",
    },
  ];

  const confirmationSteps = [
    {
      step: 1,
      title: "Transfer Persembahan",
      description: "Pilih rekening sesuai jenis persembahan dan transfer sesuai nominal yang diinginkan",
    },
    {
      step: 2,
      title: "Konfirmasi Transfer",
      description: "Kirim bukti transfer melalui WhatsApp atau email untuk pencatatan administrasi",
    },
    {
      step: 3,
      title: "Verifikasi",
      description: "Tim keuangan akan memverifikasi dan mencatat persembahan Anda",
    },
  ];

  return (
    <section>
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">Persembahan Online</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Berbagai cara untuk memberikan persembahan secara online
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Bank Transfer Section */}
        <div>
          <h3 className="text-xl font-semibold mb-6">Transfer Bank</h3>
          <div className="space-y-4">
            {bankAccounts.map((account, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
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
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">{account.bank}</h4>
                    <p className="text-sm text-muted-foreground">{account.type}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="font-mono text-lg">{account.number}</p>
                  <p className="text-sm text-muted-foreground">a.n. {account.name}</p>
                </div>
              </div>
            ))}
          </div>

          {/* QR Codes */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-6">QR Code & E-wallet</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {qrCodes.map((qr, index) => (
                <div
                  key={index}
                  className="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <h4 className="font-semibold mb-2">{qr.name}</h4>
                  <p className="text-sm text-muted-foreground">{qr.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Confirmation Steps */}
        <div>
          <h3 className="text-xl font-semibold mb-6">Langkah Konfirmasi</h3>
          <div className="space-y-6">
            {confirmationSteps.map((step, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary shrink-0">
                    {step.step}
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">{step.title}</h4>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Information */}
          <div className="mt-8 bg-primary/5 rounded-xl p-6">
            <h4 className="font-semibold mb-4">Kontak Konfirmasi</h4>
            <div className="space-y-3">
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
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-sm">keuangan@gkjgrogol.org</span>
              </div>
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
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span className="text-sm">0812-3456-7890 (WhatsApp)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
