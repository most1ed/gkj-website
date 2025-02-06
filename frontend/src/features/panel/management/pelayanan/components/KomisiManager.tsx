import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from "@/components/ui/alert-dialog";
import { Switch } from "@/components/ui/switch";
import { ImageUpload } from "@/components/ui/image-upload";
import { toast } from "@/components/ui/use-toast";
import { Edit, Trash2, Plus } from "lucide-react";

interface Komisi {
  id: string;
  name: string;
  description: string;
  coordinator: string;
  memberCount: number;
  imageUrl: string;
  isActive: boolean;
}

export function KomisiManager({ data }: { data?: Komisi[] }) {
  const [komisis, setKomisis] = useState<Komisi[]>(data || [
    {
      id: "1",
      name: "Komisi Anak",
      description: "Pelayanan untuk anak-anak",
      coordinator: "John Doe",
      memberCount: 15,
      imageUrl: "/images/komisi/1.jpg",
      isActive: true,
    },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentKomisi, setCurrentKomisi] = useState<Partial<Komisi>>({});
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleAddKomisi = () => {
    if (!currentKomisi.name || !currentKomisi.coordinator) {
      toast({
        title: "Error",
        description: "Nama komisi dan koordinator wajib diisi",
        variant: "destructive"
      });
      return;
    }

    const newKomisi: Komisi = {
      id: `${komisis.length + 1}`,
      name: currentKomisi.name,
      description: currentKomisi.description || "",
      coordinator: currentKomisi.coordinator,
      memberCount: 0,
      imageUrl: imageFile 
        ? URL.createObjectURL(imageFile) 
        : "/images/default-komisi.jpg",
      isActive: currentKomisi.isActive ?? true
    };

    setKomisis([...komisis, newKomisi]);
    toast({
      title: "Komisi Ditambahkan",
      description: `${newKomisi.name} berhasil ditambahkan.`
    });

    // Reset states
    setIsAddModalOpen(false);
    setCurrentKomisi({});
    setImageFile(null);
  };

  const handleEditKomisi = () => {
    if (!currentKomisi.name || !currentKomisi.coordinator) {
      toast({
        title: "Error",
        description: "Nama komisi dan koordinator wajib diisi",
        variant: "destructive"
      });
      return;
    }

    const updatedKomisis = komisis.map(komisi => 
      komisi.id === currentKomisi.id 
        ? { 
            ...komisi, 
            ...currentKomisi,
            imageUrl: imageFile 
              ? URL.createObjectURL(imageFile) 
              : komisi.imageUrl 
          } as Komisi 
        : komisi
    );

    setKomisis(updatedKomisis);
    toast({
      title: "Komisi Diperbarui",
      description: `${currentKomisi.name} berhasil diperbarui.`
    });

    // Reset states
    setIsEditModalOpen(false);
    setCurrentKomisi({});
    setImageFile(null);
  };

  const handleDeleteKomisi = (komisiId: string) => {
    const updatedKomisis = komisis.filter(komisi => komisi.id !== komisiId);
    setKomisis(updatedKomisis);
    
    toast({
      title: "Komisi Dihapus",
      description: "Komisi telah dihapus dari daftar.",
      variant: "destructive"
    });
  };

  const renderKomisiModal = (mode: 'add' | 'edit') => (
    <Dialog 
      open={mode === 'add' ? isAddModalOpen : isEditModalOpen} 
      onOpenChange={mode === 'add' ? setIsAddModalOpen : setIsEditModalOpen}
    >
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {mode === 'add' ? 'Tambah Komisi Baru' : 'Edit Komisi'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'add' 
              ? 'Buat komisi pelayanan baru' 
              : 'Perbarui informasi komisi'}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-6 py-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nama Komisi</Label>
              <Input 
                id="name" 
                placeholder="Masukkan nama komisi"
                value={currentKomisi.name || ""}
                onChange={(e) => setCurrentKomisi(prev => ({
                  ...prev,
                  name: e.target.value
                }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="coordinator">Koordinator</Label>
              <Input 
                id="coordinator" 
                placeholder="Nama koordinator"
                value={currentKomisi.coordinator || ""}
                onChange={(e) => setCurrentKomisi(prev => ({
                  ...prev,
                  coordinator: e.target.value
                }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Deskripsi</Label>
              <Textarea 
                id="description" 
                placeholder="Deskripsi komisi"
                className="h-32"
                value={currentKomisi.description || ""}
                onChange={(e) => setCurrentKomisi(prev => ({
                  ...prev,
                  description: e.target.value
                }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Status</Label>
                <p className="text-sm text-muted-foreground">
                  Aktifkan atau nonaktifkan komisi
                </p>
              </div>
              <Switch 
                checked={currentKomisi.isActive ?? true}
                onCheckedChange={(checked) => setCurrentKomisi(prev => ({
                  ...prev,
                  isActive: checked
                }))}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Logo/Gambar</Label>
              <ImageUpload 
                value={currentKomisi.imageUrl}
                onChange={(file) => {
                  setImageFile(file);
                  setCurrentKomisi(prev => ({
                    ...prev,
                    imageUrl: file ? URL.createObjectURL(file) : undefined
                  }));
                }}
                onRemove={() => {
                  setImageFile(null);
                  setCurrentKomisi(prev => ({
                    ...prev,
                    imageUrl: undefined
                  }));
                }}
              />
              <p className="text-sm text-muted-foreground">
                Upload logo atau gambar komisi
              </p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button 
            type="submit"
            onClick={mode === 'add' ? handleAddKomisi : handleEditKomisi}
          >
            {mode === 'add' ? 'Tambah Komisi' : 'Simpan Perubahan'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Komisi</h3>
          <p className="text-sm text-muted-foreground">
            Kelola data komisi pelayanan
          </p>
        </div>

        <Button 
          onClick={() => {
            setCurrentKomisi({});
            setIsAddModalOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Tambah Komisi
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {komisis.map((komisi) => (
          <div 
            key={komisi.id} 
            className="bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 overflow-hidden"
          >
            <div className="aspect-video relative">
              <img
                src={komisi.imageUrl}
                alt={komisi.name}
                className="object-cover w-full h-full"
              />
              <div className="absolute top-2 right-2">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  komisi.isActive 
                    ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" 
                    : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                }`}>
                  {komisi.isActive ? "Aktif" : "Non-aktif"}
                </span>
              </div>
            </div>
            
            <div className="p-4">
              <h4 className="font-medium text-lg dark:text-white">{komisi.name}</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {komisi.description}
              </p>
              
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Koordinator:</span>
                  <span className="font-medium dark:text-white">{komisi.coordinator}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Jumlah Anggota:</span>
                  <span className="font-medium dark:text-white">{komisi.memberCount}</span>
                </div>
              </div>

              <div className="mt-4 flex justify-end space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setCurrentKomisi(komisi);
                    setIsEditModalOpen(true);
                  }}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Hapus
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Hapus Komisi</AlertDialogTitle>
                      <AlertDialogDescription>
                        Apakah Anda yakin ingin menghapus komisi {komisi.name}? 
                        Tindakan ini tidak dapat dibatalkan.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Batal</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={() => handleDeleteKomisi(komisi.id)}
                      >
                        Hapus
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Komisi Modal */}
      {renderKomisiModal('add')}

      {/* Edit Komisi Modal */}
      {renderKomisiModal('edit')}
    </div>
  );
}
