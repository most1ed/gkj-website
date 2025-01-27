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
import { Search, Users, Edit, Trash2, Eye } from "lucide-react";

interface KepalaKeluarga {
  id: string;
  name: string;
  noKK: string;
  address: string;
  wilayah: string;
  members: number;
  status: "active" | "inactive" | "moved";
}

export function KepalaKeluarga() {
  const [searchQuery, setSearchQuery] = useState("");
  const [families, setFamilies] = useState<KepalaKeluarga[]>([
    {
      id: "1",
      name: "John Doe",
      noKK: "3404012345678901",
      address: "Jl. Contoh No. 123",
      wilayah: "Wilayah 1",
      members: 4,
      status: "active",
    },
    {
      id: "2",
      name: "Jane Smith",
      noKK: "3404012345678902",
      address: "Jl. Contoh No. 124",
      wilayah: "Wilayah 2",
      members: 3,
      status: "active",
    },
    // Add more dummy data as needed
  ]);

  const getStatusBadgeClass = (status: KepalaKeluarga["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700";
      case "inactive":
        return "bg-red-100 text-red-700";
      case "moved":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusText = (status: KepalaKeluarga["status"]) => {
    switch (status) {
      case "active":
        return "Aktif";
      case "inactive":
        return "Tidak Aktif";
      case "moved":
        return "Pindah";
      default:
        return "-";
    }
  };

  const filteredFamilies = families.filter((f) =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.noKK.includes(searchQuery) ||
    f.wilayah.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari berdasarkan nama, nomor KK, atau wilayah..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button>
          Tambah Keluarga
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No. KK</TableHead>
              <TableHead>Kepala Keluarga</TableHead>
              <TableHead>Wilayah</TableHead>
              <TableHead>Anggota</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFamilies.map((family) => (
              <TableRow key={family.id}>
                <TableCell className="font-mono">{family.noKK}</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <p className="font-medium">{family.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {family.address}
                    </p>
                  </div>
                </TableCell>
                <TableCell>{family.wilayah}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    {family.members} orang
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusBadgeClass(family.status)}>
                    {getStatusText(family.status)}
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
