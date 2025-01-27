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
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Receipt, Download } from "lucide-react";

interface Offering {
  id: string;
  type: string;
  amount: number;
  date: Date;
  status: "success" | "pending" | "failed";
  receipt?: string;
  notes?: string;
}

export function OfferingHistory() {
  const [offerings, setOfferings] = useState<Offering[]>([
    {
      id: "1",
      type: "Persembahan Minggu",
      amount: 100000,
      date: new Date(),
      status: "success",
      receipt: "/receipts/offering-1.pdf",
      notes: "Persembahan Minggu",
    },
    {
      id: "2",
      type: "Persembahan Khusus",
      amount: 500000,
      date: new Date(),
      status: "success",
      receipt: "/receipts/offering-2.pdf",
      notes: "Persembahan Natal",
    },
    // Add more dummy data as needed
  ]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusBadgeClass = (status: Offering["status"]) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-700";
      case "failed":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  const getStatusText = (status: Offering["status"]) => {
    switch (status) {
      case "success":
        return "Berhasil";
      case "failed":
        return "Gagal";
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
              <TableHead>Tanggal</TableHead>
              <TableHead>Jenis</TableHead>
              <TableHead>Jumlah</TableHead>
              <TableHead>Catatan</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Bukti</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {offerings.map((offering) => (
              <TableRow key={offering.id}>
                <TableCell>
                  {format(offering.date, "dd MMMM yyyy", { locale: id })}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Receipt className="h-4 w-4 text-muted-foreground" />
                    {offering.type}
                  </div>
                </TableCell>
                <TableCell className="font-mono">
                  {formatCurrency(offering.amount)}
                </TableCell>
                <TableCell className="max-w-md truncate">
                  {offering.notes}
                </TableCell>
                <TableCell>
                  <Badge className={getStatusBadgeClass(offering.status)}>
                    {getStatusText(offering.status)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {offering.receipt && offering.status === "success" && (
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Unduh
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
