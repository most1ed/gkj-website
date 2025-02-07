import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PersembahanManager } from "./components/PersembahanManager";
import { PengeluaranManager } from "./components/PengeluaranManager";
import { LaporanKeuangan } from "./components/LaporanKeuangan";
import { AnggaranManager } from "./components/AnggaranManager";
import { AnggaranApproval } from "./components/AnggaranApproval";
import { KeuanganStatistics } from "./components/KeuanganStatistics";
import { Button } from "@/components/ui/button";
import { Plus, FileDown, Printer, BarChart } from "lucide-react";
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

      <Tabs defaultValue="statistik" className="space-y-4">
        <TabsList className="w-full h-11 p-1 bg-muted/50 rounded-lg mb-8">
          <TabsTrigger 
            value="statistik" 
            className="flex-1 h-9 data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
          >
            <BarChart className="mr-2 h-4 w-4" />
            Statistik
          </TabsTrigger>
          <TabsTrigger 
            value="persembahan" 
            className="flex-1 h-9 data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
          >
            Persembahan
          </TabsTrigger>
          <TabsTrigger 
            value="pengeluaran" 
            className="flex-1 h-9 data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
          >
            Pengeluaran
          </TabsTrigger>
          <TabsTrigger 
            value="anggaran" 
            className="flex-1 h-9 data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
          >
            Anggaran
          </TabsTrigger>
          <TabsTrigger 
            value="approval" 
            className="flex-1 h-9 data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
          >
            Persetujuan
          </TabsTrigger>
          <TabsTrigger 
            value="laporan" 
            className="flex-1 h-9 data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
          >
            Laporan
          </TabsTrigger>
        </TabsList>

        <div className="w-full bg-card rounded-lg border shadow-sm">
          <TabsContent 
            value="statistik" 
            className="data-[state=active]:block data-[state=inactive]:hidden p-6 lg:p-8 w-full focus-visible:outline-none"
          >
            <KeuanganStatistics data={data} />
          </TabsContent>

          <TabsContent 
            value="persembahan" 
            className="data-[state=active]:block data-[state=inactive]:hidden p-6 lg:p-8 w-full focus-visible:outline-none"
          >
            <PersembahanManager />
          </TabsContent>

          <TabsContent 
            value="pengeluaran" 
            className="data-[state=active]:block data-[state=inactive]:hidden p-6 lg:p-8 w-full focus-visible:outline-none"
          >
            <PengeluaranManager />
          </TabsContent>

          <TabsContent 
            value="anggaran" 
            className="data-[state=active]:block data-[state=inactive]:hidden p-6 lg:p-8 w-full focus-visible:outline-none"
          >
            <AnggaranManager />
          </TabsContent>

          <TabsContent 
            value="approval" 
            className="data-[state=active]:block data-[state=inactive]:hidden p-6 lg:p-8 w-full focus-visible:outline-none"
          >
            <AnggaranApproval />
          </TabsContent>

          <TabsContent 
            value="laporan" 
            className="data-[state=active]:block data-[state=inactive]:hidden p-6 lg:p-8 w-full focus-visible:outline-none"
          >
            <LaporanKeuangan />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
