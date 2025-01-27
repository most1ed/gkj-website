import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Users, Edit, Trash2, Eye } from "lucide-react";

interface Wilayah {
  id: string;
  name: string;
  code: string;
  coordinator: string;
  totalFamilies: number;
  totalMembers: number;
  status: "active" | "inactive";
}

export function WilayahPelayanan() {
  const [searchQuery, setSearchQuery] = useState("");
  const [wilayah, setWilayah] = useState<Wilayah[]>([
    {
      id: "1",
      name: "Wilayah Pelayanan 1",
      code: "WIL-01",
      coordinator: "John Doe",
      totalFamilies: 25,
      totalMembers: 75,
      status: "active",
    },
    {
      id: "2",
      name: "Wilayah Pelayanan 2",
      code: "WIL-02",
      coordinator: "Jane Smith",
      totalFamilies: 30,
      totalMembers: 90,
      status: "active",
    },
    // Add more dummy data as needed
  ]);

  const getStatusBadgeClass = (status: Wilayah["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700";
      case "inactive":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusText = (status: Wilayah["status"]) => {
    switch (status) {
      case "active":
        return "Aktif";
      case "inactive":
        return "Tidak Aktif";
      default:
        return "-";
    }
  };

  const filteredWilayah = wilayah.filter((w) =>
    w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    w.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    w.coordinator.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari berdasarkan nama wilayah, kode, atau koordinator..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button>
          Tambah Wilayah
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Kode</TableHead>
              <TableHead>Wilayah</TableHead>
              <TableHead>Koordinator</TableHead>
              <TableHead>Jumlah KK</TableHead>
              <TableHead>Jumlah Jemaat</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredWilayah.map((w) => (
              <TableRow key={w.id}>
                <TableCell className="font-mono">{w.code}</TableCell>
                <TableCell className="font-medium">{w.name}</TableCell>
                <TableCell>{w.coordinator}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    {w.totalFamilies} KK
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    {w.totalMembers} orang
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusBadgeClass(w.status)}>
                    {getStatusText(w.status)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    Detail
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button size="sm" variant="destructive">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Hapus
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
