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
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { FileUpload } from "@/components/file-upload";

interface Sermon {
  id: string;
  title: string;
  preacher: string;
  date: Date;
  description: string;
  audioUrl: string;
  slides: string;
  downloads: number;
}

export function SermonManager() {
  const [sermons, setSermons] = useState<Sermon[]>([
    {
      id: "1",
      title: "Kasih yang Mengubahkan",
      preacher: "Pdt. John Doe",
      date: new Date(),
      description: "Khotbah tentang kasih...",
      audioUrl: "/sermons/audio/1.mp3",
      slides: "/sermons/slides/1.pdf",
      downloads: 45,
    },
    // Add more dummy data as needed
  ]);

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Khotbah</h3>
          <p className="text-sm text-muted-foreground">
            Kelola rekaman dan materi khotbah
          </p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button>Tambah Khotbah</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Tambah Khotbah Baru</DialogTitle>
              <DialogDescription>
                Upload rekaman dan materi khotbah
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
                  <Input id="title" placeholder="Masukkan judul khotbah" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preacher">Pengkhotbah</Label>
                  <Input id="preacher" placeholder="Nama pengkhotbah" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="description">Ringkasan</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Ringkasan khotbah"
                    className="h-32"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Audio</Label>
                  <FileUpload 
                    accept="audio/*"
                    onChange={(file) => console.log(file)}
                  />
                  <p className="text-sm text-muted-foreground">
                    Upload file audio (MP3)
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Slides</Label>
                  <FileUpload 
                    accept=".pdf,.ppt,.pptx"
                    onChange={(file) => console.log(file)}
                  />
                  <p className="text-sm text-muted-foreground">
                    Upload file presentasi (PDF/PPT)
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
              <TableHead>Pengkhotbah</TableHead>
              <TableHead>Audio</TableHead>
              <TableHead>Slides</TableHead>
              <TableHead>Downloads</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sermons.map((sermon) => (
              <TableRow key={sermon.id}>
                <TableCell>
                  {format(sermon.date, "dd MMMM yyyy", { locale: id })}
                </TableCell>
                <TableCell>{sermon.title}</TableCell>
                <TableCell>{sermon.preacher}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    Download MP3
                  </Button>
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    Download PDF
                  </Button>
                </TableCell>
                <TableCell>{sermon.downloads}</TableCell>
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
