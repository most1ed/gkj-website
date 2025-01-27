import { Card, CardContent } from "@/components/ui/Card";
import { PersembahanData } from "@/types/warta";
import { PiggyBank } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { formatCurrency } from "@/lib/utils";

interface PersembahanSectionProps {
  data: PersembahanData;
}

export function PersembahanSection({ data }: PersembahanSectionProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-2">
        <PiggyBank className="h-5 w-5 text-primary" />
        <h2 className="text-2xl font-bold">Persembahan</h2>
      </div>

      {/* Persembahan Mingguan */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4">Persembahan Mingguan - {data.mingguan.periode}</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tanggal</TableHead>
                <TableHead>Wilayah</TableHead>
                <TableHead className="text-right">Jumlah</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.mingguan.data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.tanggal}</TableCell>
                  <TableCell>{item.wilayah}</TableCell>
                  <TableCell className="text-right">{formatCurrency(item.jumlah)}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={2} className="font-bold">Total</TableCell>
                <TableCell className="text-right font-bold">{formatCurrency(data.mingguan.total)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Persembahan Bulanan */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4">Persembahan Bulanan - {data.bulanan.periode}</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Bulan</TableHead>
                <TableHead className="text-right">Jumlah</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.bulanan.data.map((item) => (
                <TableRow key={item.nomor}>
                  <TableCell>{item.nomor}</TableCell>
                  <TableCell>{item.unit}</TableCell>
                  <TableCell>{item.tanggal}</TableCell>
                  <TableCell>{item.bulan}</TableCell>
                  <TableCell className="text-right">{formatCurrency(item.jumlah)}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={4} className="font-bold">Total</TableCell>
                <TableCell className="text-right font-bold">{formatCurrency(data.bulanan.total)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Persembahan PHBP */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4">Persembahan PHBP - {data.phbp.periode}</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Wilayah</TableHead>
                <TableHead className="text-right">Jumlah</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.phbp.data.map((item) => (
                <TableRow key={item.nomor}>
                  <TableCell>{item.nomor}</TableCell>
                  <TableCell>{item.tanggal}</TableCell>
                  <TableCell>{item.wilayah}</TableCell>
                  <TableCell className="text-right">{formatCurrency(item.jumlah)}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={3} className="font-bold">Total</TableCell>
                <TableCell className="text-right font-bold">{formatCurrency(data.phbp.total)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Persembahan Sidi */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4">Persembahan Sidi - {data.sidi.periode}</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Jenis</TableHead>
                <TableHead className="text-right">Jumlah</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.sidi.data.map((item) => (
                <TableRow key={item.nomor}>
                  <TableCell>{item.nomor}</TableCell>
                  <TableCell>{item.tanggal}</TableCell>
                  <TableCell>{item.jenis}</TableCell>
                  <TableCell className="text-right">{formatCurrency(item.jumlah)}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={3} className="font-bold">Total</TableCell>
                <TableCell className="text-right font-bold">{formatCurrency(data.sidi.total)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Persembahan SM & Pemuda */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4">Persembahan SM & Pemuda</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Ibadah</TableHead>
                <TableHead className="text-right">Jumlah</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.smPemuda.data.map((item) => (
                <TableRow key={item.nomor}>
                  <TableCell>{item.nomor}</TableCell>
                  <TableCell>{item.tanggal}</TableCell>
                  <TableCell>{item.ibadah}</TableCell>
                  <TableCell className="text-right">{formatCurrency(item.jumlah)}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={3} className="font-bold">Total</TableCell>
                <TableCell className="text-right font-bold">{formatCurrency(data.smPemuda.total)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Persembahan Khusus */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4">Persembahan Khusus</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item/Nominal</TableHead>
                <TableHead>Dari</TableHead>
                <TableHead>Keterangan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.khusus.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.item}</TableCell>
                  <TableCell>{item.dari}</TableCell>
                  <TableCell>{item.keterangan || '-'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
