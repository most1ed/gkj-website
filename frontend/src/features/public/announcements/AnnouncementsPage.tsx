import { Card } from "@/components/ui/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Church, Users, PiggyBank, Heart, Gift, Bell, Download, Archive } from "lucide-react";
import { useEffect, useState } from "react";
import { dummyWarta } from "@/data/dummyWarta";
import { JadwalPelayanSection } from "@/features/public/warta/components/JadwalPelayanSection";
import { FellowshipSection } from "@/features/public/warta/components/FellowshipSection";
import { IbadahSection } from "@/features/public/warta/components/IbadahSection";
import { WeeklyAnnouncements } from "@/features/public/news/components/WeeklyAnnouncements";
import { PersembahanSection } from "@/features/public/warta/components/PersembahanSection";
import { DukunganDoaSection } from "@/features/public/warta/components/DukunganDoaSection";
import { WartaKhususSection } from "@/features/public/warta/components/WartaKhususSection";
import { Button } from "@/components/ui/Button";
import { Link } from "react-router-dom";

export default function AnnouncementsPage() {
  const [data, setData] = useState<WartaData | null>(null);

  useEffect(() => {
    // Simulate API call
    setData(dummyWarta);
  }, []);

  const handleDownload = () => {
    // TODO: Implement download functionality
    console.log("Downloading warta...");
  };

  if (!data) {
    return (
      <div className="container mx-auto py-6">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">Warta Jemaat</h1>
        <p className="text-muted-foreground mt-2">
          Informasi terkini seputar kegiatan dan pelayanan gereja
        </p>
        <div className="flex justify-center gap-4 mt-4">
          <Button variant="outline" onClick={handleDownload} className="gap-2">
            <Download className="h-4 w-4" />
            Unduh Warta
          </Button>
          <Link to="/arsip-warta">
            <Button variant="outline" className="gap-2">
              <Archive className="h-4 w-4" />
              Arsip Warta
            </Button>
          </Link>
        </div>
      </div>

      <Tabs defaultValue="ibadah" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="ibadah" className="flex items-center gap-2 py-2">
            <Church className="h-4 w-4" />
            <span className="hidden sm:inline">Ibadah</span>
          </TabsTrigger>
          <TabsTrigger value="jadwal" className="flex items-center gap-2 py-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Jadwal</span>
          </TabsTrigger>
          <TabsTrigger value="persembahan" className="flex items-center gap-2 py-2">
            <PiggyBank className="h-4 w-4" />
            <span className="hidden sm:inline">Persembahan</span>
          </TabsTrigger>
          <TabsTrigger value="doa" className="flex items-center gap-2 py-2">
            <Heart className="h-4 w-4" />
            <span className="hidden sm:inline">Dukungan Doa</span>
          </TabsTrigger>
          <TabsTrigger value="fellowship" className="flex items-center gap-2 py-2">
            <Gift className="h-4 w-4" />
            <span className="hidden sm:inline">Fellowship</span>
          </TabsTrigger>
          <TabsTrigger value="khusus" className="flex items-center gap-2 py-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Warta Khusus</span>
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="ibadah">
            <IbadahSection data={data.ibadah} />
          </TabsContent>

          <TabsContent value="jadwal">
            <JadwalPelayanSection data={data.jadwalPelayan} />
          </TabsContent>

          <TabsContent value="persembahan">
            <PersembahanSection data={data.persembahan} />
          </TabsContent>

          <TabsContent value="doa">
            <DukunganDoaSection data={data.dukunganDoa} />
          </TabsContent>

          <TabsContent value="fellowship">
            <FellowshipSection data={data.fellowship} />
          </TabsContent>

          <TabsContent value="khusus">
            <WartaKhususSection data={data.wartaKhusus} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
