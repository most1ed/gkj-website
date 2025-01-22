import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { WelcomeSection } from "@/components/warta/WelcomeSection";
import { ServiceSection } from "@/components/warta/ServiceSection";
import { OfferingsSection } from "@/components/warta/OfferingsSection";
import { AnnouncementsSection } from "@/components/warta/AnnouncementsSection";

export default function Warta() {
  return (
    <main className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Warta Jemaat</h1>
        <p className="text-muted-foreground">GKJ Grogol Jakarta</p>
        <p className="text-muted-foreground">Minggu, 26 Januari 2025</p>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="welcome" className="space-y-8">
        <TabsList className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          <TabsTrigger value="welcome">Selamat Datang</TabsTrigger>
          <TabsTrigger value="service">Ibadah</TabsTrigger>
          <TabsTrigger value="offerings">Persembahan</TabsTrigger>
          <TabsTrigger value="announcements">Pengumuman</TabsTrigger>
        </TabsList>

        <TabsContent value="welcome">
          <WelcomeSection />
        </TabsContent>

        <TabsContent value="service">
          <ServiceSection />
        </TabsContent>

        <TabsContent value="offerings">
          <OfferingsSection />
        </TabsContent>

        <TabsContent value="announcements">
          <AnnouncementsSection />
        </TabsContent>
      </Tabs>
    </main>
  );
}
