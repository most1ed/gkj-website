import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EventCalendar } from "./components/EventCalendar";
import { MyRegistrations } from "./components/MyRegistrations";
import { UpcomingEvents } from "./components/UpcomingEvents";
import { EventHistory } from "./components/EventHistory";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { useUserEvents } from "./hooks/useUserEvents";

export default function UserEventsPage() {
  const { data, isLoading } = useUserEvents();

  return (
    <div className="space-y-6 p-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Kegiatan</h2>
          <p className="text-muted-foreground">
            Lihat dan daftar kegiatan gereja
          </p>
        </div>
        <Button variant="outline">
          <Calendar className="mr-2 h-4 w-4" />
          Lihat Kalender
        </Button>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upcoming">Kegiatan Mendatang</TabsTrigger>
          <TabsTrigger value="calendar">Kalender</TabsTrigger>
          <TabsTrigger value="registrations">Pendaftaran Saya</TabsTrigger>
          <TabsTrigger value="history">Riwayat</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="space-y-4">
          <UpcomingEvents data={data?.upcoming} />
        </TabsContent>
        
        <TabsContent value="calendar" className="space-y-4">
          <EventCalendar data={data?.calendar} />
        </TabsContent>
        
        <TabsContent value="registrations" className="space-y-4">
          <MyRegistrations data={data?.registrations} />
        </TabsContent>
        
        <TabsContent value="history" className="space-y-4">
          <EventHistory data={data?.history} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
