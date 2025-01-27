import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PersembahanManager } from "./components/PersembahanManager";
import { PengeluaranManager } from "./components/PengeluaranManager";
import { LaporanKeuangan } from "./components/LaporanKeuangan";
import { AnggaranManager } from "./components/AnggaranManager";
import { Button } from "@/components/ui/button";
import { Plus, FileDown, Printer } from "lucide-react";
import { useKeuanganData } from "./hooks/useKeuanganData";

export default function KeuanganPage() {
  const { data, isLoading } = useKeuanganData();

  return (
    <div className="space-y-6 p-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Manajemen Keuangan</h2>
          <p className="text-muted-foreground">
            Kelola persembahan, pengeluaran, dan laporan keuangan
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" />
            Cetak Laporan
          </Button>
          <Button variant="outline">
            <FileDown className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Transaksi Baru
          </Button>
        </div>
      </div>

      <Tabs defaultValue="persembahan" className="space-y-4">
        <TabsList>
          <TabsTrigger value="persembahan">Persembahan</TabsTrigger>
          <TabsTrigger value="pengeluaran">Pengeluaran</TabsTrigger>
          <TabsTrigger value="laporan">Laporan</TabsTrigger>
          <TabsTrigger value="anggaran">Anggaran</TabsTrigger>
        </TabsList>
        
        <TabsContent value="persembahan" className="space-y-4">
          <PersembahanManager data={data?.persembahan} />
        </TabsContent>
        
        <TabsContent value="pengeluaran" className="space-y-4">
          <PengeluaranManager data={data?.pengeluaran} />
        </TabsContent>
        
        <TabsContent value="laporan" className="space-y-4">
          <LaporanKeuangan data={data?.laporan} />
        </TabsContent>
        
        <TabsContent value="anggaran" className="space-y-4">
          <AnggaranManager data={data?.anggaran} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
