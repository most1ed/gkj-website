import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ImageUpload } from "@/components/ui/image-upload";

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  date: Date;
}

export function GalleryManager() {
  const [images, setImages] = useState<GalleryItem[]>([
    {
      id: "1",
      title: "Ibadah Minggu",
      description: "Suasana ibadah minggu",
      imageUrl: "/images/gallery/1.jpg",
      date: new Date(),
    },
    // Add more dummy data as needed
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Galeri Foto</h3>
          <p className="text-sm text-muted-foreground">
            Kelola galeri foto kegiatan gereja
          </p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button>Tambah Foto</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tambah Foto Baru</DialogTitle>
              <DialogDescription>
                Upload foto kegiatan gereja
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Judul</Label>
                <Input id="title" placeholder="Masukkan judul foto" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Deskripsi</Label>
                <Input id="description" placeholder="Masukkan deskripsi foto" />
              </div>

              <div className="space-y-2">
                <Label>Foto</Label>
                <ImageUpload 
                  onChange={(url) => console.log(url)}
                  onRemove={() => console.log("removed")}
                />
              </div>
            </div>

            <DialogFooter>
              <Button type="submit">Simpan</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image) => (
          <div key={image.id} className="group relative">
            <div className="aspect-square overflow-hidden rounded-lg">
              <img
                src={image.imageUrl}
                alt={image.title}
                className="object-cover w-full h-full transition-transform group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="space-x-2">
                <Button size="sm" variant="secondary">Edit</Button>
                <Button size="sm" variant="destructive">Hapus</Button>
              </div>
            </div>
            <div className="mt-2">
              <h4 className="font-medium">{image.title}</h4>
              <p className="text-sm text-muted-foreground">{image.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
