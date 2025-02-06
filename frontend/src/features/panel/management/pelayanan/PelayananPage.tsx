import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { KomisiManager } from "./components/KomisiManager";
import { KegiatanPelayanan } from "./components/KegiatanPelayanan";
import { JadwalPelayanan } from "./components/JadwalPelayanan";
import { LaporanPelayanan } from "./components/LaporanPelayanan";
import { PelayananStatistics } from "./components/PelayananStatistics";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Plus, FileDown, X, BarChart } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { usePelayananData } from "./hooks/usePelayananData";

export default function PelayananPage() {
  const { data, isLoading } = usePelayananData();
  const [isAddKegiatanModalOpen, setIsAddKegiatanModalOpen] = useState(false);
  const [currentKegiatan, setCurrentKegiatan] = useState<{
    nama?: string;
    deskripsi?: string;
    tanggal?: Date;
    komisi?: string;
  }>({});

  const handleExportLaporan = () => {
    // Simulate export process
    const exportData = {
      komisi: data?.komisi,
      kegiatan: data?.kegiatan,
      jadwal: data?.jadwal,
      laporan: data?.laporan
    };

    const jsonString = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `laporan_pelayanan_${format(new Date(), 'yyyy-MM-dd')}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Laporan Diekspor",
      description: `Laporan pelayanan berhasil diekspor pada ${format(new Date(), 'dd MMMM yyyy')}`,
    });
  };

  const handleAddKegiatan = () => {
    if (!currentKegiatan.nama || !currentKegiatan.komisi) {
      toast({
        title: "Error",
        description: "Nama kegiatan dan komisi wajib diisi",
        variant: "destructive"
      });
      return;
    }

    // Simulate adding kegiatan
    const newKegiatan = {
      id: `${(data?.kegiatan?.length || 0) + 1}`,
      nama: currentKegiatan.nama,
      deskripsi: currentKegiatan.deskripsi || "",
      tanggal: currentKegiatan.tanggal || new Date(),
      komisi: currentKegiatan.komisi,
      status: "Akan Datang"
    };

    toast({
      title: "Kegiatan Ditambahkan",
      description: `${newKegiatan.nama} berhasil ditambahkan ke komisi ${newKegiatan.komisi}`,
    });

    // Reset states
    setIsAddKegiatanModalOpen(false);
    setCurrentKegiatan({});
  };

  return (
    <div className="space-y-6 p-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Manajemen Pelayanan</h2>
          <p className="text-muted-foreground">
            Kelola komisi, kegiatan, dan jadwal pelayanan
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            onClick={handleExportLaporan}
          >
            <FileDown className="mr-2 h-4 w-4" />
            Export Laporan
          </Button>
          <Button 
            onClick={() => {
              setCurrentKegiatan({});
              setIsAddKegiatanModalOpen(true);
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Tambah Kegiatan
          </Button>
        </div>
      </div>

      <Tabs defaultValue="laporan" className="space-y-4">
        <TabsList>
          <TabsTrigger value="laporan">
            <BarChart className="mr-2 h-4 w-4" />
            Laporan
          </TabsTrigger>
          <TabsTrigger value="komisi">Komisi</TabsTrigger>
          <TabsTrigger value="kegiatan">Kegiatan</TabsTrigger>
          <TabsTrigger value="jadwal">Jadwal</TabsTrigger>
        </TabsList>
        
        <TabsContent value="laporan" className="space-y-4">
          <PelayananStatistics data={data} />
          <LaporanPelayanan data={data?.laporan} />
        </TabsContent>
        
        <TabsContent value="komisi" className="space-y-4">
          <KomisiManager data={data?.komisi} />
        </TabsContent>
        
        <TabsContent value="kegiatan" className="space-y-4">
          <KegiatanPelayanan data={data?.kegiatan} />
        </TabsContent>
        
        <TabsContent value="jadwal" className="space-y-4">
          <JadwalPelayanan data={data?.jadwal} />
        </TabsContent>
      </Tabs>

      {/* Add Kegiatan Modal */}
      <Dialog open={isAddKegiatanModalOpen} onOpenChange={setIsAddKegiatanModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Tambah Kegiatan Pelayanan</DialogTitle>
            <DialogDescription>
              Masukkan detail kegiatan pelayanan baru
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-6 py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nama">Nama Kegiatan</Label>
                <Input 
                  id="nama"
                  placeholder="Masukkan nama kegiatan"
                  value={currentKegiatan.nama || ""}
                  onChange={(e) => setCurrentKegiatan(prev => ({
                    ...prev,
                    nama: e.target.value
                  }))}
                />
              </div>

              <div className="space-y-2">
                <Label>Tanggal</Label>
                <Calendar
                  mode="single"
                  selected={currentKegiatan.tanggal || new Date()}
                  onSelect={(date) => setCurrentKegiatan(prev => ({ 
                    ...prev, 
                    tanggal: date || new Date() 
                  }))}
                  className="border rounded-md"
                  locale={id}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="komisi">Komisi</Label>
                <Select
                  value={currentKegiatan.komisi}
                  onValueChange={(value) => setCurrentKegiatan(prev => ({ 
                    ...prev, 
                    komisi: value 
                  }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Komisi" />
                  </SelectTrigger>
                  <SelectContent>
                    {data?.komisi?.map((komisi) => (
                      <SelectItem key={komisi.id} value={komisi.nama}>
                        {komisi.nama}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="deskripsi">Deskripsi</Label>
                <Textarea 
                  id="deskripsi"
                  placeholder="Deskripsi kegiatan (opsional)"
                  value={currentKegiatan.deskripsi || ""}
                  onChange={(e) => setCurrentKegiatan(prev => ({
                    ...prev,
                    deskripsi: e.target.value
                  }))}
                  className="h-32"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button 
              type="submit"
              onClick={handleAddKegiatan}
            >
              Tambah Kegiatan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
