import { Card } from "@/components/ui/Card";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface WartaArchive {
  id: string;
  date: string;
  title: string;
  downloadUrl: string;
}

const dummyArchives: WartaArchive[] = [
  {
    id: "1",
    date: "15 Januari 2024",
    title: "Warta Jemaat Minggu I",
    downloadUrl: "#"
  },
  {
    id: "2",
    date: "8 Januari 2024",
    title: "Warta Jemaat Minggu II",
    downloadUrl: "#"
  },
  {
    id: "3",
    date: "1 Januari 2024",
    title: "Warta Jemaat Minggu III",
    downloadUrl: "#"
  }
];

export default function ArchiveWarta() {
  return (
    <div className="container mx-auto py-6">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">Arsip Warta Jemaat</h1>
        <p className="text-muted-foreground mt-2">
          Kumpulan warta jemaat dari minggu-minggu sebelumnya
        </p>
      </div>

      <div className="grid gap-4">
        {dummyArchives.map((archive) => (
          <Card key={archive.id} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{archive.title}</h3>
                <p className="text-sm text-muted-foreground">{archive.date}</p>
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                Unduh
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
