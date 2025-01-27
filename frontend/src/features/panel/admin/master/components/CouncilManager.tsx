import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Council {
  id: string;
  name: string;
  position: string;
  period: string;
  status: "active" | "inactive";
}

export function CouncilManager() {
  const [councils, setCouncils] = useState<Council[]>([
    {
      id: "1",
      name: "John Doe",
      position: "Ketua",
      period: "2024-2027",
      status: "active",
    },
    // Add more dummy data as needed
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Data Majelis</h3>
          <p className="text-sm text-muted-foreground">
            Kelola data majelis aktif dan non-aktif
          </p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button>Tambah Majelis</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tambah Majelis Baru</DialogTitle>
              <DialogDescription>
                Masukkan data majelis baru di bawah ini
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input id="name" placeholder="Masukkan nama lengkap" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="position">Jabatan</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih jabatan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ketua">Ketua</SelectItem>
                    <SelectItem value="wakil">Wakil Ketua</SelectItem>
                    <SelectItem value="sekretaris">Sekretaris</SelectItem>
                    <SelectItem value="bendahara">Bendahara</SelectItem>
                    <SelectItem value="anggota">Anggota</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="period">Periode</Label>
                <Input id="period" placeholder="2024-2027" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Aktif</SelectItem>
                    <SelectItem value="inactive">Non-aktif</SelectItem>
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
              <TableHead>Nama</TableHead>
              <TableHead>Jabatan</TableHead>
              <TableHead>Periode</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {councils.map((council) => (
              <TableRow key={council.id}>
                <TableCell>{council.name}</TableCell>
                <TableCell>{council.position}</TableCell>
                <TableCell>{council.period}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    council.status === "active" 
                      ? "bg-green-100 text-green-700" 
                      : "bg-gray-100 text-gray-700"
                  }`}>
                    {council.status === "active" ? "Aktif" : "Non-aktif"}
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
