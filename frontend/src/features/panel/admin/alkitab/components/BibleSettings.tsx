import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function BibleSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Pengaturan Alkitab</h3>
        <p className="text-sm text-muted-foreground">
          Konfigurasi pengaturan Alkitab dan renungan
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>API Alkitab</CardTitle>
            <CardDescription>
              Konfigurasi API untuk mengambil data Alkitab
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="api-key">API Key</Label>
              <Input id="api-key" type="password" placeholder="Masukkan API key" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="version">Versi Default</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih versi Alkitab" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tb">Terjemahan Baru</SelectItem>
                  <SelectItem value="bis">Bahasa Indonesia Sehari-hari</SelectItem>
                  <SelectItem value="vmb">Versi Mudah Dibaca</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Cache Ayat</Label>
                <p className="text-sm text-muted-foreground">
                  Simpan ayat dalam cache untuk akses lebih cepat
                </p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pengaturan Renungan</CardTitle>
            <CardDescription>
              Konfigurasi pengaturan renungan harian
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="notification-time">Waktu Notifikasi</Label>
              <Input 
                id="notification-time" 
                type="time" 
                defaultValue="06:00" 
              />
              <p className="text-sm text-muted-foreground">
                Waktu pengiriman notifikasi renungan harian
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto Publish</Label>
                <p className="text-sm text-muted-foreground">
                  Publikasikan renungan secara otomatis sesuai jadwal
                </p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifikasi</Label>
                <p className="text-sm text-muted-foreground">
                  Kirim notifikasi email ke jemaat
                </p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button>Simpan Pengaturan</Button>
        </div>
      </div>
    </div>
  );
}
