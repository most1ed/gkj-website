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

interface DailyReading {
  id: string;
  date: Date;
  title: string;
  verses: string;
  description: string;
}

export function DailyReadingManager() {
  const [readings, setReadings] = useState<DailyReading[]>([
    {
      id: "1",
      date: new Date(),
      title: "Bacaan Harian",
      verses: "Kejadian 1:1-10",
      description: "Penciptaan Langit dan Bumi",
    },
    // Add more dummy data as needed
  ]);

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Bacaan Alkitab Harian</h3>
          <p className="text-sm text-muted-foreground">
            Kelola bacaan Alkitab harian untuk jemaat
          </p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button>Tambah Bacaan</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Tambah Bacaan Harian</DialogTitle>
              <DialogDescription>
                Masukkan data bacaan Alkitab harian
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
                  <Label htmlFor="title">Judul</Label>
                  <Input id="title" placeholder="Masukkan judul bacaan" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="verses">Ayat</Label>
                  <Input id="verses" placeholder="contoh: Kejadian 1:1-10" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Keterangan</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Masukkan keterangan atau ringkasan bacaan"
                    className="h-32"
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
              <TableHead>Keterangan</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {readings.map((reading) => (
              <TableRow key={reading.id}>
                <TableCell>
                  {format(reading.date, "dd MMMM yyyy", { locale: id })}
                </TableCell>
                <TableCell>{reading.title}</TableCell>
                <TableCell>{reading.verses}</TableCell>
                <TableCell className="max-w-md truncate">
                  {reading.description}
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
