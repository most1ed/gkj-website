import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, FileDown, BarChart } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { SDAStatistics } from "./components/SDAStatistics";

interface SDM {
  id: string;
  name: string;
  role: string;
  skills: string[];
  availability: "active" | "inactive" | "pending";
  lastActive: string;
}

interface Asset {
  id: string;
  name: string;
  category: string;
  status: "available" | "in-use" | "maintenance";
  location: string;
  lastUsed: string;
}

export default function SDAPage() {
  const sdmData: SDM[] = [
    {
      id: "SDM001",
      name: "John Doe",
      role: "Multimedia",
      skills: ["Video Editing", "Sound System"],
      availability: "active",
      lastActive: "2024-01-30",
    },
    {
      id: "SDM002",
      name: "Jane Smith",
      role: "Music",
      skills: ["Piano", "Vocal"],
      availability: "active",
      lastActive: "2024-01-29",
    },
  ];

  const assetData: Asset[] = [
    {
      id: "AST001",
      name: "Sound System",
      category: "Audio Equipment",
      status: "available",
      location: "Main Hall",
      lastUsed: "2024-01-30",
    },
    {
      id: "AST002",
      name: "Projector",
      category: "Visual Equipment",
      status: "in-use",
      location: "Meeting Room",
      lastUsed: "2024-01-31",
    },
  ];

  const getStatusBadge = (status: SDM["availability"] | Asset["status"]) => {
    switch (status) {
      case "active":
      case "available":
        return <Badge className="bg-green-100 text-green-700">Tersedia</Badge>;
      case "inactive":
      case "maintenance":
        return <Badge className="bg-red-100 text-red-700">Tidak Tersedia</Badge>;
      case "in-use":
        return <Badge className="bg-blue-100 text-blue-700">Sedang Digunakan</Badge>;
      default:
        return <Badge className="bg-yellow-100 text-yellow-700">Pending</Badge>;
    }
  };

  return (
    <div className="space-y-6 p-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Sumber Daya</h2>
          <p className="text-muted-foreground">
            Kelola sumber daya manusia dan aset gereja
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Tambah
          </Button>
        </div>
      </div>

      <Tabs defaultValue="statistik" className="space-y-4">
        <TabsList>
          <TabsTrigger value="statistik">
            <BarChart className="mr-2 h-4 w-4" />
            Statistik
          </TabsTrigger>
          <TabsTrigger value="sdm">Sumber Daya Manusia</TabsTrigger>
          <TabsTrigger value="aset">Aset</TabsTrigger>
          <TabsTrigger value="jadwal">Penjadwalan</TabsTrigger>
        </TabsList>

        <TabsContent value="statistik" className="space-y-4">
          <SDAStatistics sdmData={sdmData} assetData={assetData} />
        </TabsContent>

        <TabsContent value="sdm" className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Peran</TableHead>
                <TableHead>Keahlian</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Terakhir Aktif</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sdmData.map((sdm) => (
                <TableRow key={sdm.id}>
                  <TableCell>{sdm.id}</TableCell>
                  <TableCell>{sdm.name}</TableCell>
                  <TableCell>{sdm.role}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {sdm.skills.map((skill) => (
                        <Badge key={skill} variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(sdm.availability)}</TableCell>
                  <TableCell>{sdm.lastActive}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="aset" className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Lokasi</TableHead>
                <TableHead>Terakhir Digunakan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assetData.map((asset) => (
                <TableRow key={asset.id}>
                  <TableCell>{asset.id}</TableCell>
                  <TableCell>{asset.name}</TableCell>
                  <TableCell>{asset.category}</TableCell>
                  <TableCell>{getStatusBadge(asset.status)}</TableCell>
                  <TableCell>{asset.location}</TableCell>
                  <TableCell>{asset.lastUsed}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="jadwal" className="space-y-4">
          <div className="text-center text-muted-foreground py-8">
            Fitur penjadwalan akan segera hadir
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
