import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileUpload } from "@/components/file-upload";

interface Pengeluaran {
  id: string;
  date: Date;
  category: string;
  amount: number;
  description: string;
  receipt?: string;
  status: "pending" | "approved" | "rejected";
}

const CATEGORIES = [
  "Operasional",
  "Utilitas",
  "Pemeliharaan",
  "Gaji",
  "Program",
  "Lainnya",
];

export function PengeluaranManager() {
  const [pengeluarans, setPengeluarans] = useState<Pengeluaran[]>([
    {
      id: "1",
      date: new Date(),
      category: "Operasional",
      amount: 2500000,
      description: "Biaya listrik bulan Januari",
      receipt: "/files/receipts/1.pdf",
      status: "approved",
    },
    // Add more dummy data as needed
  ]);

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusBadgeClass = (status: Pengeluaran["status"]) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Pengeluaran</h3>
          <p className="text-sm text-muted-foreground">
            Kelola data pengeluaran
          </p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button>Tambah Pengeluaran</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Tambah Pengeluaran Baru</DialogTitle>
              <DialogDescription>
                Catat pengeluaran baru
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-6 py-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Tanggal</Label>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setSelectedDate(date)}
                    className="border rounded-md"
                    locale={id}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Kategori</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Jumlah</Label>
                  <Input 
                    id="amount" 
                    type="number" 
                    placeholder="0"
                    className="font-mono"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Keterangan</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Keterangan pengeluaran"
                    className="h-20"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Bukti Pengeluaran</Label>
                  <FileUpload 
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(file) => console.log(file)}
                  />
                  <p className="text-sm text-muted-foreground">
                    Upload nota/kwitansi (PDF/JPG)
                  </p>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button type="submit">Simpan</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tanggal</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Jumlah</TableHead>
              <TableHead>Keterangan</TableHead>
              <TableHead>Bukti</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pengeluarans.map((pengeluaran) => (
              <TableRow key={pengeluaran.id}>
                <TableCell>
                  {format(pengeluaran.date, "dd MMMM yyyy", { locale: id })}
                </TableCell>
                <TableCell>{pengeluaran.category}</TableCell>
                <TableCell className="font-mono">
                  {formatCurrency(pengeluaran.amount)}
                </TableCell>
                <TableCell className="max-w-md truncate">
                  {pengeluaran.description}
                </TableCell>
                <TableCell>
                  {pengeluaran.receipt && (
                    <Button variant="outline" size="sm">
                      Lihat Bukti
                    </Button>
                  )}
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    getStatusBadgeClass(pengeluaran.status)
                  }`}>
                    {pengeluaran.status === "approved" && "Disetujui"}
                    {pengeluaran.status === "rejected" && "Ditolak"}
                    {pengeluaran.status === "pending" && "Menunggu"}
                  </span>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="destructive" size="sm">Hapus</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
