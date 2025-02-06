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

interface SecuritySettingsProps {
  data?: any;
}

export function SecuritySettings({ data }: SecuritySettingsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Pengaturan Keamanan</h3>
        <p className="text-sm text-muted-foreground">
          Konfigurasi keamanan website
        </p>
      </div>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Two Factor Authentication</CardTitle>
            <CardDescription>
              Aktifkan autentikasi dua faktor untuk keamanan tambahan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Switch />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Session Timeout</CardTitle>
            <CardDescription>
              Durasi waktu sebelum sesi login berakhir
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Select defaultValue="30">
              <SelectTrigger className="w-full md:w-[240px]">
                <SelectValue placeholder="Pilih durasi timeout" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 menit</SelectItem>
                <SelectItem value="30">30 menit</SelectItem>
                <SelectItem value="60">1 jam</SelectItem>
                <SelectItem value="120">2 jam</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Maksimal Percobaan Login</CardTitle>
            <CardDescription>
              Jumlah maksimal percobaan login yang diizinkan sebelum akun terkunci
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Select defaultValue="3">
              <SelectTrigger className="w-full md:w-[240px]">
                <SelectValue placeholder="Pilih jumlah maksimal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3">3 kali</SelectItem>
                <SelectItem value="5">5 kali</SelectItem>
                <SelectItem value="10">10 kali</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>HTTPS Only</CardTitle>
            <CardDescription>
              Paksa semua koneksi menggunakan HTTPS
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Switch />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>IP yang Diizinkan</CardTitle>
            <CardDescription>
              Daftar alamat IP yang diizinkan untuk mengakses panel admin
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea 
              placeholder="Masukkan alamat IP (satu per baris)&#10;Contoh:&#10;192.168.1.1&#10;10.0.0.0/24" 
              className="min-h-[120px] font-mono"
            />
            <p className="text-sm text-muted-foreground">
              Format: IPv4 atau CIDR notation (contoh: 192.168.1.1 atau 10.0.0.0/24)
            </p>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" size="lg">
            Simpan Perubahan
          </Button>
        </div>
      </div>
    </div>
  );
}
