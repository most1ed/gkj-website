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

interface Persembahan {
  id: string;
  date: Date;
  type: string;
  amount: number;
  description: string;
  donor?: string;
}

const TYPES = [
  "Persembahan Minggu",
  "Persembahan Khusus",
  "Perpuluhan",
  "Syukur",
  "Lainnya",
];

export function PersembahanManager() {
  const [persembahans, setPersembahans] = useState<Persembahan[]>([
    {
      id: "1",
      date: new Date(),
      type: "Persembahan Minggu",
      amount: 5000000,
      description: "Persembahan ibadah minggu",
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Persembahan</h3>
          <p className="text-sm text-muted-foreground">
            Kelola data persembahan
          </p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button>Tambah Persembahan</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Tambah Persembahan Baru</DialogTitle>
              <DialogDescription>
                Catat persembahan baru
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
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Jenis Persembahan</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih jenis persembahan" />
                    </SelectTrigger>
                    <SelectContent>
                      {TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
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
                  <Label htmlFor="donor">Nama Pemberi</Label>
                  <Input 
                    id="donor" 
                    placeholder="Opsional"
                  />
                  <p className="text-sm text-muted-foreground">
                    Kosongkan jika anonim
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Keterangan</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Keterangan persembahan"
                    className="h-20"
                  />
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
              <TableHead>Jenis</TableHead>
              <TableHead>Jumlah</TableHead>
              <TableHead>Pemberi</TableHead>
              <TableHead>Keterangan</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {persembahans.map((persembahan) => (
              <TableRow key={persembahan.id}>
                <TableCell>
                  {format(persembahan.date, "dd MMMM yyyy", { locale: id })}
                </TableCell>
                <TableCell>{persembahan.type}</TableCell>
                <TableCell className="font-mono">
                  {formatCurrency(persembahan.amount)}
                </TableCell>
                <TableCell>
                  {persembahan.donor || "-"}
                </TableCell>
                <TableCell className="max-w-md truncate">
                  {persembahan.description}
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
