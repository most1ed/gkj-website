import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";

export function AnnouncementsSection() {
  return (
    <Tabs defaultValue="communion" className="space-y-6">
      <TabsList className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        <TabsTrigger value="communion">Perjamuan</TabsTrigger>
        <TabsTrigger value="meetings">Sidang Majelis</TabsTrigger>
        <TabsTrigger value="birthdays">Ulang Tahun</TabsTrigger>
        <TabsTrigger value="prayer">Dukungan Doa</TabsTrigger>
      </TabsList>

      {/* Communion Tab */}
      <TabsContent value="communion">
        <Card>
          <CardHeader>
            <CardTitle>Pelayanan Sakramen Perjamuan</CardTitle>
            <CardDescription>2 Februari 2025</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              <p>
                Di gereja kita, pada Kebaktian Minggu, 2 Februari 2025, akan dilayankan Sakramen Perjamuan. 
                Di GKJ Grogol Jakarta, Perjamuan adalah Sakramen yang diperuntukkan bagi warga gereja dewasa 
                yang sudah melakukan pengujian dirinya, dan belum dilayankan untuk warga anak dan simpatisan.
              </p>
              <p>
                Bila ada warga gereja atau keluarga yang karena alasan tertentu tidak dapat mengikuti Sakramen 
                Perjamuan di gereja, dipersilakan menghubungi Majelis Gereja agar dapat menerima pelayanan di 
                rumah masing-masing.
              </p>

              <h3>Persiapan Sakramen Perjamuan</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">1. Untuk Majelis</h4>
                  <p>Hari, tanggal: Minggu, 19 Januari 2025</p>
                  <p>Tempat: Konsisturi</p>
                </div>

                <div>
                  <h4 className="font-medium">2. Untuk Jemaat (Secara Daring via Zoom)</h4>
                  <div className="space-y-2">
                    <div>
                      <p>Hari, tanggal: Jumat, 24 Januari 2025</p>
                      <p>Waktu: Pukul 19.00 WIB</p>
                    </div>
                    <div>
                      <p>Dan</p>
                      <p>Hari, tanggal: Jumat, 31 Januari 2025</p>
                      <p>Waktu: Pukul 19.00 WIB</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Meetings Tab */}
      <TabsContent value="meetings">
        <Card>
          <CardHeader>
            <CardTitle>Sidang Majelis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              <p>Persidangan Majelis Pleno akan dilaksanakan pada:</p>
              <div className="space-y-1 my-4">
                <p>Hari, tanggal: Minggu, 19 Januari 2025</p>
                <p>Tempat: Ruang Konsisturi</p>
              </div>
              <p>
                Bagi jemaat yang memiliki keperluan dengan Majelis dipersilakan menyampaikan 
                melalui surat ke Kantor Gereja atau email ke gkjgrogol@yahoo.com.
              </p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Birthdays Tab */}
      <TabsContent value="birthdays">
        <Card>
          <CardHeader>
            <CardTitle>Jemaat Berulang Tahun di Bulan Januari</CardTitle>
            <CardDescription>
              Majelis dan jemaat GKJ Grogol Jakarta mengucapkan selamat ulang tahun kepada:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-2">
              <li>Ibu Tuminah Djatomo Djahudi (01 Januari)</li>
              <li>Sdr. Ferry Isnu Wijaya (01 Januari)</li>
              <li>Ibu Etika Sarumaha (03 Januari)</li>
              <li>Bp. Naftali Partogi Radjagukguk (04 Januari)</li>
              <li>Ibu Rivanti Katrinia Adiyani (04 Januari)</li>
              <li>Sdri. Adiyana Dwi Fahmi (10 Januari)</li>
              <li>Bp. Benny Posma Manurung (13 Januari)</li>
              <li>Sdr. Dwinanda Agung Kristianto (15 Januari)</li>
              <li>Bp. Priyatno Saroso (18 Januari)</li>
              <li>Alvaro Christiaji Duma (21 Januari)</li>
              <li>Ibu Rusmini Ekowati (23 Januari)</li>
              <li>Bp. Dkn. Yehezkiel Panji Pamungkas (23 Januari)</li>
              <li>Bp. Toto Pangabdiyono (25 Januari)</li>
              <li>Sdri. Asnawati Nehe (26 Januari)</li>
              <li>Ibu Kristina Kusdarwati (28 Januari)</li>
              <li>Bp. Krisnawan Putra (29 Januari)</li>
              <li>Bp. Riyadi Budi Purwanto (30 Januari)</li>
              <li>Bp. Tonny Angianto (31 Januari)</li>
            </ol>
            <p className="mt-4 text-muted-foreground">
              Apabila ada warga gereja yang berulang tahun, namun belum disebutkan namanya pada 
              daftar tersebut, Majelis memohon maaf dan mohon untuk menginformasikannya kepada 
              Majelis atau kepada pelayan kantor gereja.
            </p>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Prayer Support Tab */}
      <TabsContent value="prayer">
        <Card>
          <CardHeader>
            <CardTitle>Dukungan Doa</CardTitle>
            <CardDescription>
              Majelis mengajak segenap Warga Gereja untuk mewujudkan ikatan persekutuan yang kudus 
              dan am dengan saling mendoakan dalam doa harian pribadi maupun doa keluarga.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Saudara-saudara yang sakit/menjalani proses perawatan kesehatan:</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Bp. Nuryono</li>
                  <li>Ibu Yohana Saragih</li>
                  <li>Ibu Hadminingtyas (Kakak dari Ibu Retno Bambang)</li>
                  <li>Bp. Pdt. Wurihanto Handoyo Adi</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Saudara-saudara yang menjalani proses pemulihan:</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Ibu Sulastri SW Soebroto</li>
                  <li>Bp. Isaskar</li>
                  <li>Ibu Tulus (ibunda dari Ibu Kristina Kusdarwati)</li>
                  <li>Sdri. Vernar Ardiyani (keponakan Ibu Pnt. Pudyastuti Sardjono)</li>
                  <li>Ibu Susetyorini Wurihanto</li>
                  <li>Ibu Suyoto</li>
                  <li>Ibu Mintarsih Rini Andweni</li>
                  <li>Bp. Pnt. Joko Mulyono</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Hal-hal lain yang perlu didoakan:</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Bangsa dan negara Indonesia</li>
                  <li>Pergumulan Warga Gereja</li>
                  <li>Perdamaian dunia</li>
                </ul>
              </div>

              <p className="text-muted-foreground">
                Jemaat dapat menginformasikan kepada Majelis atau pelayan kantor gereja apabila 
                memerlukan dukungan doa.
              </p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
