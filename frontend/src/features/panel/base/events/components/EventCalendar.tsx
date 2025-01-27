import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { id } from "date-fns/locale";

interface Event {
  id: string;
  title: string;
  date: Date;
  type: "ibadah" | "kegiatan" | "rapat";
  location: string;
}

export function EventCalendar() {
  const [date, setDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "Ibadah Minggu",
      date: new Date(),
      type: "ibadah",
      location: "Gedung Gereja",
    },
    {
      id: "2",
      title: "Rapat Majelis",
      date: new Date(),
      type: "rapat",
      location: "Ruang Konsistori",
    },
    // Add more dummy data as needed
  ]);

  const getEventsByDate = (date: Date) => {
    return events.filter(
      (event) =>
        format(event.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
    );
  };

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
    <div className="grid grid-cols-7 gap-6">
      <div className="col-span-5">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(date) => date && setDate(date)}
          className="border rounded-md p-4"
          locale={id}
          modifiers={{
            event: (date) => getEventsByDate(date).length > 0,
          }}
          modifiersStyles={{
            event: { fontWeight: "bold", textDecoration: "underline" },
          }}
        />
      </div>

      <div className="col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>
              {format(date, "EEEE, dd MMMM yyyy", { locale: id })}
            </CardTitle>
            <CardDescription>
              {getEventsByDate(date).length} kegiatan hari ini
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {getEventsByDate(date).map((event) => (
              <div
                key={event.id}
                className="flex items-start justify-between gap-4 p-3 border rounded-lg"
              >
                <div className="space-y-1">
                  <Badge className={getEventBadgeClass(event.type)}>
                    {event.type === "ibadah" && "Ibadah"}
                    {event.type === "kegiatan" && "Kegiatan"}
                    {event.type === "rapat" && "Rapat"}
                  </Badge>
                  <p className="font-medium">{event.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {event.location}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
