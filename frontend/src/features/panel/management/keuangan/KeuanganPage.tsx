import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PersembahanManager } from "./components/PersembahanManager";
import { PengeluaranManager } from "./components/PengeluaranManager";
import { LaporanKeuangan } from "./components/LaporanKeuangan";
import { AnggaranManager } from "./components/AnggaranManager";
import { AnggaranApproval } from "./components/AnggaranApproval";
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
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon">
            <Printer className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <FileDown className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="persembahan" className="space-y-4">
        <TabsList>
          <TabsTrigger value="persembahan">Persembahan</TabsTrigger>
          <TabsTrigger value="pengeluaran">Pengeluaran</TabsTrigger>
          <TabsTrigger value="anggaran">Anggaran</TabsTrigger>
          <TabsTrigger value="approval">Persetujuan</TabsTrigger>
          <TabsTrigger value="laporan">Laporan</TabsTrigger>
        </TabsList>
        <TabsContent value="persembahan" className="space-y-4">
          <PersembahanManager />
        </TabsContent>
        <TabsContent value="pengeluaran" className="space-y-4">
          <PengeluaranManager />
        </TabsContent>
        <TabsContent value="anggaran" className="space-y-4">
          <AnggaranManager />
        </TabsContent>
        <TabsContent value="approval" className="space-y-4">
          <AnggaranApproval />
        </TabsContent>
        <TabsContent value="laporan" className="space-y-4">
          <LaporanKeuangan />
        </TabsContent>
      </Tabs>
    </div>
  );
}
