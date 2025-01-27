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
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { FileText, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DocumentRequest {
  id: string;
  type: string;
  requestDate: Date;
  status: "pending" | "approved" | "rejected";
  purpose: string;
}

export function DocumentHistory() {
  const [requests, setRequests] = useState<DocumentRequest[]>([
    {
      id: "1",
      type: "Surat Baptis",
      requestDate: new Date(),
      status: "approved",
      purpose: "Untuk keperluan administrasi",
    },
    {
      id: "2",
      type: "Surat Sidi",
      requestDate: new Date(),
      status: "pending",
      purpose: "Untuk pendaftaran nikah",
    },
    // Add more dummy data as needed
  ]);

  const getStatusBadgeClass = (status: DocumentRequest["status"]) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  const getStatusText = (status: DocumentRequest["status"]) => {
    switch (status) {
      case "approved":
        return "Disetujui";
      case "rejected":
        return "Ditolak";
      default:
        return "Menunggu";
    }
  };

  return (
    <div className="space-y-6">
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Dokumen</TableHead>
              <TableHead>Tanggal Pengajuan</TableHead>
              <TableHead>Tujuan</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span>{request.type}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {format(request.requestDate, "dd MMMM yyyy", { locale: id })}
                </TableCell>
                <TableCell className="max-w-md truncate">
                  {request.purpose}
                </TableCell>
                <TableCell>
                  <Badge className={getStatusBadgeClass(request.status)}>
                    {getStatusText(request.status)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    Detail
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
