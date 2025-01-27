import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AboutSection } from "./components/AboutSection";
import { HistorySection } from "./components/HistorySection";
import { VisionMissionSection } from "./components/VisionMissionSection";
import { OrganizationSection } from "./components/OrganizationSection";
import { useKontenData } from "./hooks/useKontenData";

export default function KontenPage() {
  const { data, isLoading } = useKontenData();

  return (
    <div className="space-y-6 p-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Manajemen Konten</h2>
        <p className="text-muted-foreground">
          Kelola konten website gereja
        </p>
      </div>

      <Tabs defaultValue="about" className="space-y-4">
        <TabsList>
          <TabsTrigger value="about">Tentang Gereja</TabsTrigger>
          <TabsTrigger value="history">Sejarah</TabsTrigger>
          <TabsTrigger value="vision-mission">Visi & Misi</TabsTrigger>
          <TabsTrigger value="organization">Organisasi</TabsTrigger>
        </TabsList>
        
        <TabsContent value="about" className="space-y-4">
          <AboutSection data={data?.about} />
        </TabsContent>
        
        <TabsContent value="history" className="space-y-4">
          <HistorySection data={data?.history} />
        </TabsContent>
        
        <TabsContent value="vision-mission" className="space-y-4">
          <VisionMissionSection data={data?.visionMission} />
        </TabsContent>
        
        <TabsContent value="organization" className="space-y-4">
          <OrganizationSection data={data?.organization} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
