import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BackupSettingsProps {
  data?: {
    autoBackup?: boolean;
    frequency?: 'daily' | 'weekly' | 'monthly';
    backupTime?: string;
    backupLocation?: string;
    includeDatabase?: boolean;
    includeFiles?: boolean;
  };
}

export function BackupSettings({ data }: BackupSettingsProps) {
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
          <Switch defaultChecked={data?.autoBackup} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="backupFrequency">Frekuensi Backup</Label>
          <Select defaultValue={data?.frequency || 'daily'}>
            <SelectTrigger id="backupFrequency">
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
            defaultValue={data?.backupTime || "00:00"}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="backupLocation">Lokasi Backup</Label>
          <Input
            id="backupLocation"
            placeholder="/path/to/backup"
            defaultValue={data?.backupLocation}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Backup Database</Label>
            <p className="text-sm text-muted-foreground">
              Sertakan backup database
            </p>
          </div>
          <Switch defaultChecked={data?.includeDatabase} />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Backup File</Label>
            <p className="text-sm text-muted-foreground">
              Sertakan backup file media
            </p>
          </div>
          <Switch defaultChecked={data?.includeFiles} />
        </div>
      </div>

      <div className="flex justify-end">
        <Button>Simpan Perubahan</Button>
      </div>
    </div>
  );
}
