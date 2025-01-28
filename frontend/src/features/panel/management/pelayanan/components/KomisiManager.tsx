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
import { Switch } from "@/components/ui/switch";
import { ImageUpload } from "@/components/ui/image-upload";

interface Komisi {
  id: string;
  name: string;
  description: string;
  coordinator: string;
  memberCount: number;
  imageUrl: string;
  isActive: boolean;
}

export function KomisiManager() {
  const [komisis, setKomisis] = useState<Komisi[]>([
    {
      id: "1",
      name: "Komisi Anak",
      description: "Pelayanan untuk anak-anak",
      coordinator: "John Doe",
      memberCount: 15,
      imageUrl: "/images/komisi/1.jpg",
      isActive: true,
    },
    // Add more dummy data as needed
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Komisi</h3>
          <p className="text-sm text-muted-foreground">
            Kelola data komisi pelayanan
          </p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button>Tambah Komisi</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Tambah Komisi Baru</DialogTitle>
              <DialogDescription>
                Buat komisi pelayanan baru
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-6 py-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Komisi</Label>
                  <Input id="name" placeholder="Masukkan nama komisi" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="coordinator">Koordinator</Label>
                  <Input id="coordinator" placeholder="Nama koordinator" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Deskripsi</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Deskripsi komisi"
                    className="h-32"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Status</Label>
                    <p className="text-sm text-muted-foreground">
                      Aktifkan atau nonaktifkan komisi
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Logo/Gambar</Label>
                  <ImageUpload 
                    onChange={(url) => console.log(url)}
                    onRemove={() => console.log("removed")}
                  />
                  <p className="text-sm text-muted-foreground">
                    Upload logo atau gambar komisi
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {komisis.map((komisi) => (
          <div key={komisi.id} className="bg-white rounded-lg border overflow-hidden">
            <div className="aspect-video relative">
              <img
                src={komisi.imageUrl}
                alt={komisi.name}
                className="object-cover w-full h-full"
              />
              <div className="absolute top-2 right-2">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  komisi.isActive 
                    ? "bg-green-100 text-green-700" 
                    : "bg-gray-100 text-gray-700"
                }`}>
                  {komisi.isActive ? "Aktif" : "Non-aktif"}
                </span>
              </div>
            </div>
            
            <div className="p-4">
              <h4 className="font-medium text-lg">{komisi.name}</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {komisi.description}
              </p>
              
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Koordinator:</span>
                  <span className="font-medium">{komisi.coordinator}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Jumlah Anggota:</span>
                  <span className="font-medium">{komisi.memberCount}</span>
                </div>
              </div>

              <div className="mt-4 flex justify-end space-x-2">
                <Button variant="outline" size="sm">Edit</Button>
                <Button variant="destructive" size="sm">Hapus</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
