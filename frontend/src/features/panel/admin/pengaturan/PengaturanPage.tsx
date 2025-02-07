import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePengaturanData } from "./hooks/usePengaturanData";
import { GeneralSettings } from "./components/GeneralSettings";
import { EmailSettings } from "./components/EmailSettings";
import { SecuritySettings } from "./components/SecuritySettings";
import { BackupSettings } from "./components/BackupSettings";
import LLMConfigurationSection from "./components/LLMConfigurationSection";

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
            General
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
            Security
          </TabsTrigger>
          <TabsTrigger 
            value="backup" 
            className="flex-1 h-9 data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
          >
            Backup
          </TabsTrigger>
          <TabsTrigger 
            value="ai" 
            className="flex-1 h-9 data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
          >
            AI
          </TabsTrigger>
        </TabsList>

        <div className="w-full bg-card rounded-lg border shadow-sm">
          <TabsContent 
            value="general" 
            className="data-[state=active]:block data-[state=inactive]:hidden p-6 lg:p-8 w-full focus-visible:outline-none"
          >
            <GeneralSettings data={data} />
          </TabsContent>

          <TabsContent 
            value="email" 
            className="data-[state=active]:block data-[state=inactive]:hidden p-6 lg:p-8 w-full focus-visible:outline-none"
          >
            <EmailSettings data={data} />
          </TabsContent>

          <TabsContent 
            value="security" 
            className="data-[state=active]:block data-[state=inactive]:hidden p-6 lg:p-8 w-full focus-visible:outline-none"
          >
            <SecuritySettings data={data} />
          </TabsContent>

          <TabsContent 
            value="backup" 
            className="data-[state=active]:block data-[state=inactive]:hidden p-6 lg:p-8 w-full focus-visible:outline-none"
          >
            <BackupSettings data={data} />
          </TabsContent>

          <TabsContent 
            value="ai" 
            className="data-[state=active]:block data-[state=inactive]:hidden p-6 lg:p-8 w-full focus-visible:outline-none"
          >
            <LLMConfigurationSection />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
