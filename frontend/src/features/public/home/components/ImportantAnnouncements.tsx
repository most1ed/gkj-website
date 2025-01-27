import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export function ImportantAnnouncements() {
  const announcements = [
    {
      title: "Persembahan Khusus",
      content: "Majelis telah menerima persembahan khusus berupa seperangkat sarana kebersihan dan bantuan dana dari PT KAI serta warga Wilayah 1.",
      date: "12 Januari 2025",
      type: "info"
    },
    {
      title: "Jemaat Berulang Tahun",
      content: "Ada 18 warga jemaat yang berulang tahun di bulan Januari. Tuhan memberkati!",
      date: "Januari 2025",
      type: "celebration"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pengumuman Penting</CardTitle>
        <CardDescription>Informasi terkini seputar gereja</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {announcements.map((announcement, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg ${
                announcement.type === "info"
                  ? "bg-blue-500/10 border border-blue-500/20"
                  : "bg-green-500/10 border border-green-500/20"
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold">{announcement.title}</h3>
                <span className="text-sm text-muted-foreground">{announcement.date}</span>
              </div>
              <p className="text-sm text-muted-foreground">{announcement.content}</p>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Button variant="outline" className="w-full">Lihat Semua Pengumuman</Button>
        </div>
      </CardContent>
    </Card>
  );
}
