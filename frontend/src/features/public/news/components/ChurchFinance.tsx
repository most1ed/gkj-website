export function ChurchFinance() {
  const finance = {
    month: "Januari 2025",
    offerings: [
      {
        type: "Persembahan Minggu I",
        amount: "Rp 15.250.000",
      },
      {
        type: "Persembahan Minggu II",
        amount: "Rp 14.875.000",
      },
      {
        type: "Persembahan Minggu III",
        amount: "Rp 16.125.000",
      },
    ],
    specialOfferings: [
      {
        name: "Pembangunan Gereja",
        collected: "Rp 875.250.000",
        target: "Rp 2.500.000.000",
        percentage: 35,
      },
      {
        name: "Dana Diakonia",
        collected: "Rp 45.750.000",
        target: "Rp 100.000.000",
        percentage: 45,
      },
    ],
    bankAccounts: [
      {
        bank: "BCA",
        number: "123-456-7890",
        name: "GKJ GROGOL JAKARTA",
      },
      {
        bank: "Mandiri",
        number: "987-654-3210",
        name: "GKJ GROGOL JAKARTA",
      },
    ],
  };

  return (
    <section className="bg-card rounded-xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Keuangan Gereja</h2>

      {/* Regular Offerings */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">
          Persembahan Bulan {finance.month}
        </h3>
        <div className="space-y-3">
          {finance.offerings.map((offering, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-2 px-4 bg-muted/50 rounded-lg"
            >
              <span className="text-sm font-medium">{offering.type}</span>
              <span className="text-sm text-muted-foreground">{offering.amount}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Special Offerings */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Dana Khusus</h3>
        <div className="space-y-6">
          {finance.specialOfferings.map((offering, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{offering.name}</span>
                <span className="text-sm text-muted-foreground">
                  {offering.collected} / {offering.target}
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all"
                  style={{ width: `${offering.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bank Accounts */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Rekening Bank</h3>
        <div className="space-y-4">
          {finance.bankAccounts.map((account, index) => (
            <div
              key={index}
              className="p-4 border border-border rounded-lg space-y-1"
            >
              <p className="font-medium">{account.bank}</p>
              <p className="text-sm text-muted-foreground">{account.number}</p>
              <p className="text-sm text-muted-foreground">a.n. {account.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
