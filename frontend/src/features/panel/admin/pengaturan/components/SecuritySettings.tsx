import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SecuritySettingsProps {
  data?: {
    twoFactor?: boolean;
    sessionTimeout?: number;
    maxLoginAttempts?: number;
    httpsOnly?: boolean;
    allowedIPs?: string[];
  };
}

export function SecuritySettings({ data }: SecuritySettingsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Pengaturan Keamanan</h3>
        <p className="text-sm text-muted-foreground">
          Konfigurasi keamanan dan autentikasi
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Two-Factor Authentication</Label>
            <p className="text-sm text-muted-foreground">
              Aktifkan autentikasi dua faktor untuk keamanan tambahan
            </p>
          </div>
          <Switch defaultChecked={data?.twoFactor} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="sessionTimeout">Session Timeout (menit)</Label>
          <Input
            id="sessionTimeout"
            type="number"
            min={5}
            max={1440}
            defaultValue={data?.sessionTimeout || 30}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="maxLoginAttempts">Maksimal Percobaan Login</Label>
          <Input
            id="maxLoginAttempts"
            type="number"
            min={3}
            max={10}
            defaultValue={data?.maxLoginAttempts || 5}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>HTTPS Only</Label>
            <p className="text-sm text-muted-foreground">
              Wajibkan penggunaan HTTPS untuk semua koneksi
            </p>
          </div>
          <Switch defaultChecked={data?.httpsOnly} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="allowedIPs">IP yang Diizinkan</Label>
          <Input
            id="allowedIPs"
            placeholder="Contoh: 192.168.1.1, 10.0.0.0/24"
            defaultValue={data?.allowedIPs?.join(', ')}
          />
          <p className="text-sm text-muted-foreground">
            Kosongkan untuk mengizinkan semua IP
          </p>
        </div>
      </div>

      <div className="flex justify-end">
        <Button>Simpan Perubahan</Button>
      </div>
    </div>
  );
}
