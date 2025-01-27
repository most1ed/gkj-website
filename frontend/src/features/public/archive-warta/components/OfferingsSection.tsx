import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";

export function OfferingsSection() {
  return (
    <Tabs defaultValue="guide" className="space-y-6">
      <TabsList className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        <TabsTrigger value="guide">Tata Cara</TabsTrigger>
        <TabsTrigger value="special">Khusus</TabsTrigger>
        <TabsTrigger value="monthly">Bulanan</TabsTrigger>
        <TabsTrigger value="phbp">PHBP</TabsTrigger>
        <TabsTrigger value="sidi">Sidi</TabsTrigger>
        <TabsTrigger value="youth">SM & Pemuda</TabsTrigger>
        <TabsTrigger value="weekly">Mingguan</TabsTrigger>
      </TabsList>

      {/* Tata Cara Tab */}
      <TabsContent value="guide">
        <Card>
          <CardHeader>
            <CardTitle>Penghaturan Persembahan</CardTitle>
            <CardDescription>Tata cara pemberian persembahan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              <p>Bagi jemaat yang mengikuti Ibadah, persembahan diatur sebagai berikut:</p>
              <ol className="list-decimal list-inside space-y-2">
                <li>Persembahan dalam ibadah di gereja, dimasukkan amplop untuk dimasukkan ke dalam kotak persembahan (mingguan, bulanan, dan PHBP) di depan mimbar ketika bagian liturgi persembahan.</li>
                <li>Transfer ke rekening BNI nomor 0000565324, dengan mengganti angka terakhir dengan angka 1 pada jumlah nominal yang akan di transfer (contoh: Rp.xx.xx1) untuk persembahan mingguan.</li>
                <li>Transfer ke rekening BNI nomor 0000565324, dengan mengganti angka terakhir dengan angka 2 pada jumlah nominal yang akan ditransfer (contoh: Rp.xx.xx2) untuk persembahan bulanan.</li>
                <li>Transfer ke rekening BNI nomor 0000565324, dengan mengganti angka terakhir dengan angka 3 pada jumlah nominal yang akan ditransfer (contoh: Rp.xx.xx3) untuk persembahan Persiapan Sakramen Perjamuan.</li>
                <li>Transfer ke rekening BNI nomor 0000565324, dengan mengganti angka terakhir dengan angka 4 pada jumlah nominal yang akan ditransfer (contoh: Rp.xx.xx4) untuk persembahan Sakramen Perjamuan.</li>
                <li>Transfer ke rekening Mandiri nomor 123-00-9302297-0, dengan mengganti angka terakhir dengan angka 1 pada jumlah nominal yang akan ditransfer (contoh: Rp.xx.xx1) untuk persembahan PHBP (Pemeliharaan Harta Benda dan Pembangunan).</li>
                <li>Transfer ke rekening Mandiri nomor 123-00-9302297-0, dengan mengganti angka terakhir dengan angka 2 pada jumlah nominal yang akan ditransfer (contoh: Rp xx.xx2) untuk persembahan khusus bagi pembangunan/renovasi besar gedung gereja.</li>
              </ol>
              <p className="mt-4">
                Untuk keperluan tertib administrasi gerejawi, maka bagi Warga Gereja yang sudah mengirim persembahan transfer, dimohon berkenan mengirim bukti transfer kepada:
              </p>
              <ul className="list-disc list-inside">
                <li>Ibu Pnt. Yidi Rengganis (081287044440)</li>
                <li>Ibu Pnt. Pudyastuti Sardjono (0818712644)</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Persembahan Khusus Tab */}
      <TabsContent value="special">
        <Card>
          <CardHeader>
            <CardTitle>Persembahan Khusus</CardTitle>
            <CardDescription>Periode: 11 s.d. 17 Januari 2025</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <ol className="list-decimal list-inside space-y-2">
                <li>Seperangkat sarana kebersihan (sapu, alat pel), dari PT Kereta Api Indonesia (PT KAI).</li>
                <li>Uang sejumlah Rp.7.000.000,- (tujuh juta rupiah) via transfer dari PT KAI, dalam rangka bantuan peringatan Natal.</li>
                <li>Uang sejumlah Rp.5.000.000,- (lima juta rupiah) via transfer dari salah seorang warga Wilayah 1.</li>
              </ol>
              <p className="text-muted-foreground mt-4">Majelis mengucapkan terima kasih atas persembahan tersebut.</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Persembahan Bulanan Tab */}
      <TabsContent value="monthly">
        <Card>
          <CardHeader>
            <CardTitle>Informasi Persembahan Bulanan</CardTitle>
            <CardDescription>Periode: 11 s.d. 17 Januari 2025</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No.</TableHead>
                  <TableHead>Unit/Wilayah</TableHead>
                  <TableHead>Tanggal Terima</TableHead>
                  <TableHead>Bulan</TableHead>
                  <TableHead className="text-right">Jumlah (Rp)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>W1</TableCell>
                  <TableCell>12 Januari 2025</TableCell>
                  <TableCell>Januari</TableCell>
                  <TableCell className="text-right">200,000</TableCell>
                </TableRow>
                {/* Add other rows */}
                <TableRow>
                  <TableCell colSpan={4} className="font-bold">Total</TableCell>
                  <TableCell className="text-right font-bold">5,500,000</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      {/* PHBP Tab */}
      <TabsContent value="phbp">
        <Card>
          <CardHeader>
            <CardTitle>Informasi Persembahan PHBP</CardTitle>
            <CardDescription>Periode: 11 s.d. 17 Januari 2025</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No.</TableHead>
                  <TableHead>Tanggal Terima</TableHead>
                  <TableHead>Dalam Ibadah/Dari</TableHead>
                  <TableHead className="text-right">Jumlah (Rp)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>12 Januari 2025</TableCell>
                  <TableCell>Minggu, 12 Januari 2025</TableCell>
                  <TableCell className="text-right">1,255,000</TableCell>
                </TableRow>
                {/* Add other rows */}
                <TableRow>
                  <TableCell colSpan={3} className="font-bold">Total</TableCell>
                  <TableCell className="text-right font-bold">1,605,000</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Sidi Tab */}
      <TabsContent value="sidi">
        <Card>
          <CardHeader>
            <CardTitle>Informasi Persembahan Pelayanan Sidi</CardTitle>
            <CardDescription>Per 12 Januari 2025</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No.</TableHead>
                  <TableHead>Tanggal Terima</TableHead>
                  <TableHead>Jenis Persembahan</TableHead>
                  <TableHead className="text-right">Jumlah (Rp)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>12 Januari 2025</TableCell>
                  <TableCell>Persembahan Khusus Sidi (Bokor)</TableCell>
                  <TableCell className="text-right">3,462,000</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={3} className="font-bold">Total</TableCell>
                  <TableCell className="text-right font-bold">3,462,000</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      {/* SM & Pemuda Tab */}
      <TabsContent value="youth">
        <Card>
          <CardHeader>
            <CardTitle>Informasi Persembahan Ibadah SM & Pemuda-Remaja</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No.</TableHead>
                  <TableHead>Tanggal Kebaktian</TableHead>
                  <TableHead>Ibadah</TableHead>
                  <TableHead className="text-right">Jumlah (Rp)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>12 Januari 2025</TableCell>
                  <TableCell>Kebaktian Anak SM</TableCell>
                  <TableCell className="text-right">279,000</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2</TableCell>
                  <TableCell>12 Januari 2025</TableCell>
                  <TableCell>Kebaktian Pemuda-Remaja</TableCell>
                  <TableCell className="text-right">255,000</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={3} className="font-bold">Total</TableCell>
                  <TableCell className="text-right font-bold">534,000</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Weekly Tab */}
      <TabsContent value="weekly">
        <Card>
          <CardHeader>
            <CardTitle>Informasi Persembahan Mingguan</CardTitle>
            <CardDescription>Periode: 11 s.d. 17 Januari 2025</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No.</TableHead>
                  <TableHead>Tanggal Terima</TableHead>
                  <TableHead>Wilayah</TableHead>
                  <TableHead>Kebaktian/Minggu/Bulan</TableHead>
                  <TableHead className="text-right">Jumlah (Rp)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>12 Januari 2025</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>Minggu, 12 Januari 2025</TableCell>
                  <TableCell className="text-right">3,160,000</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={4} className="font-bold">Total</TableCell>
                  <TableCell className="text-right font-bold">3,160,000</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
