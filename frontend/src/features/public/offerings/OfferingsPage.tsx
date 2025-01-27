import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { CreditCard, Info, Heart, BookOpen } from "lucide-react";

const transferGuide = [
  {
    bank: "BNI",
    rekening: "0000565324",
    akhiran: "1",
    jenis: "Persembahan Mingguan",
    contoh: "Rp xx.xx1"
  },
  {
    bank: "BNI",
    rekening: "0000565324",
    akhiran: "2",
    jenis: "Persembahan Bulanan",
    contoh: "Rp xx.xx2"
  },
  {
    bank: "BNI",
    rekening: "0000565324",
    akhiran: "3",
    jenis: "Persembahan Persiapan Sakramen Perjamuan",
    contoh: "Rp xx.xx3"
  },
  {
    bank: "BNI",
    rekening: "0000565324",
    akhiran: "4",
    jenis: "Persembahan Sakramen Perjamuan",
    contoh: "Rp xx.xx4"
  },
  {
    bank: "BNI",
    rekening: "0000565324",
    akhiran: "5",
    jenis: "Persembahan Diakonia",
    contoh: "Rp xx.xx5"
  },
  {
    bank: "BNI",
    rekening: "0000565324",
    akhiran: "6",
    jenis: "Persembahan Natal/Paskah",
    contoh: "Rp xx.xx6"
  },
  {
    bank: "Mandiri",
    rekening: "123-00-9302297-0",
    akhiran: "1",
    jenis: "Persembahan PHBP (Pemeliharaan Harta Benda dan Pembangunan)",
    contoh: "Rp xx.xx1"
  },
  {
    bank: "Mandiri",
    rekening: "123-00-9302297-0",
    akhiran: "2",
    jenis: "Persembahan Khusus Pembangunan/Renovasi Gedung Gereja",
    contoh: "Rp xx.xx2"
  }
];

export default function Offerings() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-[980px] mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Persembahan</h1>
          <div className="max-w-3xl mx-auto">
            <p className="text-xl text-muted-foreground mb-2">
              "Hendaklah masing-masing memberikan menurut kerelaan hatinya, jangan dengan sedih hati atau karena paksaan, sebab Allah mengasihi orang yang memberi dengan sukacita."
            </p>
            <p className="text-lg text-muted-foreground">- 2 Korintus 9:7</p>
          </div>
        </div>

        <Tabs defaultValue="panduan" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="panduan" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Panduan Persembahan
            </TabsTrigger>
            <TabsTrigger value="dasar" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Dasar Alkitabiah
            </TabsTrigger>
            <TabsTrigger value="tujuan" className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              Tujuan & Makna
            </TabsTrigger>
          </TabsList>

          {/* Tab Panduan Persembahan */}
          <TabsContent value="panduan" className="space-y-6">
            {/* Jenis Persembahan */}
            <Card>
              <CardHeader>
                <CardTitle>Jenis-jenis Persembahan</CardTitle>
                <CardDescription>
                  Berbagai jenis persembahan yang dapat diberikan
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Persembahan Rutin</h4>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                      <li>Persembahan Mingguan</li>
                      <li>Persembahan Bulanan</li>
                      <li>Persembahan PHBP (Pemeliharaan Harta Benda dan Pembangunan)</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Persembahan Sakramental</h4>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                      <li>Persembahan Persiapan Sakramen Perjamuan</li>
                      <li>Persembahan Sakramen Perjamuan</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Persembahan Khusus</h4>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                      <li>Persembahan Natal</li>
                      <li>Persembahan Paskah</li>
                      <li>Persembahan Khusus Pembangunan/Renovasi</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Persembahan Diakonia</h4>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                      <li>Dana Kasih</li>
                      <li>Bantuan Sosial</li>
                      <li>Bantuan Bencana</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tata Cara Persembahan */}
            <Card>
              <CardHeader>
                <CardTitle>Tata Cara Persembahan</CardTitle>
                <CardDescription>
                  Bagi jemaat yang mengikuti Ibadah, persembahan diatur sebagai berikut
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium">1. Persembahan di Gereja</h4>
                  <p className="text-sm text-muted-foreground">
                    Persembahan dalam ibadah di gereja, dimasukkan amplop untuk dimasukkan ke dalam kotak persembahan 
                    (mingguan, bulanan, dan PHBP) di depan mimbar ketika bagian liturgi persembahan.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">2. Persembahan via Transfer Bank</h4>
                  <div className="rounded-lg border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Bank</TableHead>
                          <TableHead>No. Rekening</TableHead>
                          <TableHead>Jenis Persembahan</TableHead>
                          <TableHead>Akhiran</TableHead>
                          <TableHead>Contoh</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {transferGuide.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{item.bank}</TableCell>
                            <TableCell>{item.rekening}</TableCell>
                            <TableCell>{item.jenis}</TableCell>
                            <TableCell>{item.akhiran}</TableCell>
                            <TableCell>{item.contoh}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Informasi Rekening */}
            <Card>
              <CardHeader>
                <CardTitle>Informasi Rekening</CardTitle>
                <CardDescription>Rekening resmi GKJ Grogol Jakarta</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <CreditCard className="h-5 w-5 mt-1 shrink-0" />
                  <div>
                    <p className="font-medium">Rekening Majelis:</p>
                    <p className="text-muted-foreground">Bank BNI: 0000565324</p>
                    <p className="text-sm text-muted-foreground">a.n. Gereja Kristen Jawa Grogol Jakarta</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CreditCard className="h-5 w-5 mt-1 shrink-0" />
                  <div>
                    <p className="font-medium">Rekening Harta Benda dan Pembangunan:</p>
                    <p className="text-muted-foreground">Bank Mandiri: 123-00-9302297-0</p>
                    <p className="text-sm text-muted-foreground">a.n. BPPG GKJ Jakarta</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Konfirmasi Transfer */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  Konfirmasi Transfer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Untuk keperluan tertib administrasi gerejawi, bagi Warga Gereja yang sudah mengirim persembahan transfer, 
                  dimohon berkenan mengirim bukti transfer kepada:
                </p>
                <ul className="mt-4 space-y-2 list-disc list-inside text-muted-foreground">
                  <li>Ibu Pnt. Yidi Rengganis (081287044440)</li>
                  <li>Ibu Pnt. Pudyastuti Sardjono (0818712644)</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab Dasar Alkitabiah */}
          <TabsContent value="dasar">
            <Card>
              <CardHeader>
                <CardTitle>Dasar Alkitabiah Persembahan</CardTitle>
                <CardDescription>
                  Pemahaman tentang persembahan berdasarkan Alkitab
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">1. Persembahan sebagai Ucapan Syukur</h4>
                    <p className="text-muted-foreground">
                      "Bawalah seluruh persembahan persepuluhan itu ke dalam rumah perbendaharaan, supaya ada persediaan makanan di rumah-Ku dan ujilah Aku, firman TUHAN semesta alam, apakah Aku tidak membukakan bagimu tingkap-tingkap langit dan mencurahkan berkat kepadamu sampai berkelimpahan." - Maleakhi 3:10
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">2. Memberi dengan Sukacita</h4>
                    <p className="text-muted-foreground">
                      "Allah mengasihi orang yang memberi dengan sukacita." - 2 Korintus 9:7
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">3. Persembahan sebagai Ibadah</h4>
                    <p className="text-muted-foreground">
                      "Sebab itu, saudara-saudara, demi kemurahan Allah aku menasihatkan kamu, supaya kamu mempersembahkan tubuhmu sebagai persembahan yang hidup, yang kudus dan yang berkenan kepada Allah: itu adalah ibadahmu yang sejati." - Roma 12:1
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab Tujuan & Makna */}
          <TabsContent value="tujuan">
            <Card>
              <CardHeader>
                <CardTitle>Tujuan & Makna Persembahan</CardTitle>
                <CardDescription>
                  Memahami arti dan tujuan persembahan dalam kehidupan bergereja
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">1. Mendukung Pelayanan Gereja</h4>
                    <p className="text-muted-foreground">
                      Persembahan digunakan untuk mendukung berbagai pelayanan gereja, termasuk:
                    </p>
                    <ul className="list-disc list-inside mt-2 text-muted-foreground">
                      <li>Pemeliharaan tempat ibadah</li>
                      <li>Program-program pelayanan jemaat</li>
                      <li>Dukungan untuk pelayanan sosial</li>
                      <li>Pengembangan fasilitas gereja</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">2. Wujud Partisipasi Jemaat</h4>
                    <p className="text-muted-foreground">
                      Melalui persembahan, jemaat berpartisipasi aktif dalam:
                    </p>
                    <ul className="list-disc list-inside mt-2 text-muted-foreground">
                      <li>Pembangunan kehidupan bergereja</li>
                      <li>Pelayanan kepada sesama</li>
                      <li>Perwujudan kasih kepada Tuhan</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">3. Ungkapan Syukur</h4>
                    <p className="text-muted-foreground">
                      Persembahan adalah ungkapan syukur atas berkat Tuhan yang telah diterima, 
                      dan kesadaran bahwa segala yang kita miliki adalah pemberian Tuhan.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
