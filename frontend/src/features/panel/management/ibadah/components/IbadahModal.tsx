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
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "@/components/ui/use-toast";
import { mockIbadahService } from '@/lib/mock/ibadah';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { 
  Clock, 
  BookOpen, 
  Users, 
  CalendarDays 
} from 'lucide-react';

interface IbadahModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (eventData: any) => void;
}

export const IbadahModal: React.FC<IbadahModalProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit 
}) => {
  const [formData, setFormData] = useState({
    title: '',
    date: new Date(),
    time: '',
    type: 'sunday',
    liturgy: '',
    pelayans: [''],
    attendees: 0
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePelayansChange = (index: number, value: string) => {
    const newPelayans = [...formData.pelayans];
    newPelayans[index] = value;
    setFormData(prev => ({
      ...prev,
      pelayans: newPelayans
    }));
  };

  const addPelayan = () => {
    setFormData(prev => ({
      ...prev,
      pelayans: [...prev.pelayans, '']
    }));
  };

  const removePelayan = (index: number) => {
    const newPelayans = formData.pelayans.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      pelayans: newPelayans
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validate form data
      const requiredFields = ['title', 'time', 'type'];
      const missingFields = requiredFields.filter(field => !formData[field]);
      
      if (missingFields.length > 0) {
        toast({
          title: "Validasi Gagal",
          description: `Mohon lengkapi field: ${missingFields.join(', ')}`,
          variant: "destructive"
        });
        return;
      }

      // Prepare event data
      const eventData = {
        ...formData,
        date: formData.date.toISOString(),
        pelayans: formData.pelayans.filter(p => p.trim() !== '')
      };

      // Mock API call to create ibadah event
      const newEvent = await mockIbadahService.createEvent(eventData);
      
      // Call onSubmit if provided
      onSubmit?.(newEvent);
      
      // Show success toast
      toast({
        title: "Berhasil",
        description: "Jadwal ibadah berhasil ditambahkan"
      });

      // Reset form and close modal
      setFormData({
        title: '',
        date: new Date(),
        time: '',
        type: 'sunday',
        liturgy: '',
        pelayans: [''],
        attendees: 0
      });
      
      onClose();
    } catch (error) {
      toast({
        title: "Kesalahan",
        description: "Gagal menambahkan jadwal ibadah",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Tambah Jadwal Ibadah
          </DialogTitle>
          <DialogDescription>
            Lengkapi informasi untuk jadwal ibadah baru.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Judul Ibadah
            </Label>
            <Input 
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Judul ibadah"
              className="col-span-3" 
              required
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right flex items-center gap-2">
              <CalendarDays className="w-4 h-4" />
              Tanggal
            </Label>
            <div className="col-span-3">
              <Calendar
                mode="single"
                selected={formData.date}
                onSelect={(date) => setFormData(prev => ({
                  ...prev,
                  date: date || new Date()
                }))}
                className="rounded-md border"
              />
              <p className="text-sm text-muted-foreground mt-2">
                Dipilih: {format(formData.date, 'PPP', { locale: id })}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="time" className="text-right flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Waktu
            </Label>
            <Input 
              id="time"
              name="time"
              type="time"
              value={formData.time}
              onChange={handleInputChange}
              className="col-span-3" 
              required
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Jenis Ibadah
            </Label>
            <Select 
              name="type"
              value={formData.type}
              onValueChange={(value) => setFormData(prev => ({
                ...prev,
                type: value
              }))}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Pilih Jenis Ibadah" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sunday">Ibadah Minggu</SelectItem>
                <SelectItem value="wednesday">Ibadah Rabu</SelectItem>
                <SelectItem value="special">Ibadah Khusus</SelectItem>
                <SelectItem value="youth">Ibadah Pemuda</SelectItem>
                <SelectItem value="children">Ibadah Anak</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="liturgy" className="text-right">
              Liturgi
            </Label>
            <Textarea 
              id="liturgy"
              name="liturgy"
              value={formData.liturgy}
              onChange={handleInputChange}
              placeholder="Deskripsi liturgi"
              className="col-span-3" 
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-4 gap-4">
            <Label className="text-right flex items-center gap-2">
              <Users className="w-4 h-4" />
              Pelayan
            </Label>
            <div className="col-span-3 space-y-2">
              {formData.pelayans.map((pelayan, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input 
                    value={pelayan}
                    onChange={(e) => handlePelayansChange(index, e.target.value)}
                    placeholder="Nama pelayan"
                    className="flex-grow" 
                  />
                  {index > 0 && (
                    <Button 
                      type="button" 
                      variant="destructive" 
                      size="icon" 
                      onClick={() => removePelayan(index)}
                    >
                      -
                    </Button>
                  )}
                </div>
              ))}
              <Button 
                type="button" 
                variant="outline" 
                onClick={addPelayan}
                className="w-full"
              >
                + Tambah Pelayan
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="attendees" className="text-right">
              Perkiraan Peserta
            </Label>
            <Input 
              id="attendees"
              name="attendees"
              type="number"
              value={formData.attendees}
              onChange={handleInputChange}
              placeholder="Jumlah perkiraan peserta"
              className="col-span-3" 
              min={0}
            />
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
