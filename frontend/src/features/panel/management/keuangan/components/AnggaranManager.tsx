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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

interface Anggaran {
  id: string;
  year: number;
  category: string;
  amount: number;
  used: number;
  description: string;
  status: "active" | "draft" | "archived";
}

const CATEGORIES = [
  "Operasional",
  "Program",
  "Pemeliharaan",
  "Pengembangan",
  "Cadangan",
];

export function AnggaranManager() {
  const [anggarans, setAnggarans] = useState<Anggaran[]>([
    {
      id: "1",
      year: 2024,
      category: "Operasional",
      amount: 100000000,
      used: 25000000,
      description: "Anggaran operasional tahun 2024",
      status: "active",
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

  const calculateProgress = (used: number, total: number) => {
    return Math.round((used / total) * 100);
  };

  const getStatusBadgeClass = (status: Anggaran["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700";
      case "archived":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Anggaran</h3>
          <p className="text-sm text-muted-foreground">
            Kelola anggaran tahunan
          </p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button>Tambah Anggaran</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tambah Anggaran Baru</DialogTitle>
              <DialogDescription>
                Buat anggaran baru
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="year">Tahun</Label>
                <Input 
                  id="year" 
                  type="number" 
                  placeholder="2024"
                  className="font-mono"
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
                  placeholder="Keterangan anggaran"
                  className="h-20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="active">Aktif</SelectItem>
                    <SelectItem value="archived">Arsip</SelectItem>
                  </SelectContent>
                </Select>
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
              <TableHead>Tahun</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Anggaran</TableHead>
              <TableHead>Terpakai</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {anggarans.map((anggaran) => (
              <TableRow key={anggaran.id}>
                <TableCell className="font-mono">
                  {anggaran.year}
                </TableCell>
                <TableCell>{anggaran.category}</TableCell>
                <TableCell className="font-mono">
                  {formatCurrency(anggaran.amount)}
                </TableCell>
                <TableCell className="font-mono">
                  {formatCurrency(anggaran.used)}
                </TableCell>
                <TableCell className="w-[200px]">
                  <div className="space-y-1">
                    <Progress 
                      value={calculateProgress(anggaran.used, anggaran.amount)} 
                    />
                    <p className="text-xs text-muted-foreground">
                      {calculateProgress(anggaran.used, anggaran.amount)}% terpakai
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    getStatusBadgeClass(anggaran.status)
                  }`}>
                    {anggaran.status === "active" && "Aktif"}
                    {anggaran.status === "draft" && "Draft"}
                    {anggaran.status === "archived" && "Arsip"}
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
