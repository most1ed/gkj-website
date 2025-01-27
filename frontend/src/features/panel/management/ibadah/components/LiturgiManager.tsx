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
import { FileUpload } from "@/components/file-upload";

interface LiturgiItem {
  id: string;
  title: string;
  date: Date;
  description: string;
  fileUrl: string;
  downloads: number;
}

export function LiturgiManager() {
  const [liturgies, setLiturgies] = useState<LiturgiItem[]>([
    {
      id: "1",
      title: "Liturgi Ibadah Minggu",
      date: new Date(),
      description: "Liturgi ibadah minggu pagi",
      fileUrl: "/files/liturgi/1.pdf",
      downloads: 25,
    },
    // Add more dummy data as needed
  ]);

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Liturgi</h3>
          <p className="text-sm text-muted-foreground">
            Kelola liturgi ibadah
          </p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button>Tambah Liturgi</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Tambah Liturgi Baru</DialogTitle>
              <DialogDescription>
                Upload file liturgi ibadah
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
                  <Label htmlFor="title">Judul</Label>
                  <Input id="title" placeholder="Masukkan judul liturgi" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="description">Keterangan</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Keterangan liturgi"
                    className="h-32"
                  />
                </div>

                <div className="space-y-2">
                  <Label>File Liturgi</Label>
                  <FileUpload 
                    accept=".pdf,.doc,.docx"
                    onChange={(file) => console.log(file)}
                  />
                  <p className="text-sm text-muted-foreground">
                    Upload file liturgi (PDF/DOC)
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
              <TableHead>Judul</TableHead>
              <TableHead>Keterangan</TableHead>
              <TableHead>File</TableHead>
              <TableHead>Downloads</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {liturgies.map((liturgi) => (
              <TableRow key={liturgi.id}>
                <TableCell>
                  {format(liturgi.date, "dd MMMM yyyy", { locale: id })}
                </TableCell>
                <TableCell>{liturgi.title}</TableCell>
                <TableCell className="max-w-md truncate">
                  {liturgi.description}
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    Download
                  </Button>
                </TableCell>
                <TableCell>{liturgi.downloads}</TableCell>
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
