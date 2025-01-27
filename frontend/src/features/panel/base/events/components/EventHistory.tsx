import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Calendar, MapPin, Users, FileText } from "lucide-react";

interface EventAttendance {
  id: string;
  eventTitle: string;
  eventDate: Date;
  location: string;
  participants: number;
  status: "attended" | "absent";
  certificate?: string;
}

export function EventHistory() {
  const [history, setHistory] = useState<EventAttendance[]>([
    {
      id: "1",
      eventTitle: "Retreat Pemuda 2023",
      eventDate: new Date("2023-12-20"),
      location: "Villa Kaliurang",
      participants: 1,
      status: "attended",
      certificate: "/certificates/retreat-2023.pdf",
    },
    {
      id: "2",
      eventTitle: "Ibadah Natal 2023",
      eventDate: new Date("2023-12-25"),
      location: "Gedung Gereja",
      participants: 2,
      status: "attended",
    },
    // Add more dummy data as needed
  ]);

  const getStatusBadgeClass = (status: EventAttendance["status"]) => {
    switch (status) {
      case "attended":
        return "bg-green-100 text-green-700";
      case "absent":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusText = (status: EventAttendance["status"]) => {
    switch (status) {
      case "attended":
        return "Hadir";
      case "absent":
        return "Tidak Hadir";
      default:
        return "-";
    }
  };

  return (
    <div className="space-y-6">
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Kegiatan</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead>Lokasi</TableHead>
              <TableHead>Peserta</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Sertifikat</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {history.map((event) => (
              <TableRow key={event.id}>
                <TableCell className="font-medium">
                  {event.eventTitle}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    {format(event.eventDate, "dd MMMM yyyy", { locale: id })}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    {event.location}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    {event.participants} orang
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusBadgeClass(event.status)}>
                    {getStatusText(event.status)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {event.certificate && (
                    <Button size="sm" variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      Unduh
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
