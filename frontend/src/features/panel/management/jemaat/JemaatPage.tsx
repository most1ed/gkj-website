import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JemaatList } from "./components/JemaatList";
import { KepalaKeluarga } from "./components/KepalaKeluarga";
import { WilayahPelayanan } from "./components/WilayahPelayanan";
import { StatistikJemaat } from "./components/StatistikJemaat";
import { Button } from "@/components/ui/button";
import { Plus, FileDown, FileUp } from "lucide-react";
import { useJemaatData } from "./hooks/useJemaatData";
import { JemaatModal } from "./components/JemaatModal";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter 
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { mockJemaatService } from "@/lib/mock/jemaat";

export default function JemaatPage() {
  const { data, isLoading } = useJemaatData();
  const [isJemaatModalOpen, setIsJemaatModalOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [importFile, setImportFile] = useState<File | null>(null);

  const handleExport = async () => {
    try {
      const exportedData = await mockJemaatService.getJemaat();
      const csvContent = convertToCsv(exportedData.jemaat);
      downloadCsv(csvContent, 'jemaat_export.csv');
      
      toast({
        title: "Ekspor Berhasil",
        description: "Data jemaat berhasil diekspor."
      });
    } catch (error) {
      toast({
        title: "Kesalahan Ekspor",
        description: "Gagal mengekspor data jemaat.",
        variant: "destructive"
      });
    }
  };

  const handleImportFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImportFile(file);
    }
  };

  const handleImport = async () => {
    if (!importFile) {
      toast({
        title: "Kesalahan",
        description: "Pilih file terlebih dahulu.",
        variant: "destructive"
      });
      return;
    }

    try {
      await mockJemaatService.importJemaat(importFile);
      toast({
        title: "Impor Berhasil",
        description: "Data jemaat berhasil diimpor."
      });
      setIsImportDialogOpen(false);
    } catch (error) {
      toast({
        title: "Kesalahan Impor",
        description: "Gagal mengimpor data jemaat.",
        variant: "destructive"
      });
    }
  };

  // Utility function to convert data to CSV
  const convertToCsv = (data: any[]) => {
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(obj => 
      Object.values(obj)
        .map(val => `"${val}"`)
        .join(',')
    );
    return [headers, ...rows].join('\n');
  };

  // Utility function to download CSV
  const downloadCsv = (csvContent: string, filename: string) => {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 p-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Manajemen Jemaat</h2>
          <p className="text-muted-foreground">
            Kelola data jemaat dan wilayah pelayanan
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExport}>
            <FileDown className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button 
            variant="outline" 
            onClick={() => setIsImportDialogOpen(true)}
          >
            <FileUp className="mr-2 h-4 w-4" />
            Import
          </Button>
          <Button onClick={() => setIsJemaatModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Tambah Jemaat
          </Button>
        </div>
      </div>

      <Tabs defaultValue="statistik" className="space-y-4">
        <TabsList>
          <TabsTrigger value="statistik">Statistik</TabsTrigger>
          <TabsTrigger value="all">Semua Jemaat</TabsTrigger>
          <TabsTrigger value="kk">Kepala Keluarga</TabsTrigger>
          <TabsTrigger value="wilayah">Wilayah Pelayanan</TabsTrigger>
        </TabsList>
        
        <TabsContent value="statistik" className="space-y-4">
          <StatistikJemaat data={data?.statistik} />
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          <JemaatList data={data?.jemaat} />
        </TabsContent>
        
        <TabsContent value="kk" className="space-y-4">
          <KepalaKeluarga data={data?.kepalaKeluarga} />
        </TabsContent>
        
        <TabsContent value="wilayah" className="space-y-4">
          <WilayahPelayanan data={data?.wilayah} />
        </TabsContent>
      </Tabs>

      <JemaatModal 
        isOpen={isJemaatModalOpen}
        onClose={() => setIsJemaatModalOpen(false)}
        mode="add"
      />

      <Dialog 
        open={isImportDialogOpen} 
        onOpenChange={setIsImportDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Import Data Jemaat</DialogTitle>
            <DialogDescription>
              Pilih file CSV untuk mengimpor data jemaat
            </DialogDescription>
          </DialogHeader>
          
          <input 
            type="file" 
            accept=".csv" 
            onChange={handleImportFileChange}
            className="w-full"
          />

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsImportDialogOpen(false)}
            >
              Batal
            </Button>
            <Button onClick={handleImport}>
              Import
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
