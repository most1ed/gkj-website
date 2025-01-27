import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Search, Plus, Edit } from "lucide-react";

interface Jemaat {
  id: string;
  name: string;
  memberNumber: string;
  gender: string;
  birthDate: Date;
  address: string;
  phone: string;
  email: string;
  familyCardNumber: string;
  familyRole: string;
  baptismDate?: Date;
  confirmationDate?: Date;
  marriageDate?: Date;
  region: string;
  status: "active" | "inactive" | "moved" | "deceased";
  photo?: string;
}

interface DaftarJemaatProps {
  data: Jemaat[];
}

export function DaftarJemaat({ data }: DaftarJemaatProps) {
  const formatDate = (date: Date) => {
    return format(date, "dd MMMM yyyy", { locale: id });
  };

  const getStatusBadgeClass = (status: Jemaat["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100";
      case "inactive":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-700 dark:text-yellow-100";
      case "moved":
        return "bg-blue-100 text-blue-700 dark:bg-blue-700 dark:text-blue-100";
      case "deceased":
        return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-100";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-100";
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
      case "deceased":
        return "Meninggal";
      default:
        return "-";
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <div>
              <CardTitle>Daftar Jemaat</CardTitle>
              <CardDescription>
                Kelola data anggota jemaat
              </CardDescription>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Tambah Jemaat
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cari jemaat..."
                  className="pl-8"
                />
              </div>
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="active">Aktif</SelectItem>
                <SelectItem value="inactive">Tidak Aktif</SelectItem>
                <SelectItem value="moved">Pindah</SelectItem>
                <SelectItem value="deceased">Meninggal</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Wilayah" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Wilayah</SelectItem>
                <SelectItem value="1">Wilayah 1</SelectItem>
                <SelectItem value="2">Wilayah 2</SelectItem>
                <SelectItem value="3">Wilayah 3</SelectItem>
                <SelectItem value="4">Wilayah 4</SelectItem>
                <SelectItem value="5">Wilayah 5</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No. Anggota</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Wilayah</TableHead>
                <TableHead>No. KK</TableHead>
                <TableHead>Peran</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((jemaat) => (
                <TableRow key={jemaat.id}>
                  <TableCell>{jemaat.memberNumber}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {jemaat.photo && (
                        <img
                          src={jemaat.photo}
                          alt={jemaat.name}
                          className="h-8 w-8 rounded-full mr-2"
                        />
                      )}
                      <div>
                        <div className="font-medium">{jemaat.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {jemaat.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{jemaat.region}</TableCell>
                  <TableCell>{jemaat.familyCardNumber}</TableCell>
                  <TableCell>{jemaat.familyRole}</TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeClass(jemaat.status)}>
                      {getStatusText(jemaat.status)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
