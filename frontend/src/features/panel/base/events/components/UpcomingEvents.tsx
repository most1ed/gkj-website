import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Calendar, MapPin, Users } from "lucide-react";

interface Event {
  id: string;
  title: string;
  date: Date;
  location: string;
  type: "ibadah" | "kegiatan" | "rapat";
  capacity: number;
  registered: number;
  description: string;
  image?: string;
}

export function UpcomingEvents() {
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "Retreat Pemuda",
      date: new Date(),
      location: "Villa Kaliurang",
      type: "kegiatan",
      capacity: 50,
      registered: 35,
      description: "Retreat tahunan pemuda dengan tema 'Bertumbuh dalam Kristus'",
      image: "/images/events/retreat.jpg",
    },
    {
      id: "2",
      title: "Ibadah Natal",
      date: new Date(),
      location: "Gedung Gereja",
      type: "ibadah",
      capacity: 200,
      registered: 150,
      description: "Ibadah Natal bersama seluruh jemaat",
      image: "/images/events/natal.jpg",
    },
    // Add more dummy data as needed
  ]);

  const getEventBadgeClass = (type: Event["type"]) => {
    switch (type) {
      case "ibadah":
        return "bg-purple-100 text-purple-700";
      case "kegiatan":
        return "bg-blue-100 text-blue-700";
      case "rapat":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <Card key={event.id} className="overflow-hidden">
          {event.image && (
            <div
              className="h-48 bg-cover bg-center"
              style={{ backgroundImage: `url(${event.image})` }}
            />
          )}
          <CardHeader>
            <div className="flex items-start justify-between">
              <Badge className={getEventBadgeClass(event.type)}>
                {event.type === "ibadah" && "Ibadah"}
                {event.type === "kegiatan" && "Kegiatan"}
                {event.type === "rapat" && "Rapat"}
              </Badge>
              <Badge variant="outline">
                {event.registered}/{event.capacity} peserta
              </Badge>
            </div>
            <CardTitle>{event.title}</CardTitle>
            <CardDescription>{event.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              {format(event.date, "EEEE, dd MMMM yyyy", { locale: id })}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              {event.location}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Users className="h-4 w-4 text-muted-foreground" />
              {event.capacity - event.registered} slot tersisa
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Daftar Sekarang</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
