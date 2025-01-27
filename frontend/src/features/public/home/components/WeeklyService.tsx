import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export function WeeklyService() {
  const serviceInfo = {
    date: "26 Januari 2025",
    type: "Minggu Biasa II",
    liturgicalColor: "Hijau",
    preacher: "Pdt. Lusindo Tobing (GKJ Nehemia)",
    worship: {
      coordinator: "Pnt. Joko Mulyono",
      companion: "Dkn. Bambang Prakoso",
      greeter: "Pnt. Yidi Rengganis",
      musician: "Pudjo – Eko & Dina",
      worshipTeam: "Kel. Victor Emanuel",
      herald: "Pnt. Rinto Hadi",
      liturgist: "Dkn. Yehezkiel Panji",
      multimedia: "Tim Multimedia",
      elder: "Pnt. Andreas Dhanu"
    },
    songs: [
      "NKB 3:1-2",
      "KJ 46:1-2",
      "KJ 32:1, 3",
      "KJ 383:1,3",
      "KJ 290",
      "KJ 425:1-2"
    ],
    bibleReading: "Lukas 4:14-21"
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ibadah Minggu Ini</CardTitle>
        <CardDescription>{serviceInfo.date} - {serviceInfo.type}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Main Service Info */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium">Warna Liturgis</span>
              <span className="text-muted-foreground">{serviceInfo.liturgicalColor}</span>
            </div>
            <div>
              <span className="font-medium">Pelayan Firman</span>
              <p className="text-muted-foreground">{serviceInfo.preacher}</p>
            </div>
          </div>

          {/* Songs */}
          <div>
            <h3 className="font-medium mb-2">Lagu-lagu Pujian</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              {serviceInfo.songs.map((song, index) => (
                <li key={index}>{song}</li>
              ))}
            </ul>
          </div>

          {/* Bible Reading */}
          <div>
            <span className="font-medium">Bacaan Alkitab</span>
            <p className="text-muted-foreground">{serviceInfo.bibleReading}</p>
          </div>

          {/* Service Team */}
          <div>
            <h3 className="font-medium mb-2">Tim Pelayanan</h3>
            <div className="space-y-1 text-sm">
              {Object.entries(serviceInfo.worship).map(([role, person]) => (
                <div key={role} className="flex justify-between">
                  <span className="capitalize">{role.replace(/([A-Z])/g, " $1").trim()}</span>
                  <span className="text-muted-foreground">{person}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-2">
          <Button variant="default" className="w-full">Ikuti Ibadah Online</Button>
          <Button variant="outline" className="w-full">Lihat Tata Ibadah</Button>
        </div>
      </CardContent>
    </Card>
  );
}
