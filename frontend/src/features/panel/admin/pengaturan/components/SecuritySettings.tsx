import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function SecuritySettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Pengaturan Keamanan</h3>
        <p className="text-sm text-muted-foreground">
          Konfigurasi keamanan website
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Two Factor Authentication</Label>
            <p className="text-sm text-muted-foreground">
              Aktifkan autentikasi dua faktor untuk keamanan tambahan
            </p>
          </div>
          <Switch />
        </div>

        <div className="space-y-2">
          <Label htmlFor="sessionTimeout">Session Timeout</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Pilih durasi" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30">30 menit</SelectItem>
              <SelectItem value="60">1 jam</SelectItem>
              <SelectItem value="120">2 jam</SelectItem>
              <SelectItem value="240">4 jam</SelectItem>
              <SelectItem value="480">8 jam</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="maxLoginAttempts">Maksimal Percobaan Login</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Pilih jumlah" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3">3 kali</SelectItem>
              <SelectItem value="5">5 kali</SelectItem>
              <SelectItem value="10">10 kali</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>HTTPS Only</Label>
            <p className="text-sm text-muted-foreground">
              Paksa semua koneksi menggunakan HTTPS
            </p>
          </div>
          <Switch defaultChecked />
        </div>

        <div className="space-y-2">
          <Label htmlFor="allowedIPs">IP yang Diizinkan</Label>
          <Textarea
            id="allowedIPs"
            placeholder="Masukkan IP yang diizinkan (satu per baris)"
            className="min-h-[100px]"
          />
        </div>
      </div>

      <Button>Simpan Perubahan</Button>
    </div>
  );
}
