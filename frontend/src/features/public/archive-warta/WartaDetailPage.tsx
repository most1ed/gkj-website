import { useParams, Link } from 'react-router-dom';
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { PDFButton } from "@/components/common/pdf";
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { wartaGereja } from "@/data/dummyData";
import { DummyPage } from "@/components/DummyPage";

// Dummy archive data - replace with actual API call later
const archiveData = Array.from({ length: 12 }, (_, i) => {
  const date = new Date(2025, 0, 22);
  date.setMonth(date.getMonth() - i);
  return {
    id: i + 1,
    date: date,
    data: wartaGereja // Using the correct data structure
  };
});

export default function WartaDetail() {
  const { id } = useParams();
  const archive = archiveData.find(item => item.id === Number(id));

  if (!archive) {
    return (
      <div className="container mx-auto py-6">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Warta tidak ditemukan</h2>
          <Button asChild>
            <Link to="/arsip-warta">Kembali ke Arsip</Link>
          </Button>
        </div>
      </div>
    );
  }

  const { data } = archive;

  return (
    <div className="container mx-auto py-6">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Warta Jemaat</h2>
            <p className="text-muted-foreground">
              {format(archive.date, 'EEEE, dd MMMM yyyy', { locale: id })}
            </p>
          </div>
          <div className="space-x-2">
            <PDFButton 
              wartaJemaat={data} 
              jadwalIbadah={data.tataIbadah} 
              jurnalKebaktian={[]} 
              dukunganDoa={data.dukunganDoa}
              tanggal={archive.date}
            />
            <Button variant="outline" asChild>
              <Link to="/arsip-warta">Kembali ke Arsip</Link>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="sambutan" className="mt-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="sambutan">Sambutan</TabsTrigger>
            <TabsTrigger value="tata-ibadah">Tata Ibadah</TabsTrigger>
            <TabsTrigger value="doa">Dukungan Doa</TabsTrigger>
            <TabsTrigger value="pengumuman">Pengumuman</TabsTrigger>
          </TabsList>
          
          <TabsContent value="sambutan">
            <DummyPage title="Sambutan" />
          </TabsContent>

          <TabsContent value="tata-ibadah">
            <DummyPage title="Tata Ibadah" />
          </TabsContent>

          <TabsContent value="doa">
            <DummyPage title="Dukungan Doa" />
          </TabsContent>

          <TabsContent value="pengumuman">
            <DummyPage title="Pengumuman" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
