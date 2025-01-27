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
import { Download, FileDown } from "lucide-react";

interface PelayananReport {
  id: string;
  type: "komisi" | "kegiatan" | "jadwal";
  title: string;
  date: Date;
  status: "draft" | "published";
  author: string;
  downloadUrl?: string;
}

interface LaporanPelayananProps {
  data?: {
    reports: PelayananReport[];
  };
}

export function LaporanPelayanan({ data }: LaporanPelayananProps) {
  const formatDate = (date: Date) => {
    return format(date, "dd MMMM yyyy", { locale: id });
  };

  const getStatusBadgeClass = (status: PelayananReport["status"]) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100";
      case "draft":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-700 dark:text-yellow-100";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-100";
    }
  };

  const getStatusText = (status: PelayananReport["status"]) => {
    switch (status) {
      case "published":
        return "Dipublikasi";
      case "draft":
        return "Draft";
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
              <CardTitle>Laporan Pelayanan</CardTitle>
              <CardDescription>
                Daftar laporan kegiatan pelayanan
              </CardDescription>
            </div>
            <Button>
              <FileDown className="mr-2 h-4 w-4" />
              Export Semua
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tanggal</TableHead>
                <TableHead>Judul</TableHead>
                <TableHead>Tipe</TableHead>
                <TableHead>Pembuat</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.reports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>{formatDate(report.date)}</TableCell>
                  <TableCell>{report.title}</TableCell>
                  <TableCell>
                    {report.type === "komisi" && "Laporan Komisi"}
                    {report.type === "kegiatan" && "Laporan Kegiatan"}
                    {report.type === "jadwal" && "Laporan Jadwal"}
                  </TableCell>
                  <TableCell>{report.author}</TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeClass(report.status)}>
                      {getStatusText(report.status)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {report.downloadUrl && (
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Unduh
                      </Button>
                    )}
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
