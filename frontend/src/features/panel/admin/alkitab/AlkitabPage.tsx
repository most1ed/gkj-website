import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DailyReadingManager } from "./components/DailyReadingManager";
import { DevotionalManager } from "./components/DevotionalManager";
import { BibleSettings } from "./components/BibleSettings";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useAlkitabData } from "./hooks/useAlkitabData";

export default function AlkitabPage() {
  const { data, isLoading } = useAlkitabData();

  return (
    <div className="space-y-6 p-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Alkitab</h2>
          <p className="text-muted-foreground">
            Kelola bacaan dan renungan harian
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Tambah Renungan
        </Button>
      </div>

      <Tabs defaultValue="daily-reading" className="space-y-4">
        <TabsList>
          <TabsTrigger value="daily-reading">Bacaan Harian</TabsTrigger>
          <TabsTrigger value="devotional">Renungan</TabsTrigger>
          <TabsTrigger value="settings">Pengaturan</TabsTrigger>
        </TabsList>
        
        <TabsContent value="daily-reading" className="space-y-4">
          <DailyReadingManager data={data?.dailyReading} />
        </TabsContent>
        
        <TabsContent value="devotional" className="space-y-4">
          <DevotionalManager data={data?.devotional} />
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4">
          <BibleSettings data={data?.settings} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
