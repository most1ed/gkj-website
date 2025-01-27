import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";

// Data komisi
const komisiData = [
  {
    id: 1,
    nama: "Komisi Anak",
    deskripsi: "Melayani anak-anak dalam pertumbuhan iman melalui Sekolah Minggu dan kegiatan rohani lainnya.",
    kegiatan: ["Sekolah Minggu", "Retreat Anak", "Paduan Suara Anak"],
    jadwal: "Minggu, 08.00 WIB",
    kontak: "komisi.anak@gkj.org"
  },
  {
    id: 2,
    nama: "Komisi Pemuda & Remaja",
    deskripsi: "Membina dan mendampingi pemuda-remaja dalam pertumbuhan iman dan pelayanan.",
    kegiatan: ["Persekutuan Pemuda", "Retreat Pemuda", "Band Pemuda"],
    jadwal: "Sabtu, 17.00 WIB",
    kontak: "komisi.pemuda@gkj.org"
  },
  {
    id: 3,
    nama: "Komisi Musik & Ibadah",
    deskripsi: "Mendukung peribadahan melalui pelayanan musik dan pengembangan liturgi.",
    kegiatan: ["Paduan Suara", "Musik Pengiring", "Pelatihan Musik"],
    jadwal: "Latihan: Jumat, 19.00 WIB",
    kontak: "musik@gkj.org"
  },
  {
    id: 4,
    nama: "Komisi Diakonia",
    deskripsi: "Melayani kebutuhan sosial jemaat dan masyarakat sekitar.",
    kegiatan: ["Bantuan Sosial", "Kunjungan Jemaat", "Pelayanan Kesehatan"],
    jadwal: "Sesuai Program",
    kontak: "diakonia@gkj.org"
  },
  {
    id: 5,
    nama: "Komisi Pembinaan Warga Gereja",
    deskripsi: "Membina dan mendampingi pertumbuhan rohani warga gereja.",
    kegiatan: ["Katekisasi", "Pembinaan Pranikah", "Kelompok Tumbuh Bersama"],
    jadwal: "Sesuai Program",
    kontak: "pwg@gkj.org"
  },
  {
    id: 6,
    nama: "Komisi Multimedia",
    deskripsi: "Mendukung pelayanan gereja melalui teknologi dan multimedia.",
    kegiatan: ["Live Streaming", "Dokumentasi", "Sosial Media"],
    jadwal: "Sesuai Kebutuhan",
    kontak: "multimedia@gkj.org"
  }
];

// Data kegiatan pelayanan
const kegiatanPelayanan = [
  {
    id: 1,
    nama: "Persekutuan Doa",
    deskripsi: "Doa bersama untuk mendoakan pergumulan jemaat dan gereja",
    jadwal: "Rabu, 19.00 WIB",
    lokasi: "Ruang Ibadah Utama"
  },
  {
    id: 2,
    nama: "Pelayanan Pastoral",
    deskripsi: "Konseling dan pendampingan pastoral untuk jemaat",
    jadwal: "Dengan Perjanjian",
    lokasi: "Ruang Konseling"
  },
  {
    id: 3,
    nama: "Kelompok Tumbuh Bersama",
    deskripsi: "Kelompok kecil untuk pembinaan dan persekutuan",
    jadwal: "Mingguan sesuai kelompok",
    lokasi: "Rumah Jemaat"
  }
];

export default function Ministries() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-[980px] mx-auto">
        <div className="flex flex-col items-start gap-2">
          <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl mb-2">
            Pelayanan
          </h1>
          <p className="text-lg text-muted-foreground">
            Berbagai pelayanan dan komisi di GKJ untuk melayani jemaat dan masyarakat.
          </p>
        </div>

        <Tabs defaultValue="komisi" className="mt-8">
          <TabsList>
            <TabsTrigger value="komisi">Komisi & Bidang</TabsTrigger>
            <TabsTrigger value="kegiatan">Kegiatan Pelayanan</TabsTrigger>
            <TabsTrigger value="pendaftaran">Pendaftaran</TabsTrigger>
          </TabsList>

          {/* Tab Komisi & Bidang */}
          <TabsContent value="komisi" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              {komisiData.map((komisi) => (
                <Card key={komisi.id}>
                  <CardHeader>
                    <CardTitle>{komisi.nama}</CardTitle>
                    <CardDescription>{komisi.deskripsi}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Kegiatan:</h4>
                        <ul className="list-disc list-inside text-sm text-muted-foreground">
                          {komisi.kegiatan.map((kegiatan, idx) => (
                            <li key={idx}>{kegiatan}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="text-sm">
                        <p><span className="font-medium">Jadwal:</span> {komisi.jadwal}</p>
                        <p><span className="font-medium">Kontak:</span> {komisi.kontak}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tab Kegiatan Pelayanan */}
          <TabsContent value="kegiatan" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              {kegiatanPelayanan.map((kegiatan) => (
                <Card key={kegiatan.id}>
                  <CardHeader>
                    <CardTitle>{kegiatan.nama}</CardTitle>
                    <CardDescription>{kegiatan.deskripsi}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Jadwal:</span> {kegiatan.jadwal}</p>
                      <p><span className="font-medium">Lokasi:</span> {kegiatan.lokasi}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tab Pendaftaran */}
          <TabsContent value="pendaftaran" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Pendaftaran Pelayanan</CardTitle>
                <CardDescription>
                  Daftarkan diri Anda untuk terlibat dalam pelayanan sesuai dengan talenta dan panggilan Anda.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Untuk mendaftar sebagai pelayan di salah satu komisi atau kegiatan pelayanan,
                    silakan hubungi sekretariat gereja atau kirim email ke sekretariat@gkj.org
                  </p>
                  <div className="space-y-2">
                    <h4 className="font-medium">Persyaratan umum:</h4>
                    <ul className="list-disc list-inside text-sm text-muted-foreground">
                      <li>Memiliki kerinduan untuk melayani Tuhan</li>
                      <li>Bersedia mengikuti pembinaan dan pelatihan</li>
                      <li>Memiliki komitmen untuk melayani</li>
                      <li>Mengisi formulir pendaftaran</li>
                    </ul>
                  </div>
                  <Button>
                    Formulir Pendaftaran
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
