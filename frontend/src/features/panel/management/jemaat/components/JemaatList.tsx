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
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Search, Edit, Trash2, Eye } from "lucide-react";

interface Jemaat {
  id: string;
  name: string;
  noAnggota: string;
  gender: "L" | "P";
  birthDate: Date;
  address: string;
  wilayah: string;
  status: "active" | "inactive" | "moved";
}

export function JemaatList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [jemaat, setJemaat] = useState<Jemaat[]>([
    {
      id: "1",
      name: "John Doe",
      noAnggota: "GKJ-2024-001",
      gender: "L",
      birthDate: new Date("1990-01-01"),
      address: "Jl. Contoh No. 123",
      wilayah: "Wilayah 1",
      status: "active",
    },
    {
      id: "2",
      name: "Jane Doe",
      noAnggota: "GKJ-2024-002",
      gender: "P",
      birthDate: new Date("1992-05-15"),
      address: "Jl. Contoh No. 124",
      wilayah: "Wilayah 2",
      status: "active",
    },
    // Add more dummy data as needed
  ]);

  const getStatusBadgeClass = (status: Jemaat["status"]) => {
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

  const getStatusText = (status: Jemaat["status"]) => {
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

  const filteredJemaat = jemaat.filter((j) =>
    j.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    j.noAnggota.toLowerCase().includes(searchQuery.toLowerCase()) ||
    j.wilayah.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari berdasarkan nama, nomor anggota, atau wilayah..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button>
          Tambah Jemaat
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No. Anggota</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>L/P</TableHead>
              <TableHead>Tanggal Lahir</TableHead>
              <TableHead>Wilayah</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredJemaat.map((j) => (
              <TableRow key={j.id}>
                <TableCell className="font-mono">{j.noAnggota}</TableCell>
                <TableCell className="font-medium">{j.name}</TableCell>
                <TableCell>{j.gender}</TableCell>
                <TableCell>
                  {format(j.birthDate, "dd MMMM yyyy", { locale: id })}
                </TableCell>
                <TableCell>{j.wilayah}</TableCell>
                <TableCell>
                  <Badge className={getStatusBadgeClass(j.status)}>
                    {getStatusText(j.status)}
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
