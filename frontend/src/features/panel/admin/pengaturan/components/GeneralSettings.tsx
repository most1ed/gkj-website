import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function GeneralSettings() {
  return (
    <div className="w-full">
      <div className="panel-settings-section-header">
        <h3 className="panel-settings-section-title">Pengaturan Umum</h3>
        <p className="panel-settings-section-description">
          Pengaturan dasar untuk website GKJ
        </p>
      </div>
      
      <div className="flex-1 w-full">
        <div className="panel-settings-form-group">
          <Label htmlFor="siteName">Nama Situs</Label>
          <Input
            id="siteName"
            placeholder="GKJ"
            defaultValue="GKJ"
          />
        </div>
        
        <div className="panel-settings-form-group">
          <Label htmlFor="description">Deskripsi</Label>
          <Textarea
            id="description"
            placeholder="Deskripsi singkat tentang GKJ"
          />
        </div>

        <div className="panel-settings-form-group">
          <Label htmlFor="address">Alamat</Label>
          <Textarea
            id="address"
            placeholder="Alamat lengkap gereja"
          />
        </div>

        <div className="panel-settings-form-group">
          <Label htmlFor="phone">Nomor Telepon</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+62xxx"
          />
        </div>

        <div className="panel-settings-form-group">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="admin@gkj.org"
          />
        </div>
      </div>

      <Button className="mt-6">Simpan Perubahan</Button>
    </div>
  );
}
