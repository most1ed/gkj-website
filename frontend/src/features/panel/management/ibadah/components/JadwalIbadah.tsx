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
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Plus, Edit, Trash2, Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

interface WorshipService {
  id: string;
  date: Date;
  time: string;
  type: string;
  theme?: string;
  preacher: string;
  liturgist: string;
  musicians: string[];
  status: "scheduled" | "ongoing" | "completed" | "cancelled";
}

export function JadwalIbadah() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [services, setServices] = useState<WorshipService[]>([
    {
      id: "1",
      date: new Date("2024-01-28"),
      time: "07:00",
      type: "Ibadah Minggu",
      theme: "Hidup dalam Kasih Kristus",
      preacher: "Pdt. John Doe",
      liturgist: "Pnt. Jane Smith",
      musicians: ["Organis 1", "Pianis 1", "Gitaris 1"],
      status: "scheduled",
    },
    {
      id: "2",
      date: new Date("2024-01-28"),
      time: "09:00",
      type: "Ibadah Minggu",
      theme: "Hidup dalam Kasih Kristus",
      preacher: "Pdt. John Doe",
      liturgist: "Pnt. Bob Wilson",
      musicians: ["Organis 2", "Pianis 2", "Gitaris 2"],
      status: "scheduled",
    },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentService, setCurrentService] = useState<Partial<WorshipService>>({});

  const getStatusBadgeClass = (status: WorshipService["status"]) => {
    switch (status) {
      case "scheduled": return "bg-blue-100 text-blue-700 dark:bg-blue-700 dark:text-blue-100";
      case "ongoing": return "bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100";
      case "completed": return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-100";
      case "cancelled": return "bg-red-100 text-red-700 dark:bg-red-700 dark:text-red-100";
      default: return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-100";
    }
  };

  const getStatusText = (status: WorshipService["status"]) => {
    switch (status) {
      case "scheduled": return "Terjadwal";
      case "ongoing": return "Berlangsung";
      case "completed": return "Selesai";
      case "cancelled": return "Dibatalkan";
      default: return "-";
    }
  };

  const handleAddService = () => {
    const newService: WorshipService = {
      id: `${services.length + 1}`,
      date: selectedDate || new Date(),
      time: currentService.time || "09:00",
      type: currentService.type || "Ibadah Minggu",
      theme: currentService.theme,
      preacher: currentService.preacher || "Pdt. Tidak Diketahui",
      liturgist: currentService.liturgist || "Pnt. Tidak Diketahui",
      musicians: currentService.musicians || [],
      status: "scheduled"
    };

    setServices([...services, newService]);
    toast({
      title: "Jadwal Ibadah Ditambahkan",
      description: `${newService.type} pada ${format(newService.date, 'PPP', { locale: id })} berhasil ditambahkan.`
    });

    setIsAddModalOpen(false);
    setCurrentService({});
  };

  const handleEditService = () => {
    const updatedServices = services.map(service => 
      service.id === currentService.id 
        ? { ...service, ...currentService } as WorshipService 
        : service
    );

    setServices(updatedServices);
    toast({
      title: "Jadwal Ibadah Diperbarui",
      description: `${currentService.type} berhasil diperbarui.`
    });

    setIsEditModalOpen(false);
    setCurrentService({});
  };

  const handleDeleteService = (serviceId: string) => {
    const updatedServices = services.filter(service => service.id !== serviceId);
    setServices(updatedServices);
    
    toast({
      title: "Jadwal Ibadah Dihapus",
      description: "Jadwal ibadah telah dihapus dari daftar.",
      variant: "destructive"
    });
  };

  const filteredServices = selectedDate
    ? services.filter(
        (service) =>
          format(service.date, "yyyy-MM-dd") ===
          format(selectedDate, "yyyy-MM-dd")
      )
    : services;

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Kalender</CardTitle>
          <CardDescription>
            Pilih tanggal untuk melihat jadwal ibadah
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
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium">
              Jadwal Ibadah{" "}
              {selectedDate &&
                format(selectedDate, "EEEE, dd MMMM yyyy", { locale: id })}
            </h3>
            <p className="text-sm text-muted-foreground">
              Daftar jadwal ibadah dan pelayanan
            </p>
          </div>
          <Button onClick={() => {
            setCurrentService({ date: selectedDate || new Date() });
            setIsAddModalOpen(true);
          }}>
            <Plus className="h-4 w-4 mr-2" />
            Tambah Jadwal
          </Button>
        </div>

        <div className="border rounded-lg dark:border-gray-700">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Waktu</TableHead>
                <TableHead>Jenis Ibadah</TableHead>
                <TableHead>Tema</TableHead>
                <TableHead>Pelayan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredServices.map((service) => (
                <TableRow key={service.id}>
                  <TableCell>
                    <div className="font-medium">{service.time}</div>
                    <div className="text-sm text-muted-foreground">
                      {format(service.date, "EEEE", { locale: id })}
                    </div>
                  </TableCell>
                  <TableCell>{service.type}</TableCell>
                  <TableCell>{service.theme || "-"}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div>
                        <span className="font-medium">Pengkhotbah:</span>{" "}
                        {service.preacher}
                      </div>
                      <div>
                        <span className="font-medium">Liturgos:</span>{" "}
                        {service.liturgist}
                      </div>
                      <div>
                        <span className="font-medium">Pemusik:</span>{" "}
                        {service.musicians.join(", ")}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeClass(service.status)}>
                      {getStatusText(service.status)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => {
                        setCurrentService(service);
                        setIsEditModalOpen(true);
                      }}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => handleDeleteService(service.id)}
                    >
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

      {/* Add Service Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah Jadwal Ibadah</DialogTitle>
            <DialogDescription>
              Masukkan detail jadwal ibadah baru
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Jenis Ibadah
              </Label>
              <Select 
                value={currentService.type || "Ibadah Minggu"}
                onValueChange={(value) => setCurrentService(prev => ({ ...prev, type: value }))}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Pilih Jenis Ibadah" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ibadah Minggu">Ibadah Minggu</SelectItem>
                  <SelectItem value="Ibadah Khusus">Ibadah Khusus</SelectItem>
                  <SelectItem value="Doa Pemuda">Doa Pemuda</SelectItem>
                  <SelectItem value="Kebaktian Kategorial">Kebaktian Kategorial</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="time" className="text-right">
                Waktu
              </Label>
              <Input
                id="time"
                type="time"
                value={currentService.time || "09:00"}
                onChange={(e) => setCurrentService(prev => ({ ...prev, time: e.target.value }))}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="theme" className="text-right">
                Tema
              </Label>
              <Input
                id="theme"
                value={currentService.theme || ""}
                onChange={(e) => setCurrentService(prev => ({ ...prev, theme: e.target.value }))}
                placeholder="Tema ibadah (opsional)"
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="preacher" className="text-right">
                Pengkhotbah
              </Label>
              <Input
                id="preacher"
                value={currentService.preacher || ""}
                onChange={(e) => setCurrentService(prev => ({ ...prev, preacher: e.target.value }))}
                placeholder="Nama pengkhotbah"
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="liturgist" className="text-right">
                Liturgos
              </Label>
              <Input
                id="liturgist"
                value={currentService.liturgist || ""}
                onChange={(e) => setCurrentService(prev => ({ ...prev, liturgist: e.target.value }))}
                placeholder="Nama liturgos"
                className="col-span-3"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleAddService}>
              Tambah Jadwal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Service Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Jadwal Ibadah</DialogTitle>
            <DialogDescription>
              Perbarui detail jadwal ibadah
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Jenis Ibadah
              </Label>
              <Select 
                value={currentService.type || "Ibadah Minggu"}
                onValueChange={(value) => setCurrentService(prev => ({ ...prev, type: value }))}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Pilih Jenis Ibadah" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ibadah Minggu">Ibadah Minggu</SelectItem>
                  <SelectItem value="Ibadah Khusus">Ibadah Khusus</SelectItem>
                  <SelectItem value="Doa Pemuda">Doa Pemuda</SelectItem>
                  <SelectItem value="Kebaktian Kategorial">Kebaktian Kategorial</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="time" className="text-right">
                Waktu
              </Label>
              <Input
                id="time"
                type="time"
                value={currentService.time || "09:00"}
                onChange={(e) => setCurrentService(prev => ({ ...prev, time: e.target.value }))}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="theme" className="text-right">
                Tema
              </Label>
              <Input
                id="theme"
                value={currentService.theme || ""}
                onChange={(e) => setCurrentService(prev => ({ ...prev, theme: e.target.value }))}
                placeholder="Tema ibadah (opsional)"
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="preacher" className="text-right">
                Pengkhotbah
              </Label>
              <Input
                id="preacher"
                value={currentService.preacher || ""}
                onChange={(e) => setCurrentService(prev => ({ ...prev, preacher: e.target.value }))}
                placeholder="Nama pengkhotbah"
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="liturgist" className="text-right">
                Liturgos
              </Label>
              <Input
                id="liturgist"
                value={currentService.liturgist || ""}
                onChange={(e) => setCurrentService(prev => ({ ...prev, liturgist: e.target.value }))}
                placeholder="Nama liturgos"
                className="col-span-3"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleEditService}>
              Simpan Perubahan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
