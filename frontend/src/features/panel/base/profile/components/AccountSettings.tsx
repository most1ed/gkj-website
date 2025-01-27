import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ImageUpload } from "@/components/image-upload";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  avatar: string;
  bio: string;
  notifications: {
    email: boolean;
    whatsapp: boolean;
  };
  language: string;
  theme: string;
}

export function AccountSettings() {
  const [profile, setProfile] = useState<UserProfile>({
    name: "John Doe",
    email: "john@example.com",
    phone: "+62 812-3456-7890",
    address: "Jl. Contoh No. 123",
    avatar: "/images/avatars/default.jpg",
    bio: "Anggota jemaat aktif",
    notifications: {
      email: true,
      whatsapp: true,
    },
    language: "id",
    theme: "light",
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profil</CardTitle>
          <CardDescription>
            Informasi profil dan pengaturan akun Anda
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
            <div className="flex-shrink-0">
              <ImageUpload
                value={profile.avatar}
                onChange={(url) => console.log(url)}
                className="h-24 w-24 rounded-full"
              />
            </div>
            <div className="flex-grow space-y-1">
              <h4 className="font-medium">{profile.name}</h4>
              <p className="text-sm text-muted-foreground">{profile.email}</p>
              <Button variant="outline" size="sm">
                Ganti Foto
              </Button>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) =>
                  setProfile({ ...profile, name: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Nomor Telepon</Label>
              <Input
                id="phone"
                value={profile.phone}
                onChange={(e) =>
                  setProfile({ ...profile, phone: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Alamat</Label>
              <Input
                id="address"
                value={profile.address}
                onChange={(e) =>
                  setProfile({ ...profile, address: e.target.value })
                }
              />
            </div>

            <div className="col-span-2 space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={profile.bio}
                onChange={(e) =>
                  setProfile({ ...profile, bio: e.target.value })
                }
                className="h-20"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Simpan Perubahan</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notifikasi</CardTitle>
          <CardDescription>
            Atur preferensi notifikasi Anda
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Notifikasi Email</Label>
              <p className="text-sm text-muted-foreground">
                Terima notifikasi melalui email
              </p>
            </div>
            <Switch
              checked={profile.notifications.email}
              onCheckedChange={(checked) =>
                setProfile({
                  ...profile,
                  notifications: { ...profile.notifications, email: checked },
                })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Notifikasi WhatsApp</Label>
              <p className="text-sm text-muted-foreground">
                Terima notifikasi melalui WhatsApp
              </p>
            </div>
            <Switch
              checked={profile.notifications.whatsapp}
              onCheckedChange={(checked) =>
                setProfile({
                  ...profile,
                  notifications: { ...profile.notifications, whatsapp: checked },
                })
              }
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preferensi</CardTitle>
          <CardDescription>
            Atur preferensi tampilan aplikasi
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Bahasa</Label>
            <Select
              value={profile.language}
              onValueChange={(value) =>
                setProfile({ ...profile, language: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="id">Bahasa Indonesia</SelectItem>
                <SelectItem value="jw">Bahasa Jawa</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Tema</Label>
            <Select
              value={profile.theme}
              onValueChange={(value) =>
                setProfile({ ...profile, theme: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Terang</SelectItem>
                <SelectItem value="dark">Gelap</SelectItem>
                <SelectItem value="system">Sistem</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
