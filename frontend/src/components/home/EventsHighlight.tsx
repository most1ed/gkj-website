import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CalendarDays, ChevronRight, PlayCircle, Users2 } from "lucide-react";

export function EventsHighlight() {
  const upcomingEvents = [
    {
      title: "Sakramen Perjamuan",
      date: "2 Februari 2025",
      time: "07.00 WIB",
      type: "Ibadah Khusus",
      highlight: true,
      icon: Users2
    },
    {
      title: "Sidang Majelis",
      date: "19 Januari 2025",
      time: "11.00 WIB",
      type: "Rapat",
      icon: CalendarDays
    },
    {
      title: "Retreat Pemuda",
      date: "15 Februari 2025",
      time: "08.00 WIB",
      type: "Kegiatan",
      icon: Users2
    }
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Upcoming Events */}
      <Card className="md:row-span-2">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Agenda Mendatang</h2>
              <p className="text-sm text-muted-foreground">Kegiatan penting dalam waktu dekat</p>
            </div>
            <Button variant="ghost" size="icon">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-4">
            {upcomingEvents.map((event, index) => {
              const Icon = event.icon;
              return (
                <div
                  key={index}
                  className={`flex items-start gap-4 p-4 rounded-lg transition-colors ${
                    event.highlight
                      ? "bg-primary/10 border border-primary/20"
                      : "hover:bg-muted"
                  }`}
                >
                  <div className={`p-2 rounded-full ${
                    event.highlight ? "bg-primary/20" : "bg-muted"
                  }`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium leading-none mb-1">{event.title}</h3>
                        <p className="text-sm text-muted-foreground">{event.type}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{event.date}</p>
                        <p className="text-xs text-muted-foreground">{event.time}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <Button variant="outline" className="w-full mt-4">
            Lihat Semua Agenda
          </Button>
        </CardContent>
      </Card>

      {/* Live Streaming Card */}
      <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-background">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-primary/20">
              <PlayCircle className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold">Ibadah Online</h3>
              <p className="text-sm text-muted-foreground mb-4">Minggu, 07.00 WIB</p>
              <Button variant="default" className="w-full">
                Tonton Sekarang
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Links Card */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-4">Tautan Cepat</h3>
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              <CalendarDays className="mr-2 h-4 w-4" />
              Jadwal Lengkap
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Users2 className="mr-2 h-4 w-4" />
              Pelayanan Jemaat
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
