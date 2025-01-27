import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JemaatList } from "./components/JemaatList";
import { KepalaKeluarga } from "./components/KepalaKeluarga";
import { WilayahPelayanan } from "./components/WilayahPelayanan";
import { StatistikJemaat } from "./components/StatistikJemaat";
import { Button } from "@/components/ui/button";
import { Plus, FileDown, FileUp } from "lucide-react";
import { useJemaatData } from "./hooks/useJemaatData";

export default function JemaatPage() {
  const { data, isLoading } = useJemaatData();

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
          <Button variant="outline">
            <FileDown className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline">
            <FileUp className="mr-2 h-4 w-4" />
            Import
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Tambah Jemaat
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Semua Jemaat</TabsTrigger>
          <TabsTrigger value="kk">Kepala Keluarga</TabsTrigger>
          <TabsTrigger value="wilayah">Wilayah Pelayanan</TabsTrigger>
          <TabsTrigger value="statistik">Statistik</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          <JemaatList data={data?.jemaat} />
        </TabsContent>
        
        <TabsContent value="kk" className="space-y-4">
          <KepalaKeluarga data={data?.kepalaKeluarga} />
        </TabsContent>
        
        <TabsContent value="wilayah" className="space-y-4">
          <WilayahPelayanan data={data?.wilayah} />
        </TabsContent>
        
        <TabsContent value="statistik" className="space-y-4">
          <StatistikJemaat data={data?.statistik} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
