import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function BackupSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Pengaturan Backup</h3>
        <p className="text-sm text-muted-foreground">
          Konfigurasi backup otomatis database dan file
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Backup Otomatis</Label>
            <p className="text-sm text-muted-foreground">
              Aktifkan backup otomatis berkala
            </p>
          </div>
          <Switch />
        </div>

        <div className="space-y-2">
          <Label htmlFor="backupFrequency">Frekuensi Backup</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Pilih frekuensi" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Harian</SelectItem>
              <SelectItem value="weekly">Mingguan</SelectItem>
              <SelectItem value="monthly">Bulanan</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="backupTime">Waktu Backup</Label>
          <Input
            id="backupTime"
            type="time"
            defaultValue="00:00"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="retentionPeriod">Periode Penyimpanan</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Pilih periode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">7 hari</SelectItem>
              <SelectItem value="30">30 hari</SelectItem>
              <SelectItem value="90">90 hari</SelectItem>
              <SelectItem value="365">1 tahun</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="backupLocation">Lokasi Backup</Label>
          <Input
            id="backupLocation"
            placeholder="/path/to/backup"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Backup Database</Label>
            <p className="text-sm text-muted-foreground">
              Sertakan backup database
            </p>
          </div>
          <Switch defaultChecked />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Backup File</Label>
            <p className="text-sm text-muted-foreground">
              Sertakan backup file upload
            </p>
          </div>
          <Switch defaultChecked />
        </div>
      </div>

      <div className="flex space-x-4">
        <Button>Simpan Perubahan</Button>
        <Button variant="outline">Backup Manual</Button>
      </div>
    </div>
  );
}
