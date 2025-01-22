import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export function UpcomingEvents() {
  const events = [
    {
      title: "Sakramen Perjamuan",
      date: "2 Februari 2025",
      type: "Ibadah Minggu",
      description: "Pelayanan Sakramen Perjamuan untuk warga gereja dewasa.",
      preparation: [
        { date: "19 Januari 2025", for: "Majelis", location: "Konsisturi" },
        { date: "24 Januari 2025", for: "Jemaat", location: "Via Zoom", time: "19.00 WIB" },
        { date: "31 Januari 2025", for: "Jemaat", location: "Via Zoom", time: "19.00 WIB" },
      ]
    },
    {
      title: "Sidang Majelis Pleno",
      date: "19 Januari 2025",
      type: "Rapat",
      description: "Persidangan Majelis Pleno di Ruang Konsisturi.",
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Agenda Mendatang</CardTitle>
        <CardDescription>Kegiatan penting dalam waktu dekat</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {events.map((event, index) => (
            <div key={index} className="border-b last:border-0 pb-6 last:pb-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-lg">{event.title}</h3>
                  <p className="text-muted-foreground text-sm">{event.type}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{event.date}</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-4">{event.description}</p>
              {event.preparation && (
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="font-medium mb-2">Jadwal Persiapan:</p>
                  <ul className="space-y-2">
                    {event.preparation.map((prep, idx) => (
                      <li key={idx} className="text-sm">
                        <span className="font-medium">{prep.for}:</span>{" "}
                        {prep.date}
                        {prep.time && ` - ${prep.time}`}
                        {prep.location && ` (${prep.location})`}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-6">
          <Button variant="outline" className="w-full">Lihat Semua Agenda</Button>
        </div>
      </CardContent>
    </Card>
  );
}
