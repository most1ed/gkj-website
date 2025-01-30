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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";

interface AnggaranRequest {
  id: string;
  title: string;
  category: string;
  amount: number;
  description: string;
  requestedBy: string;
  requestDate: string;
  status: "pending" | "approved" | "rejected";
  notes?: string;
}

export function AnggaranApproval() {
  const [requests, setRequests] = useState<AnggaranRequest[]>([
    {
      id: "AR001",
      title: "Anggaran Operasional Q1 2024",
      category: "Operasional",
      amount: 25000000,
      description: "Anggaran operasional untuk kegiatan rutin Q1 2024",
      requestedBy: "Komisi Keuangan",
      requestDate: "2024-01-15",
      status: "pending",
    },
    {
      id: "AR002",
      title: "Dana Pembangunan Gedung",
      category: "Pengembangan",
      amount: 500000000,
      description: "Anggaran untuk renovasi gedung gereja",
      requestedBy: "Komisi Pembangunan",
      requestDate: "2024-01-20",
      status: "approved",
      notes: "Disetujui dengan catatan pelaksanaan bertahap",
    },
  ]);

  const [selectedRequest, setSelectedRequest] = useState<AnggaranRequest | null>(null);
  const [approvalNotes, setApprovalNotes] = useState("");

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusBadge = (status: AnggaranRequest["status"]) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-700">
            <CheckCircle className="w-4 h-4 mr-1" />
            Disetujui
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-700">
            <XCircle className="w-4 h-4 mr-1" />
            Ditolak
          </Badge>
        );
      default:
        return (
          <Badge className="bg-yellow-100 text-yellow-700">
            <AlertCircle className="w-4 h-4 mr-1" />
            Menunggu
          </Badge>
        );
    }
  };

  const handleApprove = (request: AnggaranRequest) => {
    setRequests(requests.map(r => 
      r.id === request.id 
        ? { ...r, status: "approved" as const, notes: approvalNotes } 
        : r
    ));
    setSelectedRequest(null);
    setApprovalNotes("");
  };

  const handleReject = (request: AnggaranRequest) => {
    setRequests(requests.map(r => 
      r.id === request.id 
        ? { ...r, status: "rejected" as const, notes: approvalNotes } 
        : r
    ));
    setSelectedRequest(null);
    setApprovalNotes("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Persetujuan Anggaran</h3>
        <p className="text-sm text-muted-foreground">
          Kelola dan tinjau pengajuan anggaran
        </p>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Judul</TableHead>
            <TableHead>Kategori</TableHead>
            <TableHead>Jumlah</TableHead>
            <TableHead>Pengaju</TableHead>
            <TableHead>Tanggal</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request) => (
            <TableRow key={request.id}>
              <TableCell>{request.id}</TableCell>
              <TableCell>{request.title}</TableCell>
              <TableCell>{request.category}</TableCell>
              <TableCell>{formatCurrency(request.amount)}</TableCell>
              <TableCell>{request.requestedBy}</TableCell>
              <TableCell>{request.requestDate}</TableCell>
              <TableCell>{getStatusBadge(request.status)}</TableCell>
              <TableCell>
                {request.status === "pending" && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline"
                        onClick={() => setSelectedRequest(request)}
                      >
                        Review
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Review Pengajuan Anggaran</DialogTitle>
                        <DialogDescription>
                          Review dan berikan keputusan untuk pengajuan anggaran ini
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-4 py-4">
                        <div className="grid grid-cols-4 gap-4">
                          <div className="font-medium">ID</div>
                          <div className="col-span-3">{request.id}</div>
                          
                          <div className="font-medium">Judul</div>
                          <div className="col-span-3">{request.title}</div>
                          
                          <div className="font-medium">Kategori</div>
                          <div className="col-span-3">{request.category}</div>
                          
                          <div className="font-medium">Jumlah</div>
                          <div className="col-span-3">{formatCurrency(request.amount)}</div>
                          
                          <div className="font-medium">Deskripsi</div>
                          <div className="col-span-3">{request.description}</div>
                        </div>

                        <div className="space-y-2">
                          <label className="font-medium">Catatan</label>
                          <Textarea
                            value={approvalNotes}
                            onChange={(e) => setApprovalNotes(e.target.value)}
                            placeholder="Tambahkan catatan untuk keputusan ini..."
                          />
                        </div>
                      </div>

                      <DialogFooter className="space-x-2">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setSelectedRequest(null);
                            setApprovalNotes("");
                          }}
                        >
                          Batal
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => handleReject(request)}
                        >
                          Tolak
                        </Button>
                        <Button
                          variant="default"
                          onClick={() => handleApprove(request)}
                        >
                          Setujui
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
