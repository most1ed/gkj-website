import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Search, Plus, Edit, Trash2, Check, X } from "lucide-react";

interface ServiceSchedule {
  id: string;
  date: Date;
  time: string;
  activity: string;
  commission: string;
  role: string;
  name: string;
  status: "confirmed" | "pending" | "declined";
  notes?: string;
}

export function JadwalPelayanan() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [searchQuery, setSearchQuery] = useState("");
  const [schedules, setSchedules] = useState<ServiceSchedule[]>([
    {
      id: "1",
      date: new Date("2024-01-28"),
      time: "09:00",
      activity: "Sekolah Minggu",
      commission: "Komisi Anak",
      role: "Guru",
      name: "Sdri. Maria",
      status: "confirmed",
    },
    {
      id: "2",
      date: new Date("2024-01-28"),
      time: "16:00",
      activity: "Persekutuan Pemuda",
      commission: "Komisi Pemuda",
      role: "Pembicara",
      name: "Pdt. John Doe",
      status: "pending",
      notes: "Menunggu konfirmasi",
    },
  ]);

  const getStatusBadgeClass = (status: ServiceSchedule["status"]) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100";
      case "pending":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-700 dark:text-yellow-100";
      case "declined":
        return "bg-red-100 text-red-700 dark:bg-red-700 dark:text-red-100";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-100";
    }
  };

  const getStatusText = (status: ServiceSchedule["status"]) => {
    switch (status) {
      case "confirmed":
        return "Dikonfirmasi";
      case "pending":
        return "Menunggu";
      case "declined":
        return "Ditolak";
      default:
        return "-";
    }
  };

  const filteredSchedules = schedules.filter(
    (schedule) =>
      (selectedDate
        ? format(schedule.date, "yyyy-MM-dd") ===
          format(selectedDate, "yyyy-MM-dd")
        : true) &&
      (searchQuery
        ? schedule.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          schedule.activity.toLowerCase().includes(searchQuery.toLowerCase()) ||
          schedule.commission.toLowerCase().includes(searchQuery.toLowerCase())
        : true)
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Kalender</CardTitle>
          <CardDescription>
            Pilih tanggal untuk melihat jadwal pelayanan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            locale={id}
            className="rounded-md border dark:border-gray-700"
          />
        </CardContent>
      </Card>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium">
              Jadwal Pelayanan{" "}
              {selectedDate &&
                format(selectedDate, "EEEE, dd MMMM yyyy", { locale: id })}
            </h3>
            <p className="text-sm text-muted-foreground">
              Daftar jadwal pelayanan komisi
            </p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Tambah Jadwal
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari berdasarkan nama, kegiatan, atau komisi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <div className="border rounded-lg dark:border-gray-700">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Waktu</TableHead>
                <TableHead>Kegiatan</TableHead>
                <TableHead>Komisi</TableHead>
                <TableHead>Peran</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Catatan</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSchedules.map((schedule) => (
                <TableRow key={schedule.id}>
                  <TableCell>
                    <div className="font-medium">{schedule.time}</div>
                    <div className="text-sm text-muted-foreground">
                      {format(schedule.date, "EEEE", { locale: id })}
                    </div>
                  </TableCell>
                  <TableCell>{schedule.activity}</TableCell>
                  <TableCell>{schedule.commission}</TableCell>
                  <TableCell>{schedule.role}</TableCell>
                  <TableCell className="font-medium">{schedule.name}</TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeClass(schedule.status)}>
                      {getStatusText(schedule.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>{schedule.notes || "-"}</TableCell>
                  <TableCell className="text-right space-x-2">
                    {schedule.status === "pending" && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-green-600 dark:text-green-400"
                        >
                          <Check className="h-4 w-4 mr-2" />
                          Terima
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 dark:text-red-400"
                        >
                          <X className="h-4 w-4 mr-2" />
                          Tolak
                        </Button>
                      </>
                    )}
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button size="sm" variant="destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Hapus
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
