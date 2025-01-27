import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JadwalIbadah } from "./components/JadwalIbadah";
import { LiturgiManager } from "./components/LiturgiManager";
import { PelayananIbadah } from "./components/PelayananIbadah";
import { WartaJemaat } from "./components/WartaJemaat";
import { Button } from "@/components/ui/button";
import { Plus, Calendar } from "lucide-react";
import { useIbadahData } from "./hooks/useIbadahData";

export default function IbadahPage() {
  const { data, isLoading } = useIbadahData();

  return (
    <div className="space-y-6 p-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Manajemen Ibadah</h2>
          <p className="text-muted-foreground">
            Kelola jadwal, liturgi, dan pelayanan ibadah
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Lihat Kalender
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Tambah Ibadah
          </Button>
        </div>
      </div>

      <Tabs defaultValue="jadwal" className="space-y-4">
        <TabsList>
          <TabsTrigger value="jadwal">Jadwal Ibadah</TabsTrigger>
          <TabsTrigger value="liturgi">Liturgi</TabsTrigger>
          <TabsTrigger value="pelayanan">Pelayanan</TabsTrigger>
          <TabsTrigger value="warta">Warta Jemaat</TabsTrigger>
        </TabsList>
        
        <TabsContent value="jadwal" className="space-y-4">
          <JadwalIbadah data={data?.jadwal} />
        </TabsContent>
        
        <TabsContent value="liturgi" className="space-y-4">
          <LiturgiManager data={data?.liturgi} />
        </TabsContent>
        
        <TabsContent value="pelayanan" className="space-y-4">
          <PelayananIbadah data={data?.pelayanan} />
        </TabsContent>
        
        <TabsContent value="warta" className="space-y-4">
          <WartaJemaat data={data?.warta} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
