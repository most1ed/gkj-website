import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter,
  DialogClose 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { mockJemaatService } from '@/lib/mock/jemaat';

interface JemaatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (jemaatData: any) => void;
}

export const JemaatModal: React.FC<JemaatModalProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit 
}) => {
  const [formData, setFormData] = useState({
    nama: '',
    jenisKelamin: '',
    tanggalLahir: '',
    alamat: '',
    nomorTelepon: '',
    statusPernikahan: '',
    pelayanan: '',
    wilayah: ''
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validate form data
      const requiredFields = ['nama', 'jenisKelamin', 'alamat'];
      const missingFields = requiredFields.filter(field => !formData[field]);
      
      if (missingFields.length > 0) {
        toast({
          title: "Validasi Gagal",
          description: `Mohon lengkapi field: ${missingFields.join(', ')}`,
          variant: "destructive"
        });
        return;
      }

      // Mock API call to create jemaat
      const newJemaat = await mockJemaatService.createJemaat(formData);
      
      // Call onSubmit if provided
      onSubmit?.(newJemaat);
      
      // Show success toast
      toast({
        title: "Berhasil",
        description: "Data jemaat berhasil ditambahkan"
      });

      // Reset form and close modal
      setFormData({
        nama: '',
        jenisKelamin: '',
        tanggalLahir: '',
        alamat: '',
        nomorTelepon: '',
        statusPernikahan: '',
        pelayanan: '',
        wilayah: ''
      });
      
      onClose();
    } catch (error) {
      toast({
        title: "Kesalahan",
        description: "Gagal menambahkan data jemaat",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Tambah Anggota Jemaat</DialogTitle>
          <DialogDescription>
            Lengkapi informasi anggota jemaat baru.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nama" className="text-right">
              Nama
            </Label>
            <Input 
              id="nama"
              name="nama"
              value={formData.nama}
              onChange={handleInputChange}
              placeholder="Nama lengkap"
              className="col-span-3" 
              required
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="jenisKelamin" className="text-right">
              Jenis Kelamin
            </Label>
            <Select 
              name="jenisKelamin"
              value={formData.jenisKelamin}
              onValueChange={(value) => setFormData(prev => ({
                ...prev,
                jenisKelamin: value
              }))}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Pilih Jenis Kelamin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="L">Laki-laki</SelectItem>
                <SelectItem value="P">Perempuan</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="tanggalLahir" className="text-right">
              Tanggal Lahir
            </Label>
            <Input 
              id="tanggalLahir"
              name="tanggalLahir"
              type="date"
              value={formData.tanggalLahir}
              onChange={handleInputChange}
              className="col-span-3" 
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="alamat" className="text-right">
              Alamat
            </Label>
            <Input 
              id="alamat"
              name="alamat"
              value={formData.alamat}
              onChange={handleInputChange}
              placeholder="Alamat lengkap"
              className="col-span-3" 
              required
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nomorTelepon" className="text-right">
              Nomor Telepon
            </Label>
            <Input 
              id="nomorTelepon"
              name="nomorTelepon"
              type="tel"
              value={formData.nomorTelepon}
              onChange={handleInputChange}
              placeholder="Nomor telepon"
              className="col-span-3" 
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="statusPernikahan" className="text-right">
              Status Pernikahan
            </Label>
            <Select 
              name="statusPernikahan"
              value={formData.statusPernikahan}
              onValueChange={(value) => setFormData(prev => ({
                ...prev,
                statusPernikahan: value
              }))}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Pilih Status Pernikahan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Belum Menikah">Belum Menikah</SelectItem>
                <SelectItem value="Menikah">Menikah</SelectItem>
                <SelectItem value="Cerai">Cerai</SelectItem>
                <SelectItem value="Janda/Duda">Janda/Duda</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Batal
              </Button>
            </DialogClose>
            <Button type="submit">Simpan</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
