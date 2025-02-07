import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface EmailSettingsProps {
  data?: {
    useSmtp?: boolean;
    smtpHost?: string;
    smtpPort?: number;
    smtpUser?: string;
    smtpPass?: string;
    fromEmail?: string;
    fromName?: string;
  };
}

export function EmailSettings({ data }: EmailSettingsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Pengaturan Email</h3>
        <p className="text-sm text-muted-foreground">
          Konfigurasi pengiriman email untuk notifikasi dan komunikasi
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="smtpHost">SMTP Host</Label>
          <Input
            id="smtpHost"
            placeholder="smtp.example.com"
            defaultValue={data?.smtpHost}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="smtpPort">SMTP Port</Label>
          <Input
            id="smtpPort"
            type="number"
            placeholder="587"
            defaultValue={data?.smtpPort}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="smtpUsername">SMTP Username</Label>
          <Input
            id="smtpUsername"
            type="email"
            placeholder="email@example.com"
            defaultValue={data?.smtpUser}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="smtpPassword">SMTP Password</Label>
          <Input
            id="smtpPassword"
            type="password"
            placeholder="••••••••"
            defaultValue={data?.smtpPass}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="fromEmail">From Email</Label>
          <Input
            id="fromEmail"
            type="email"
            placeholder="noreply@example.com"
            defaultValue={data?.fromEmail}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="fromName">From Name</Label>
          <Input
            id="fromName"
            placeholder="GKJ"
            defaultValue={data?.fromName}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button>Simpan Perubahan</Button>
      </div>
    </div>
  );
}
