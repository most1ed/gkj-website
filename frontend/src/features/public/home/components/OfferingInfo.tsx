import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export function OfferingInfo() {
  const offeringAccounts = [
    {
      bank: "BNI",
      number: "0000565324",
      type: "Persembahan Mingguan",
      suffix: "1"
    },
    {
      bank: "BNI",
      number: "0000565324",
      type: "Persembahan Bulanan",
      suffix: "2"
    },
    {
      bank: "Mandiri",
      number: "123-00-9302297-0",
      type: "Persembahan PHBP",
      suffix: "1"
    }
  ];

  const recentOfferings = [
    {
      type: "Mingguan",
      date: "12 Januari 2025",
      amount: "3,160,000"
    },
    {
      type: "PHBP",
      date: "12 Januari 2025",
      amount: "1,255,000"
    },
    {
      type: "Khusus",
      date: "12 Januari 2025",
      amount: "7,000,000",
      note: "Bantuan Natal dari PT KAI"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informasi Persembahan</CardTitle>
        <CardDescription>Rekening dan data persembahan terkini</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Bank Accounts */}
          <div>
            <h3 className="font-medium mb-3">Rekening Persembahan</h3>
            <div className="space-y-3">
              {offeringAccounts.map((account, index) => (
                <div
                  key={index}
                  className="p-3 bg-muted rounded-lg"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{account.type}</p>
                      <p className="text-sm text-muted-foreground">{account.bank} - {account.number}</p>
                    </div>
                    <div className="bg-primary/10 px-2 py-1 rounded text-sm">
                      Akhiran {account.suffix}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Offerings */}
          <div>
            <h3 className="font-medium mb-3">Persembahan Terkini</h3>
            <div className="space-y-2">
              {recentOfferings.map((offering, index) => (
                <div
                  key={index}
                  className="flex justify-between items-start text-sm"
                >
                  <div>
                    <p className="font-medium">{offering.type}</p>
                    <p className="text-muted-foreground">{offering.date}</p>
                    {offering.note && (
                      <p className="text-xs text-muted-foreground">{offering.note}</p>
                    )}
                  </div>
                  <p className="font-medium">Rp {offering.amount}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <Button variant="outline" className="w-full">Lihat Detail Persembahan</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
