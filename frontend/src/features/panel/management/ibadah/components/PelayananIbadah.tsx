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
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Search, Edit, Trash2, Check, X, Plus } from "lucide-react";

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

  const [isAddScheduleModalOpen, setIsAddScheduleModalOpen] = useState(false);
  const [isEditScheduleModalOpen, setIsEditScheduleModalOpen] = useState(false);
  const [currentSchedule, setCurrentSchedule] = useState<Partial<ServiceSchedule>>({});

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

  const handleAddSchedule = () => {
    if (!currentSchedule.name || !currentSchedule.role || !currentSchedule.time) {
      toast({
        title: "Error",
        description: "Silakan lengkapi semua informasi jadwal",
        variant: "destructive"
      });
      return;
    }

    const newSchedule: ServiceSchedule = {
      id: `${schedules.length + 1}`,
      date: currentSchedule.date || new Date(),
      time: currentSchedule.time,
      role: currentSchedule.role,
      name: currentSchedule.name,
      status: currentSchedule.status || "pending",
      notes: currentSchedule.notes
    };

    setSchedules([...schedules, newSchedule]);
    toast({
      title: "Jadwal Ditambahkan",
      description: `Jadwal untuk ${newSchedule.name} berhasil ditambahkan.`
    });

    // Reset states
    setIsAddScheduleModalOpen(false);
    setCurrentSchedule({});
  };

  const handleEditSchedule = () => {
    const updatedSchedules = schedules.map(schedule => 
      schedule.id === currentSchedule.id 
        ? { ...schedule, ...currentSchedule } as ServiceSchedule 
        : schedule
    );

    setSchedules(updatedSchedules);
    toast({
      title: "Jadwal Diperbarui",
      description: `Jadwal untuk ${currentSchedule.name} berhasil diperbarui.`
    });

    // Reset states
    setIsEditScheduleModalOpen(false);
    setCurrentSchedule({});
  };

  const handleDeleteSchedule = (scheduleId: string) => {
    const updatedSchedules = schedules.filter(schedule => schedule.id !== scheduleId);
    setSchedules(updatedSchedules);
    
    toast({
      title: "Jadwal Dihapus",
      description: "Jadwal pelayanan telah dihapus.",
      variant: "destructive"
    });
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
        <Button onClick={() => {
          setCurrentSchedule({});
          setIsAddScheduleModalOpen(true);
        }}>
          <Plus className="mr-2 h-4 w-4" />
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
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => {
                      setCurrentSchedule(schedule);
                      setIsEditScheduleModalOpen(true);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => handleDeleteSchedule(schedule.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Add Schedule Modal */}
      <Dialog open={isAddScheduleModalOpen} onOpenChange={setIsAddScheduleModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Tambah Jadwal Pelayanan</DialogTitle>
            <DialogDescription>
              Masukkan detail jadwal pelayanan baru
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-6 py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Tanggal</Label>
                <Calendar
                  mode="single"
                  selected={currentSchedule.date || new Date()}
                  onSelect={(date) => setCurrentSchedule(prev => ({ 
                    ...prev, 
                    date: date || new Date() 
                  }))}
                  className="border rounded-md"
                  locale={id}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Waktu</Label>
                <Input 
                  id="time" 
                  type="time"
                  value={currentSchedule.time || ""}
                  onChange={(e) => setCurrentSchedule(prev => ({ 
                    ...prev, 
                    time: e.target.value 
                  }))}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="role">Peran</Label>
                <Select
                  value={currentSchedule.role}
                  onValueChange={(value) => setCurrentSchedule(prev => ({ 
                    ...prev, 
                    role: value 
                  }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Peran" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Liturgos">Liturgos</SelectItem>
                    <SelectItem value="Organis">Organis</SelectItem>
                    <SelectItem value="Penyambut">Penyambut</SelectItem>
                    <SelectItem value="Pembicara">Pembicara</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Nama Pelayan</Label>
                <Input 
                  id="name" 
                  placeholder="Nama lengkap pelayan"
                  value={currentSchedule.name || ""}
                  onChange={(e) => setCurrentSchedule(prev => ({ 
                    ...prev, 
                    name: e.target.value 
                  }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Catatan</Label>
                <Textarea 
                  id="notes" 
                  placeholder="Catatan tambahan (opsional)"
                  value={currentSchedule.notes || ""}
                  onChange={(e) => setCurrentSchedule(prev => ({ 
                    ...prev, 
                    notes: e.target.value 
                  }))}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button 
              type="submit"
              onClick={handleAddSchedule}
            >
              Tambah Jadwal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Schedule Modal */}
      <Dialog open={isEditScheduleModalOpen} onOpenChange={setIsEditScheduleModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Jadwal Pelayanan</DialogTitle>
            <DialogDescription>
              Perbarui detail jadwal pelayanan
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-6 py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Tanggal</Label>
                <Calendar
                  mode="single"
                  selected={currentSchedule.date || new Date()}
                  onSelect={(date) => setCurrentSchedule(prev => ({ 
                    ...prev, 
                    date: date || new Date() 
                  }))}
                  className="border rounded-md"
                  locale={id}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Waktu</Label>
                <Input 
                  id="time" 
                  type="time"
                  value={currentSchedule.time || ""}
                  onChange={(e) => setCurrentSchedule(prev => ({ 
                    ...prev, 
                    time: e.target.value 
                  }))}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="role">Peran</Label>
                <Select
                  value={currentSchedule.role}
                  onValueChange={(value) => setCurrentSchedule(prev => ({ 
                    ...prev, 
                    role: value 
                  }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Peran" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Liturgos">Liturgos</SelectItem>
                    <SelectItem value="Organis">Organis</SelectItem>
                    <SelectItem value="Penyambut">Penyambut</SelectItem>
                    <SelectItem value="Pembicara">Pembicara</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Nama Pelayan</Label>
                <Input 
                  id="name" 
                  placeholder="Nama lengkap pelayan"
                  value={currentSchedule.name || ""}
                  onChange={(e) => setCurrentSchedule(prev => ({ 
                    ...prev, 
                    name: e.target.value 
                  }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={currentSchedule.status}
                  onValueChange={(value) => setCurrentSchedule(prev => ({ 
                    ...prev, 
                    status: value as ServiceSchedule['status'] 
                  }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="confirmed">Dikonfirmasi</SelectItem>
                    <SelectItem value="pending">Menunggu</SelectItem>
                    <SelectItem value="declined">Ditolak</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Catatan</Label>
                <Textarea 
                  id="notes" 
                  placeholder="Catatan tambahan (opsional)"
                  value={currentSchedule.notes || ""}
                  onChange={(e) => setCurrentSchedule(prev => ({ 
                    ...prev, 
                    notes: e.target.value 
                  }))}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button 
              type="submit"
              onClick={handleEditSchedule}
            >
              Simpan Perubahan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
