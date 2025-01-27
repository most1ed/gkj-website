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

const OFFERING_TYPES = [
  "Persembahan Minggu",
  "Persembahan Khusus",
  "Persembahan Syukur",
  "Perpuluhan",
  "Lainnya",
];

export function OfferingForm() {
  const [formData, setFormData] = useState({
    type: "",
    amount: "",
    notes: "",
    anonymous: false,
  });

  const formatCurrency = (value: string) => {
    const number = parseInt(value.replace(/\D/g, ""), 10);
    if (isNaN(number)) return "";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setFormData({ ...formData, amount: value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Berikan Persembahan</CardTitle>
        <CardDescription>
          Berikan persembahan Anda dengan mudah dan aman
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="type">Jenis Persembahan</Label>
          <Select
            value={formData.type}
            onValueChange={(value) =>
              setFormData({ ...formData, type: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Pilih jenis persembahan" />
            </SelectTrigger>
            <SelectContent>
              {OFFERING_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="amount">Jumlah</Label>
          <div className="relative">
            <Input
              id="amount"
              value={formatCurrency(formData.amount)}
              onChange={handleAmountChange}
              className="pl-12 font-mono"
              placeholder="0"
            />
            <span className="absolute left-3 top-2 text-muted-foreground">
              Rp
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Catatan (Opsional)</Label>
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

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="anonymous"
            checked={formData.anonymous}
            onChange={(e) =>
              setFormData({ ...formData, anonymous: e.target.checked })
            }
            className="h-4 w-4 rounded border-gray-300"
          />
          <Label htmlFor="anonymous" className="text-sm">
            Berikan secara anonim
          </Label>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Reset</Button>
        <Button>Lanjutkan ke Pembayaran</Button>
      </CardFooter>
    </Card>
  );
}
