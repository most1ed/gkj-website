import React, { useState } from "react";
import { 
  Users, 
  Home, 
  Edit, 
  Plus, 
  Trash2, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail, 
  Briefcase, 
  BookOpen 
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter 
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

type FamilyMember = {
  id: string;
  name: string;
  relationship: 'Kepala Keluarga' | 'Pasangan' | 'Anak' | 'Saudara' | 'Lainnya';
  birthDate: string;
  gender: 'Laki-laki' | 'Perempuan';
  status?: 'Aktif' | 'Tidak Aktif' | 'Pindah' | 'Meninggal';
};

export default function ProfilePage() {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingFamilyMember, setIsAddingFamilyMember] = useState(false);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([
    {
      id: '1',
      name: 'John Doe',
      relationship: 'Kepala Keluarga',
      birthDate: '1980-05-15',
      gender: 'Laki-laki',
      status: 'Aktif'
    },
    {
      id: '2',
      name: 'Jane Doe',
      relationship: 'Pasangan',
      birthDate: '1982-08-20',
      gender: 'Perempuan',
      status: 'Aktif'
    },
    {
      id: '3',
      name: 'Michael Doe',
      relationship: 'Anak',
      birthDate: '2010-03-10',
      gender: 'Laki-laki',
      status: 'Aktif'
    }
  ]);

  const [newFamilyMember, setNewFamilyMember] = useState<Partial<FamilyMember>>({});
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '08123456789',
    address: 'Jl. Magelang No. 123, Yogyakarta',
    occupation: 'Software Engineer',
    education: 'S1 Teknik Informatika',
    baptismDate: '2000-05-20',
    confirmationDate: '2005-06-15',
    familyCardNumber: '3404012345678901'
  });

  const handleAddFamilyMember = () => {
    if (!newFamilyMember.name || !newFamilyMember.relationship || !newFamilyMember.birthDate) {
      toast({
        title: 'Error',
        description: 'Harap lengkapi semua informasi anggota keluarga',
        variant: 'destructive'
      });
      return;
    }

    const memberToAdd: FamilyMember = {
      id: (familyMembers.length + 1).toString(),
      name: newFamilyMember.name,
      relationship: newFamilyMember.relationship,
      birthDate: newFamilyMember.birthDate,
      gender: newFamilyMember.gender || 'Laki-laki',
      status: newFamilyMember.status || 'Aktif'
    };

    setFamilyMembers([...familyMembers, memberToAdd]);
    setIsAddingFamilyMember(false);
    setNewFamilyMember({});
  };

  const handleRemoveFamilyMember = (id: string) => {
    setFamilyMembers(familyMembers.filter(member => member.id !== id));
  };

  const renderFamilyMemberForm = () => (
    <Dialog open={isAddingFamilyMember} onOpenChange={setIsAddingFamilyMember}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah Anggota Keluarga</DialogTitle>
          <DialogDescription>
            Masukkan informasi lengkap anggota keluarga
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="memberName" className="text-right">Nama</Label>
            <Input 
              id="memberName"
              value={newFamilyMember.name || ''}
              onChange={(e) => setNewFamilyMember(prev => ({ ...prev, name: e.target.value }))}
              className="col-span-3" 
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="memberRelationship" className="text-right">Hubungan</Label>
            <Select 
              value={newFamilyMember.relationship} 
              onValueChange={(value) => setNewFamilyMember(prev => ({ 
                ...prev, 
                relationship: value as FamilyMember['relationship'] 
              }))}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Pilih Hubungan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Kepala Keluarga">Kepala Keluarga</SelectItem>
                <SelectItem value="Pasangan">Pasangan</SelectItem>
                <SelectItem value="Anak">Anak</SelectItem>
                <SelectItem value="Saudara">Saudara</SelectItem>
                <SelectItem value="Lainnya">Lainnya</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="memberBirthDate" className="text-right">Tanggal Lahir</Label>
            <Input 
              id="memberBirthDate"
              type="date"
              value={newFamilyMember.birthDate || ''}
              onChange={(e) => setNewFamilyMember(prev => ({ ...prev, birthDate: e.target.value }))}
              className="col-span-3" 
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleAddFamilyMember}>
            Tambah Anggota
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Overview */}
        <Card className="md:col-span-1 p-6">
          <div className="flex flex-col items-center">
            <Avatar className="w-24 h-24 mb-4">
              <AvatarImage src="/images/profile/john-doe.jpg" alt="Profile Picture" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-bold">{profileData.name}</h2>
            <p className="text-muted-foreground">{profileData.occupation}</p>
          </div>
          <Separator className="my-6" />
          <div className="space-y-4">
            <div className="flex items-center">
              <Mail className="mr-3 text-muted-foreground" size={20} />
              <span>{profileData.email}</span>
            </div>
            <div className="flex items-center">
              <Phone className="mr-3 text-muted-foreground" size={20} />
              <span>{profileData.phone}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-3 text-muted-foreground" size={20} />
              <span>{profileData.address}</span>
            </div>
          </div>
        </Card>

        {/* Personal Details */}
        <Card className="md:col-span-2 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold flex items-center">
              <Users className="mr-3" /> Informasi Pribadi
            </h3>
            <Button 
              variant={isEditing ? "outline" : "default"}
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "Batal" : "Edit Profil"}
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label>Pendidikan</Label>
              <Input 
                value={profileData.education} 
                disabled={!isEditing}
                onChange={(e) => setProfileData(prev => ({ ...prev, education: e.target.value }))}
              />
            </div>
            <div>
              <Label>Pekerjaan</Label>
              <Input 
                value={profileData.occupation} 
                disabled={!isEditing}
                onChange={(e) => setProfileData(prev => ({ ...prev, occupation: e.target.value }))}
              />
            </div>
            <div>
              <Label>Tanggal Baptis</Label>
              <Input 
                type="date"
                value={profileData.baptismDate} 
                disabled={!isEditing}
                onChange={(e) => setProfileData(prev => ({ ...prev, baptismDate: e.target.value }))}
              />
            </div>
            <div>
              <Label>Tanggal Sidi</Label>
              <Input 
                type="date"
                value={profileData.confirmationDate} 
                disabled={!isEditing}
                onChange={(e) => setProfileData(prev => ({ ...prev, confirmationDate: e.target.value }))}
              />
            </div>
          </div>
        </Card>

        {/* Family Details */}
        <Card className="md:col-span-3 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold flex items-center">
              <Home className="mr-3" /> Kartu Keluarga
            </h3>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setIsAddingFamilyMember(true)}>
                <Plus className="mr-2" /> Tambah Anggota
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="md:col-span-1">
              <Label>Nomor Kartu Keluarga</Label>
              <Input 
                value={profileData.familyCardNumber} 
                disabled={!isEditing}
                onChange={(e) => setProfileData(prev => ({ ...prev, familyCardNumber: e.target.value }))}
              />
            </div>
          </div>

          <Separator className="my-6" />

          <div className="space-y-4">
            {familyMembers.map((member) => (
              <div 
                key={member.id} 
                className="flex justify-between items-center bg-muted/50 p-4 rounded-lg"
              >
                <div>
                  <h4 className="font-semibold">{member.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {member.relationship} | {member.birthDate}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleRemoveFamilyMember(member.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {renderFamilyMemberForm()}
    </div>
  );
}
