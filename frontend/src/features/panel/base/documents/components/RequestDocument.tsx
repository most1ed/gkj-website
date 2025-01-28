import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileUpload } from "@/components/ui/file-upload";

const DOCUMENT_TYPES = [
  "Surat Baptis",
  "Surat Sidi",
  "Surat Nikah",
  "Surat Pindah",
  "Surat Keterangan",
  "Lainnya",
];

export function RequestDocument() {
  const [formData, setFormData] = useState({
    type: "",
    purpose: "",
    notes: "",
    attachments: [] as File[],
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ajukan Dokumen</CardTitle>
        <CardDescription>
          Isi formulir untuk mengajukan permintaan dokumen
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="type">Jenis Dokumen</Label>
          <Select
            value={formData.type}
            onValueChange={(value) =>
              setFormData({ ...formData, type: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Pilih jenis dokumen" />
            </SelectTrigger>
            <SelectContent>
              {DOCUMENT_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="purpose">Tujuan Penggunaan</Label>
          <Input
            id="purpose"
            value={formData.purpose}
            onChange={(e) =>
              setFormData({ ...formData, purpose: e.target.value })
            }
            placeholder="Contoh: Untuk keperluan administrasi"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Catatan Tambahan</Label>
          <Textarea
            id="notes"
            value={formData.notes}
            onChange={(e) =>
              setFormData({ ...formData, notes: e.target.value })
            }
            placeholder="Tambahkan catatan jika diperlukan"
            className="h-20"
          />
        </div>

        <div className="space-y-2">
          <Label>Lampiran</Label>
          <FileUpload
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(files) =>
              setFormData({ ...formData, attachments: Array.from(files) })
            }
            multiple
          />
          <p className="text-sm text-muted-foreground">
            Upload dokumen pendukung jika diperlukan (PDF/JPG)
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button type="submit">Ajukan Permintaan</Button>
      </CardFooter>
    </Card>
  );
}
