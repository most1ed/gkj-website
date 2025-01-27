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
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  articleCount: number;
  isActive: boolean;
}

export function CategoryManager() {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: "1",
      name: "Berita Gereja",
      slug: "berita-gereja",
      description: "Berita seputar kegiatan gereja",
      articleCount: 15,
      isActive: true,
    },
    // Add more dummy data as needed
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Kategori</h3>
          <p className="text-sm text-muted-foreground">
            Kelola kategori artikel
          </p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button>Tambah Kategori</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tambah Kategori Baru</DialogTitle>
              <DialogDescription>
                Buat kategori baru untuk artikel
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Kategori</Label>
                <Input id="name" placeholder="Masukkan nama kategori" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input id="slug" placeholder="nama-kategori" />
                <p className="text-sm text-muted-foreground">
                  URL-friendly nama kategori
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea 
                  id="description" 
                  placeholder="Deskripsi kategori"
                  className="h-20"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Status</Label>
                  <p className="text-sm text-muted-foreground">
                    Aktifkan atau nonaktifkan kategori
                  </p>
                </div>
                <Switch />
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
              <TableHead>Deskripsi</TableHead>
              <TableHead>Jumlah Artikel</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium">
                  {category.name}
                </TableCell>
                <TableCell className="font-mono text-sm">
                  {category.slug}
                </TableCell>
                <TableCell className="max-w-md truncate">
                  {category.description}
                </TableCell>
                <TableCell>{category.articleCount}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    category.isActive 
                      ? "bg-green-100 text-green-700" 
                      : "bg-gray-100 text-gray-700"
                  }`}>
                    {category.isActive ? "Aktif" : "Non-aktif"}
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
