import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function GeneralSettings() {
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
            defaultValue="GKJ"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Deskripsi</Label>
          <Textarea
            id="description"
            placeholder="Deskripsi singkat tentang GKJ"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Alamat</Label>
          <Textarea
            id="address"
            placeholder="Alamat lengkap gereja"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Nomor Telepon</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+62xxx"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="admin@gkj.org"
          />
        </div>
      </div>

      <Button>Simpan Perubahan</Button>
    </div>
  );
}
