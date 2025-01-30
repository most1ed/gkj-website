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
import { RichTextEditor } from "@/components/ui/editor";

interface Devotional {
  id: string;
  date: Date;
  title: string;
  verses: string;
  content: string;
  author: string;
}

export function DevotionalManager() {
  const [devotionals, setDevotionals] = useState<Devotional[]>([
    {
      id: "1",
      date: new Date(),
      title: "Kasih yang Mengubahkan",
      verses: "1 Yohanes 4:7-21",
      content: "Renungan tentang kasih...",
      author: "Pdt. John Doe"
    },
    // Add more dummy data as needed
  ]);

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [content, setContent] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Renungan Harian</h3>
          <p className="text-sm text-muted-foreground">
            Kelola renungan harian untuk jemaat
          </p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button>Tambah Renungan</Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl h-[90vh]">
            <DialogHeader>
              <DialogTitle>Tambah Renungan Harian</DialogTitle>
              <DialogDescription>
                Masukkan data renungan harian
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-3 gap-6 py-4 h-full overflow-y-auto">
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
                  <Input id="title" placeholder="Masukkan judul renungan" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="verses">Ayat</Label>
                  <Input id="verses" placeholder="contoh: 1 Yohanes 4:7-21" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="author">Penulis</Label>
                  <Input id="author" placeholder="Nama penulis renungan" />
                </div>
              </div>

              <div className="col-span-2 space-y-4">
                <div className="space-y-2">
                  <Label>Isi Renungan</Label>
                  <RichTextEditor 
                    value={content}
                    onChange={setContent}
                    className="min-h-[500px] border rounded-md"
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
              <TableHead>Judul</TableHead>
              <TableHead>Ayat</TableHead>
              <TableHead>Penulis</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {devotionals.map((devotional) => (
              <TableRow key={devotional.id}>
                <TableCell>
                  {format(devotional.date, "dd MMMM yyyy", { locale: id })}
                </TableCell>
                <TableCell>{devotional.title}</TableCell>
                <TableCell>{devotional.verses}</TableCell>
                <TableCell>{devotional.author}</TableCell>
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
