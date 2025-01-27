import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function EmailSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Pengaturan Email</h3>
        <p className="text-sm text-muted-foreground">
          Konfigurasi pengiriman email
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>SMTP Server</Label>
            <p className="text-sm text-muted-foreground">
              Aktifkan untuk menggunakan SMTP server kustom
            </p>
          </div>
          <Switch />
        </div>

        <div className="space-y-2">
          <Label htmlFor="smtpHost">SMTP Host</Label>
          <Input
            id="smtpHost"
            placeholder="smtp.example.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="smtpPort">SMTP Port</Label>
          <Input
            id="smtpPort"
            type="number"
            placeholder="587"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="smtpUser">SMTP Username</Label>
          <Input
            id="smtpUser"
            placeholder="username"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="smtpPass">SMTP Password</Label>
          <Input
            id="smtpPass"
            type="password"
            placeholder="••••••••"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="fromEmail">From Email</Label>
          <Input
            id="fromEmail"
            type="email"
            placeholder="noreply@gkj.org"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="fromName">From Name</Label>
          <Input
            id="fromName"
            placeholder="GKJ"
          />
        </div>
      </div>

      <Button>Simpan Perubahan</Button>
    </div>
  );
}
