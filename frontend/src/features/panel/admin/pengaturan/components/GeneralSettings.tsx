import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface GeneralSettingsProps {
  data?: {
    siteName?: string;
    description?: string;
    address?: string;
    phone?: string;
    email?: string;
  };
}

export function GeneralSettings({ data }: GeneralSettingsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Pengaturan Umum</h3>
        <p className="text-sm text-muted-foreground">
          Pengaturan dasar untuk website GKJ
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="siteName">Nama Situs</Label>
          <Input
            id="siteName"
            placeholder="GKJ"
            defaultValue={data?.siteName}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Deskripsi</Label>
          <Textarea
            id="description"
            placeholder="Deskripsi singkat tentang GKJ"
            defaultValue={data?.description}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Alamat</Label>
          <Textarea
            id="address"
            placeholder="Alamat lengkap gereja"
            defaultValue={data?.address}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Nomor Telepon</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+62xxx"
            defaultValue={data?.phone}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="info@gkj.org"
            defaultValue={data?.email}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button>Simpan Perubahan</Button>
      </div>
    </div>
  );
}
