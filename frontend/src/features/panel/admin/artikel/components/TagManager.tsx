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
import { Badge } from "@/components/ui/badge";

interface Tag {
  id: string;
  name: string;
  slug: string;
  articleCount: number;
  color: string;
}

const COLORS = [
  { name: "Merah", value: "red" },
  { name: "Biru", value: "blue" },
  { name: "Hijau", value: "green" },
  { name: "Kuning", value: "yellow" },
  { name: "Ungu", value: "purple" },
];

export function TagManager() {
  const [tags, setTags] = useState<Tag[]>([
    {
      id: "1",
      name: "Ibadah",
      slug: "ibadah",
      articleCount: 8,
      color: "blue",
    },
    // Add more dummy data as needed
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Tag</h3>
          <p className="text-sm text-muted-foreground">
            Kelola tag untuk artikel
          </p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button>Tambah Tag</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tambah Tag Baru</DialogTitle>
              <DialogDescription>
                Buat tag baru untuk artikel
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Tag</Label>
                <Input id="name" placeholder="Masukkan nama tag" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input id="slug" placeholder="nama-tag" />
                <p className="text-sm text-muted-foreground">
                  URL-friendly nama tag
                </p>
              </div>

              <div className="space-y-2">
                <Label>Warna</Label>
                <div className="flex flex-wrap gap-2">
                  {COLORS.map((color) => (
                    <Badge
                      key={color.value}
                      variant="outline"
                      className={`cursor-pointer hover:bg-${color.value}-100 ${
                        color.value === "blue" ? "ring-2 ring-blue-500" : ""
                      }`}
                    >
                      {color.name}
                    </Badge>
                  ))}
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
              <TableHead>Nama</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Warna</TableHead>
              <TableHead>Jumlah Artikel</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tags.map((tag) => (
              <TableRow key={tag.id}>
                <TableCell className="font-medium">
                  <Badge className={`bg-${tag.color}-100 text-${tag.color}-700 hover:bg-${tag.color}-200`}>
                    {tag.name}
                  </Badge>
                </TableCell>
                <TableCell className="font-mono text-sm">
                  {tag.slug}
                </TableCell>
                <TableCell>
                  <div className={`w-4 h-4 rounded-full bg-${tag.color}-500`} />
                </TableCell>
                <TableCell>{tag.articleCount}</TableCell>
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
