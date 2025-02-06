import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Plus, Edit, Trash2 } from 'lucide-react';

// Type definition for Offering Type
interface OfferingType {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
}

export function OfferingTypeManagement() {
  const [offeringTypes, setOfferingTypes] = useState<OfferingType[]>([
    {
      id: '1',
      name: 'Persembahan Umum',
      description: 'Persembahan untuk kegiatan umum gereja',
      isActive: true
    },
    {
      id: '2',
      name: 'Persembahan Pembangunan',
      description: 'Persembahan untuk proyek pembangunan gedung',
      isActive: true
    },
    {
      id: '3',
      name: 'Persembahan Misi',
      description: 'Persembahan untuk kegiatan misi dan pelayanan',
      isActive: false
    }
  ]);

  const [selectedType, setSelectedType] = useState<OfferingType | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddType = () => {
    const newType: OfferingType = {
      id: `${offeringTypes.length + 1}`,
      name: 'Jenis Persembahan Baru',
      description: '',
      isActive: true
    };
    setOfferingTypes([...offeringTypes, newType]);
    setSelectedType(newType);
    setIsDialogOpen(true);
  };

  const handleEditType = (type: OfferingType) => {
    setSelectedType(type);
    setIsDialogOpen(true);
  };

  const handleDeleteType = (id: string) => {
    setOfferingTypes(offeringTypes.filter(type => type.id !== id));
  };

  const handleSaveType = () => {
    if (selectedType) {
      const updatedTypes = offeringTypes.map(type => 
        type.id === selectedType.id ? selectedType : type
      );
      setOfferingTypes(updatedTypes);
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manajemen Jenis Persembahan</h2>
        <Button onClick={handleAddType} variant="outline">
          <Plus className="mr-2 h-4 w-4" /> Tambah Jenis
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nama</TableHead>
            <TableHead>Deskripsi</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {offeringTypes.map((type) => (
            <TableRow key={type.id}>
              <TableCell>{type.name}</TableCell>
              <TableCell>{type.description}</TableCell>
              <TableCell>
                <span className={`
                  px-2 py-1 rounded text-xs
                  ${type.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                `}>
                  {type.isActive ? 'Aktif' : 'Tidak Aktif'}
                </span>
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleEditType(type)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  size="sm" 
                  variant="destructive"
                  onClick={() => handleDeleteType(type.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedType?.id ? 'Edit' : 'Tambah'} Jenis Persembahan
            </DialogTitle>
          </DialogHeader>
          {selectedType && (
            <div className="space-y-4">
              <div>
                <label className="block mb-2">Nama Jenis Persembahan</label>
                <Input 
                  value={selectedType.name}
                  onChange={(e) => setSelectedType({
                    ...selectedType, 
                    name: e.target.value
                  })}
                />
              </div>
              <div>
                <label className="block mb-2">Deskripsi</label>
                <Input 
                  value={selectedType.description}
                  onChange={(e) => setSelectedType({
                    ...selectedType, 
                    description: e.target.value
                  })}
                />
              </div>
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox"
                  checked={selectedType.isActive}
                  onChange={(e) => setSelectedType({
                    ...selectedType, 
                    isActive: e.target.checked
                  })}
                />
                <label>Aktif</label>
              </div>
              <div className="flex justify-end space-x-2">
                <Button 
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Batal
                </Button>
                <Button onClick={handleSaveType}>
                  Simpan
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
