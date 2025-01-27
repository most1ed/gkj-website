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
import { Search, Plus, Edit, Trash2, Calendar } from "lucide-react";

interface Activity {
  id: string;
  title: string;
  description: string;
  commission: string;
  startDate: Date;
  endDate?: Date;
  location: string;
  status: "planned" | "ongoing" | "completed" | "cancelled";
  participants: number;
  budget: number;
}

export function KegiatanPelayanan() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: "1",
      title: "Retreat Pemuda",
      description: "Retreat tahunan pemuda GKJ",
      commission: "Komisi Pemuda",
      startDate: new Date("2024-02-15"),
      endDate: new Date("2024-02-17"),
      location: "Villa Kaliurang",
      status: "planned",
      participants: 50,
      budget: 25000000,
    },
    {
      id: "2",
      title: "Bakti Sosial",
      description: "Bakti sosial untuk masyarakat sekitar",
      commission: "Komisi Diakonia",
      startDate: new Date("2024-01-20"),
      status: "completed",
      location: "Balai RW",
      participants: 100,
      budget: 15000000,
    },
  ]);

  const getStatusBadgeClass = (status: Activity["status"]) => {
    switch (status) {
      case "planned":
        return "bg-blue-100 text-blue-700 dark:bg-blue-700 dark:text-blue-100";
      case "ongoing":
        return "bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100";
      case "completed":
        return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-100";
      case "cancelled":
        return "bg-red-100 text-red-700 dark:bg-red-700 dark:text-red-100";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-100";
    }
  };

  const getStatusText = (status: Activity["status"]) => {
    switch (status) {
      case "planned":
        return "Direncanakan";
      case "ongoing":
        return "Berlangsung";
      case "completed":
        return "Selesai";
      case "cancelled":
        return "Dibatalkan";
      default:
        return "-";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const filteredActivities = activities.filter(
    (activity) =>
      activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.commission.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Kegiatan Pelayanan</h3>
          <p className="text-sm text-muted-foreground">
            Daftar kegiatan pelayanan gereja
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Tambah Kegiatan
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Kegiatan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground mt-1">
              Kegiatan bulan ini
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Sedang Berlangsung
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              3
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Kegiatan aktif
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Partisipan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">450</div>
            <p className="text-xs text-muted-foreground mt-1">
              Peserta aktif
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Anggaran
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(75000000)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Anggaran bulan ini
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari berdasarkan judul atau komisi..."
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
              <TableHead>Kegiatan</TableHead>
              <TableHead>Komisi</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead>Lokasi</TableHead>
              <TableHead>Partisipan</TableHead>
              <TableHead>Anggaran</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredActivities.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell>
                  <div className="font-medium">{activity.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {activity.description}
                  </div>
                </TableCell>
                <TableCell>{activity.commission}</TableCell>
                <TableCell>
                  <div>
                    {format(activity.startDate, "dd MMM yyyy", { locale: id })}
                  </div>
                  {activity.endDate && (
                    <div className="text-sm text-muted-foreground">
                      s/d{" "}
                      {format(activity.endDate, "dd MMM yyyy", { locale: id })}
                    </div>
                  )}
                </TableCell>
                <TableCell>{activity.location}</TableCell>
                <TableCell>{activity.participants} orang</TableCell>
                <TableCell>{formatCurrency(activity.budget)}</TableCell>
                <TableCell>
                  <Badge className={getStatusBadgeClass(activity.status)}>
                    {getStatusText(activity.status)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button size="sm" variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    Jadwal
                  </Button>
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
