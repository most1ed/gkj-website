import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GeneralSettings } from "./components/GeneralSettings";
import { EmailSettings } from "./components/EmailSettings";
import { SecuritySettings } from "./components/SecuritySettings";
import { BackupSettings } from "./components/BackupSettings";
import { usePengaturanData } from "./hooks/usePengaturanData";

export default function PengaturanPage() {
  const { data, isLoading } = usePengaturanData();

  return (
    <div className="flex flex-col w-full gap-8">
      <div className="flex flex-col gap-1.5">
        <h2 className="text-2xl font-semibold tracking-tight">Pengaturan</h2>
        <p className="text-muted-foreground">
          Kelola pengaturan sistem
        </p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="w-full h-11 p-1 bg-muted/50 rounded-lg mb-8">
          <TabsTrigger 
            value="general" 
            className="flex-1 h-9 data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
          >
            Umum
          </TabsTrigger>
          <TabsTrigger 
            value="email" 
            className="flex-1 h-9 data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
          >
            Email
          </TabsTrigger>
          <TabsTrigger 
            value="security" 
            className="flex-1 h-9 data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
          >
            Keamanan
          </TabsTrigger>
          <TabsTrigger 
            value="backup" 
            className="flex-1 h-9 data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
          >
            Backup
          </TabsTrigger>
        </TabsList>
        
        <div className="w-full bg-card rounded-lg border shadow-sm">
          <TabsContent value="general" className="p-6 lg:p-8 mt-0 w-full focus-visible:outline-none">
            <GeneralSettings data={data?.general} />
          </TabsContent>
          
          <TabsContent value="email" className="p-6 lg:p-8 mt-0 w-full focus-visible:outline-none">
            <EmailSettings data={data?.email} />
          </TabsContent>
          
          <TabsContent value="security" className="p-6 lg:p-8 mt-0 w-full focus-visible:outline-none">
            <SecuritySettings data={data?.security} />
          </TabsContent>
          
          <TabsContent value="backup" className="p-6 lg:p-8 mt-0 w-full focus-visible:outline-none">
            <BackupSettings data={data?.backup} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
