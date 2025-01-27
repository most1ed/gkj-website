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
import { Plus, Download, Eye, Pencil, Trash } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

interface WartaItem {
  id: string;
  title: string;
  date: Date;
  status: "draft" | "published";
  author: string;
  downloadUrl?: string;
}

interface WartaJemaatProps {
  data?: {
    warta: WartaItem[];
  };
}

export function WartaJemaat({ data }: WartaJemaatProps) {
  const formatDate = (date: Date) => {
    return format(date, "dd MMMM yyyy", { locale: id });
  };

  const getStatusBadgeClass = (status: WartaItem["status"]) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100";
      case "draft":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-700 dark:text-yellow-100";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-100";
    }
  };

  const getStatusText = (status: WartaItem["status"]) => {
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
              <CardTitle>Warta Jemaat</CardTitle>
              <CardDescription>
                Kelola warta jemaat mingguan
              </CardDescription>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Tambah Warta
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tanggal</TableHead>
                <TableHead>Judul</TableHead>
                <TableHead>Pembuat</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.warta.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{formatDate(item.date)}</TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.author}</TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeClass(item.status)}>
                      {getStatusText(item.status)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="outline" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    {item.downloadUrl && (
                      <Button variant="outline" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    )}
                    <Button variant="outline" size="icon">
                      <Trash className="h-4 w-4" />
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
