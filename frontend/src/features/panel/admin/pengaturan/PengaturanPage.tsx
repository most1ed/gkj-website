import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GeneralSettings } from "./components/GeneralSettings";
import { EmailSettings } from "./components/EmailSettings";
import { SecuritySettings } from "./components/SecuritySettings";
import { BackupSettings } from "./components/BackupSettings";
import { usePengaturanData } from "./hooks/usePengaturanData";

export default function PengaturanPage() {
  const { data, isLoading } = usePengaturanData();

  return (
    <div className="space-y-6 p-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Pengaturan</h2>
        <p className="text-muted-foreground">
          Kelola pengaturan sistem
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">Umum</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="security">Keamanan</TabsTrigger>
          <TabsTrigger value="backup">Backup</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          <GeneralSettings data={data?.general} />
        </TabsContent>
        
        <TabsContent value="email" className="space-y-4">
          <EmailSettings data={data?.email} />
        </TabsContent>
        
        <TabsContent value="security" className="space-y-4">
          <SecuritySettings data={data?.security} />
        </TabsContent>
        
        <TabsContent value="backup" className="space-y-4">
          <BackupSettings data={data?.backup} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
