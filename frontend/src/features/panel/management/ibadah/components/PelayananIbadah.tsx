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
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Search, Edit, Trash2, Check, X } from "lucide-react";

interface ServiceSchedule {
  id: string;
  date: Date;
  time: string;
  role: string;
  name: string;
  status: "confirmed" | "pending" | "declined";
  notes?: string;
}

export function PelayananIbadah() {
  const [searchQuery, setSearchQuery] = useState("");
  const [schedules, setSchedules] = useState<ServiceSchedule[]>([
    {
      id: "1",
      date: new Date("2024-01-28"),
      time: "07:00",
      role: "Liturgos",
      name: "Pnt. Jane Smith",
      status: "confirmed",
    },
    {
      id: "2",
      date: new Date("2024-01-28"),
      time: "09:00",
      role: "Organis",
      name: "Sdr. John Doe",
      status: "pending",
      notes: "Menunggu konfirmasi",
    },
    {
      id: "3",
      date: new Date("2024-01-28"),
      time: "07:00",
      role: "Penyambut",
      name: "Ibu Maria",
      status: "declined",
      notes: "Ada keperluan keluarga",
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
      schedule.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      schedule.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Jadwal Pelayanan</h3>
          <p className="text-sm text-muted-foreground">
            Daftar jadwal pelayanan ibadah
          </p>
        </div>
        <Button>
          Atur Jadwal
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Pelayan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground mt-1">
              Pelayan aktif bulan ini
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Terkonfirmasi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              18
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              75% dari total jadwal
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Menunggu
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              4
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Perlu konfirmasi
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Perlu Pengganti
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
              2
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Butuh penggantian
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari berdasarkan nama atau peran pelayanan..."
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
              <TableHead>Tanggal</TableHead>
              <TableHead>Waktu</TableHead>
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
                  {format(schedule.date, "dd MMM yyyy", { locale: id })}
                </TableCell>
                <TableCell>{schedule.time}</TableCell>
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
                      <Button size="sm" variant="outline" className="text-green-600 dark:text-green-400">
                        <Check className="h-4 w-4 mr-2" />
                        Terima
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 dark:text-red-400">
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
  );
}
