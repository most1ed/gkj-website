import React from 'react';
import { AnimatedPage } from '@/components/ui/AnimatedWrapper';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';

export default function AnnouncementsPage() {
  return (
    <AnimatedPage>
      <div className="container mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Warta Jemaat</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Informasi terkini seputar kegiatan, pelayanan, dan pengumuman penting di GKJ Grogol Jakarta
          </p>
        </div>

        <Tabs defaultValue="ibadah" className="space-y-6">
          <TabsList className="grid grid-cols-3 lg:grid-cols-4 gap-2">
            <TabsTrigger value="ibadah">Ibadah</TabsTrigger>
            <TabsTrigger value="pelayanan">Pelayanan</TabsTrigger>
            <TabsTrigger value="sosial">Sosial</TabsTrigger>
            <TabsTrigger value="pengumuman">Pengumuman</TabsTrigger>
          </TabsList>

          <TabsContent value="ibadah">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Jadwal Ibadah</CardTitle>
                  <CardDescription>Minggu, 2 Februari 2025</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Tema: Kasih Kristus Memerdekakan</p>
                  <p>Waktu: 09:00 WIB</p>
                  <p>Liturgos: Sdr. Andreas</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Jadwal Pelayanan</CardTitle>
                  <CardDescription>Periode Februari 2025</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5">
                    <li>Musik: Tim Musik GKJ</li>
                    <li>Multimedia: Sdr. Budi</li>
                    <li>Doa Syafaat: Sdri. Maria</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="pelayanan">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Pelayanan Gereja</CardTitle>
                  <CardDescription>Bidang Pelayanan</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5">
                    <li>Koordinasi Tim Musik</li>
                    <li>Persiapan Sakramen</li>
                    <li>Pengembangan Pelayanan Anak</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Keuangan & Persembahan</CardTitle>
                  <CardDescription>Laporan Bulanan</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Total Persembahan Januari: Rp 125.000.000</p>
                  <p>Alokasi: 
                    <ul className="list-disc pl-5">
                      <li>Operasional: 50%</li>
                      <li>Misi: 30%</li>
                      <li>Sosial: 20%</li>
                    </ul>
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sosial">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Kegiatan Sosial</CardTitle>
                  <CardDescription>Februari 2025</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5">
                    <li>Bakti Sosial di Panti Asuhan</li>
                    <li>Kunjungan Lansia</li>
                    <li>Pembagian Sembako</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Dukungan Doa</CardTitle>
                  <CardDescription>Pokok Doa Jemaat</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5">
                    <li>Bpk. Sutarno - Pemulihan Kesehatan</li>
                    <li>Keluarga Alm. Ibu Hartini</li>
                    <li>Misi Penginjilan</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="pengumuman">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Pengumuman Penting</CardTitle>
                  <CardDescription>Informasi Terkini</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5">
                    <li>Persiapan HUT GKJ Grogol</li>
                    <li>Pendaftaran Sekolah Minggu</li>
                    <li>Rapat Majelis Gereja</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Warta Khusus</CardTitle>
                  <CardDescription>Informasi Eksklusif</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5">
                    <li>Laporan Tahunan 2024</li>
                    <li>Rencana Pembangunan Gedung</li>
                    <li>Program Pengembangan Jemaat</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AnimatedPage>
  );
}
