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
import { Calendar, MapPin, Users } from "lucide-react";

interface Registration {
  id: string;
  eventTitle: string;
  eventDate: Date;
  location: string;
  participants: number;
  status: "confirmed" | "pending" | "cancelled";
}

export function MyRegistrations() {
  const [registrations, setRegistrations] = useState<Registration[]>([
    {
      id: "1",
      eventTitle: "Ibadah Minggu",
      eventDate: new Date(),
      location: "Gedung Gereja",
      participants: 2,
      status: "confirmed",
    },
    {
      id: "2",
      eventTitle: "Retreat Pemuda",
      eventDate: new Date(),
      location: "Villa Kaliurang",
      participants: 1,
      status: "pending",
    },
    // Add more dummy data as needed
  ]);

  const getStatusBadgeClass = (status: Registration["status"]) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  const getStatusText = (status: Registration["status"]) => {
    switch (status) {
      case "confirmed":
        return "Terkonfirmasi";
      case "cancelled":
        return "Dibatalkan";
      default:
        return "Menunggu";
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
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {registrations.map((reg) => (
              <TableRow key={reg.id}>
                <TableCell className="font-medium">
                  {reg.eventTitle}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    {format(reg.eventDate, "dd MMMM yyyy", { locale: id })}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    {reg.location}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    {reg.participants} orang
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusBadgeClass(reg.status)}>
                    {getStatusText(reg.status)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  {reg.status === "pending" && (
                    <>
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                      <Button size="sm" variant="destructive">
                        Batal
                      </Button>
                    </>
                  )}
                  {reg.status === "confirmed" && (
                    <Button size="sm" variant="outline">
                      Detail
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
