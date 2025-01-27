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
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Edit, Plus } from "lucide-react";

interface FamilyMember {
  id: string;
  name: string;
  role: string;
  birthDate: Date;
  gender: string;
  baptismDate?: Date;
  confirmationDate?: Date;
  status: "active" | "inactive" | "moved" | "deceased";
}

interface FamilyInfoProps {
  data: {
    familyCardNumber: string;
    familyHead: string;
    address: string;
    region: string;
    members: FamilyMember[];
  };
}

export function FamilyInfo({ data }: FamilyInfoProps) {
  const formatDate = (date: Date) => {
    return format(date, "dd MMMM yyyy", { locale: id });
  };

  const getStatusBadgeClass = (status: FamilyMember["status"]) => {
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

  const getStatusText = (status: FamilyMember["status"]) => {
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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <div>
              <CardTitle>Data Keluarga</CardTitle>
              <CardDescription>
                Informasi kartu keluarga dan alamat
              </CardDescription>
            </div>
            <Button variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <dt className="text-sm font-medium text-muted-foreground">
                No. Kartu Keluarga
              </dt>
              <dd className="text-base">{data.familyCardNumber}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">
                Kepala Keluarga
              </dt>
              <dd className="text-base">{data.familyHead}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">
                Alamat
              </dt>
              <dd className="text-base">{data.address}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">
                Wilayah
              </dt>
              <dd className="text-base">{data.region}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <div>
              <CardTitle>Anggota Keluarga</CardTitle>
              <CardDescription>
                Daftar anggota keluarga
              </CardDescription>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Tambah Anggota
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>Peran</TableHead>
                <TableHead>Tanggal Lahir</TableHead>
                <TableHead>Baptis</TableHead>
                <TableHead>Sidi</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.members.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>{member.name}</TableCell>
                  <TableCell>{member.role}</TableCell>
                  <TableCell>{formatDate(member.birthDate)}</TableCell>
                  <TableCell>
                    {member.baptismDate
                      ? formatDate(member.baptismDate)
                      : "-"}
                  </TableCell>
                  <TableCell>
                    {member.confirmationDate
                      ? formatDate(member.confirmationDate)
                      : "-"}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeClass(member.status)}>
                      {getStatusText(member.status)}
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
