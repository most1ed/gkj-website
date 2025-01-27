import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { FileText, Download, Eye } from "lucide-react";

interface Document {
  id: string;
  title: string;
  type: string;
  date: Date;
  status: "active" | "expired";
  fileUrl: string;
}

export function MyDocuments() {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      title: "Surat Baptis",
      type: "Baptis",
      date: new Date(),
      status: "active",
      fileUrl: "/documents/baptis.pdf",
    },
    {
      id: "2",
      title: "Surat Sidi",
      type: "Sidi",
      date: new Date(),
      status: "active",
      fileUrl: "/documents/sidi.pdf",
    },
    // Add more dummy data as needed
  ]);

  const getStatusBadgeClass = (status: Document["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700";
      case "expired":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Dokumen</TableHead>
              <TableHead>Jenis</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span>{doc.title}</span>
                  </div>
                </TableCell>
                <TableCell>{doc.type}</TableCell>
                <TableCell>
                  {format(doc.date, "dd MMMM yyyy", { locale: id })}
                </TableCell>
                <TableCell>
                  <Badge className={getStatusBadgeClass(doc.status)}>
                    {doc.status === "active" ? "Aktif" : "Kadaluarsa"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    Lihat
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Unduh
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
