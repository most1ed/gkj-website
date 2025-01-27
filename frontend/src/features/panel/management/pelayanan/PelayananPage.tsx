import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { KomisiManager } from "./components/KomisiManager";
import { KegiatanPelayanan } from "./components/KegiatanPelayanan";
import { JadwalPelayanan } from "./components/JadwalPelayanan";
import { LaporanPelayanan } from "./components/LaporanPelayanan";
import { Button } from "@/components/ui/button";
import { Plus, FileDown } from "lucide-react";
import { usePelayananData } from "./hooks/usePelayananData";

export default function PelayananPage() {
  const { data, isLoading } = usePelayananData();

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
          <Button variant="outline">
            <FileDown className="mr-2 h-4 w-4" />
            Export Laporan
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Tambah Kegiatan
          </Button>
        </div>
      </div>

      <Tabs defaultValue="komisi" className="space-y-4">
        <TabsList>
          <TabsTrigger value="komisi">Komisi</TabsTrigger>
          <TabsTrigger value="kegiatan">Kegiatan</TabsTrigger>
          <TabsTrigger value="jadwal">Jadwal</TabsTrigger>
          <TabsTrigger value="laporan">Laporan</TabsTrigger>
        </TabsList>
        
        <TabsContent value="komisi" className="space-y-4">
          <KomisiManager data={data?.komisi} />
        </TabsContent>
        
        <TabsContent value="kegiatan" className="space-y-4">
          <KegiatanPelayanan data={data?.kegiatan} />
        </TabsContent>
        
        <TabsContent value="jadwal" className="space-y-4">
          <JadwalPelayanan data={data?.jadwal} />
        </TabsContent>
        
        <TabsContent value="laporan" className="space-y-4">
          <LaporanPelayanan data={data?.laporan} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
