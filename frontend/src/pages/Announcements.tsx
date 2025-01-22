import { useState } from 'react';
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { Calendar, Users, Church, GraduationCap, ScrollText, Heart, Globe, Hands, Flag, Gift, CreditCard, PiggyBank, School, Users2 } from "lucide-react"

const wartaData = {
  ibadahMinggu: {
    tanggal: "28 Januari 2024",
    pelayan: "Pdt. Samuel Agus Santoso",
    pengiring: "Keluarga Bp. Victor Emanuel",
    jenis: "Minggu Biasa",
    liturgi: {
      votum: "Pertolongan kita adalah dalam nama TUHAN yang menjadikan langit dan bumi",
      salam: "Kasih karunia dan damai sejahtera dari Allah, Bapa kita, dan dari Tuhan Yesus Kristus, menyertai saudara sekalian.",
      pengakuanDosa: {
        pendeta: "Dengan rendah hati, marilah kita mengaku dosa-dosa kita di hadapan Allah:",
        jemaat: "Ya Allah Bapa yang Mahakudus, kami mengaku bahwa kami telah berdosa di dalam pikiran, perkataan, dan perbuatan. Kami kurang mengasihi Engkau dan sesama kami. Ampunilah dosa kami dan baharuilah hidup kami, agar kami layak menjadi anak-anakMu dan dapat melayani Engkau dalam hidup kami. Demi Yesus Kristus, Tuhan dan Juruselamat kami. Amin."
      },
      beritaAnugerah: {
        ayat: "1 Yohanes 1:9",
        isi: "Jika kita mengaku dosa kita, maka Ia adalah setia dan adil, sehingga Ia akan mengampuni segala dosa kita dan menyucikan kita dari segala kejahatan."
      },
      petunjukHidup: {
        ayat: "Matius 22:37-39",
        isi: "Kasihilah Tuhan, Allahmu, dengan segenap hatimu dan dengan segenap jiwamu dan dengan segenap akal budimu. Itulah hukum yang terutama dan yang pertama. Dan hukum yang kedua, yang sama dengan itu, ialah: Kasihilah sesamamu manusia seperti dirimu sendiri."
      },
      persembahanPuji: [
        { judul: "KJ 4 - Hai Mari Sembah", ayat: "1-2" },
        { judul: "PKJ 14 - Kunyanyikan Kasih Setia Tuhan", ayat: "1,3" },
        { judul: "KJ 393 - Tuhan, Betapa Banyaknya", ayat: "1-3" }
      ],
      doa: {
        syafaat: "Mari kita naikkan doa syafaat kita...",
        penutup: "Ya Bapa, dengarkanlah doa kami. Dalam nama Tuhan Yesus Kristus kami berdoa. Amin."
      },
      khotbah: {
        tema: "Hidup dalam Kasih Kristus",
        bacaan: "Efesus 5:1-2",
        pembacaan: "Sebab itu jadilah penurut-penurut Allah, seperti anak-anak yang kekasih dan hiduplah di dalam kasih, sebagaimana Kristus Yesus juga telah mengasihi kamu dan telah menyerahkan diri-Nya untuk kita sebagai persembahan dan korban yang harum bagi Allah."
      },
      pengakuanIman: {
        pendeta: "Bersama dengan umat Allah di segala abad dan tempat, marilah kita mengikrarkan pengakuan iman kita menurut Pengakuan Iman Rasuli:",
        jemaat: "Aku percaya kepada Allah Bapa yang Mahakuasa, Khalik langit dan bumi..."
      },
      berkat: "Tuhan memberkati engkau dan melindungi engkau; Tuhan menyinari engkau dengan wajah-Nya dan memberi engkau kasih karunia; Tuhan menghadapkan wajah-Nya kepadamu dan memberi engkau damai sejahtera."
    }
  },
  jadwalPelayan: [
    {
      tanggal: "26 Januari 2025",
      pelayan: {
        koordinator: "Pnt. Joko Mulyono",
        pelayanFirman: "Pdt. Lusindo Tobing (GKJ Nehemia)",
        pendamping: "Dkn. Bambang Prakoso",
        penyambutJemaat: "Pnt. Yidi Rengganis",
        pemusik: "Pudjo – Eko & Dina",
        pengisiPujian: "Kel. Victor Emanuel",
        pewarta: "Pnt. Rinto Hadi",
        liturgos: "Dkn. Yehezkiel Panji",
        multimedia: "Tim Multimedia",
        majelisPiket: "Pnt. Andreas Dhanu"
      },
      bacaanAlkitab: "Lukas 4:14-21",
      kalenderGerejawi: "Minggu Biasa II",
      warnaLiturgis: "Hijau"
    },
    {
      tanggal: "2 Februari 2025",
      pelayan: {
        koordinator: "Pnt. Rinto Hadi",
        pelayanFirman: "Pdt. Wurihanto Handoyo Adi",
        pendamping: "Pnt. Kristianto Nugroho",
        penyambutJemaat: "Pnt. Pudyastuti Sardjono",
        pemusik: "Hari &Yuli – Andreas & Desyana",
        pengisiPujian: "Sekolah Minggu",
        pewarta: "Dkn. Yehezkiel Panji",
        liturgos: "Pnt. Yidi Rengganis",
        multimedia: "Tim Multimedia",
        majelisPiket: "Dkn. Adiyana Esti"
      },
      bacaanAlkitab: "Lukas 4:21-30",
      kalenderGerejawi: "Minggu Biasa III",
      warnaLiturgis: "Hijau"
    }
  ],
  jadwalIbadahLain: {
    sekolahMinggu: [
      {
        tanggal: "26 Januari 2025",
        pelayanFirman: "Sdri. Adiyana Dwi"
      }
    ],
    pemudaRemaja: [
      {
        tanggal: "26 Januari 2025",
        pemusik: "Sdri. Lidya",
        pemandu: "Sdri. Moreen",
        pelayanFirman: "Alex Nanlohy"
      }
    ]
  },
  persembahan: {
    mingguan: {
      periode: "11 s.d. 17 Januari 2025",
      data: [
        {
          tanggal: "12 Januari 2025",
          wilayah: "Mingguan/Bulan",
          jumlah: 3160000
        }
      ],
      total: 3160000
    },
    bulanan: {
      periode: "11 s.d. 17 Januari 2025",
      data: [
        {
          nomor: 1,
          unit: "W1",
          tanggal: "12 Januari 2025",
          bulan: "Januari",
          jumlah: 300000
        },
        {
          nomor: 2,
          unit: "W1",
          tanggal: "12 Januari 2025",
          bulan: "Januari",
          jumlah: 200000
        },
        {
          nomor: 3,
          unit: "W2",
          tanggal: "12 Januari 2025",
          bulan: "Januari",
          jumlah: 5000000
        }
      ],
      total: 5500000
    },
    phbp: {
      periode: "11 s.d. 17 Januari 2025",
      data: [
        {
          nomor: 1,
          tanggal: "12 Januari 2025",
          wilayah: "Minggu, 12 Januari 2025",
          jumlah: 1255000
        },
        {
          nomor: 2,
          tanggal: "12 Januari 2025",
          wilayah: "Wilayah 2",
          jumlah: 350000
        }
      ],
      total: 1605000
    },
    sidi: {
      periode: "Per 12 Januari 2025",
      data: [
        {
          nomor: 1,
          tanggal: "12 Januari 2025",
          jenis: "Persembahan Khusus Sidi (Bokor)",
          jumlah: 3462000
        }
      ],
      total: 3462000
    },
    smPemuda: {
      data: [
        {
          nomor: 1,
          tanggal: "12 Januari 2025",
          ibadah: "Kebaktian Anak SM",
          jumlah: 279000
        },
        {
          nomor: 2,
          tanggal: "12 Januari 2025",
          ibadah: "Kebaktian Pemuda-Remaja",
          jumlah: 255000
        }
      ],
      total: 534000
    },
    khusus: [
      {
        item: "Seperangkat sarana kebersihan (sapu, alat pel)",
        dari: "PT Kereta Api Indonesia (PT KAI)"
      },
      {
        nominal: 7000000,
        dari: "PT KAI",
        keterangan: "bantuan peringatan Natal"
      },
      {
        nominal: 5000000,
        dari: "salah seorang warga Wilayah 1"
      }
    ]
  },
  sakramenPerjamuan: {
    tanggal: "2 Februari 2025",
    keterangan: "Diperuntukkan bagi warga gereja dewasa yang sudah melakukan pengujian dirinya",
    persiapan: {
      majelis: {
        tanggal: "19 Januari 2025",
        tempat: "Konsisturi"
      },
      jemaat: [
        {
          tanggal: "24 Januari 2025",
          waktu: "19.00 WIB",
          tempat: "via Zoom"
        },
        {
          tanggal: "31 Januari 2025",
          waktu: "19.00 WIB",
          tempat: "via Zoom"
        }
      ]
    }
  },
  sidangMajelis: {
    tanggal: "19 Januari 2025",
    tempat: "Ruang Konsisturi",
    email: "gkjgrogol@yahoo.com"
  },
  dukunganDoa: {
    kesehatan: [
      "Bp. Nuryono",
      "Ibu Yohana Saragih",
      "Ibu Hadminingtyas (Kakak dari Ibu Retno Bambang)",
      "Bp. Pdt. Wurihanto Handoyo Adi"
    ],
    pemulihan: [
      "Ibu Sulastri SW Soebroto",
      "Bp. Isaskar",
      "Ibu Tulus (ibunda dari Ibu Kristina Kusdarwati)",
      "Sdri. Vernar Ardiyani (keponakan Ibu Pnt. Pudyastuti Sardjono)",
      "Ibu Susetyorini Wurihanto",
      "Ibu Suyoto",
      "Ibu Mintarsih Rini Andweni",
      "Bp. Pnt. Joko Mulyono"
    ],
    pergumulan: [
      "Bangsa dan negara Indonesia",
      "Pergumulan Warga Gereja",
      "Perdamaian dunia"
    ]
  },
  ulangTahun: [
    { nama: "Ibu Tuminah Djatomo Djahudi", tanggal: "01 Januari", wilayah: "1" },
    { nama: "Sdr. Ferry Isnu Wijaya", tanggal: "01 Januari", wilayah: "3" },
    { nama: "Ibu Etika Sarumaha", tanggal: "03 Januari", wilayah: "2" },
    { nama: "Bp. Naftali Partogi Radjagukguk", tanggal: "04 Januari", wilayah: "4" },
    { nama: "Ibu Rivanti Katrinia Adiyani", tanggal: "04 Januari", wilayah: "1" },
    { nama: "Sdri. Adiyana Dwi Fahmi", tanggal: "10 Januari", wilayah: "5" },
    { nama: "Bp. Benny Posma Manurung", tanggal: "13 Januari", wilayah: "2" },
    { nama: "Sdr. Dwinanda Agung Kristianto", tanggal: "15 Januari", wilayah: "3" },
    { nama: "Bp. Priyatno Saroso", tanggal: "18 Januari", wilayah: "4" },
    { nama: "Alvaro Christiaji Duma", tanggal: "21 Januari", wilayah: "1" },
    { nama: "Ibu Rusmini Ekowati", tanggal: "23 Januari", wilayah: "5" },
    { nama: "Bp. Dkn. Yehezkiel Panji Pamungkas", tanggal: "23 Januari", wilayah: "2" },
    { nama: "Bp. Toto Pangabdiyono", tanggal: "25 Januari", wilayah: "3" },
    { nama: "Sdri. Asnawati Nehe", tanggal: "26 Januari", wilayah: "4" },
    { nama: "Ibu Kristina Kusdarwati", tanggal: "28 Januari", wilayah: "1" },
    { nama: "Bp. Krisnawan Putra", tanggal: "29 Januari", wilayah: "5" },
    { nama: "Bp. Riyadi Budi Purwanto", tanggal: "30 Januari", wilayah: "2" },
    { nama: "Bp. Tonny Angianto", tanggal: "31 Januari", wilayah: "3" }
  ]
};

export default function Announcements() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('ibadah');

  return (
    <div className="container mx-auto py-6">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold tracking-tight">Warta Jemaat</h2>
          <div className="flex gap-2">
            <Input
              placeholder="Cari warta..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64"
            />
          </div>
        </div>

        <Tabs defaultValue="ibadah" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 lg:grid-cols-6 w-full">
            <TabsTrigger value="ibadah">Ibadah</TabsTrigger>
            <TabsTrigger value="jadwal">Jadwal Pelayan</TabsTrigger>
            <TabsTrigger value="persembahan">Persembahan</TabsTrigger>
            <TabsTrigger value="doa">Dukungan Doa</TabsTrigger>
            <TabsTrigger value="ultah">Ulang Tahun</TabsTrigger>
            <TabsTrigger value="khusus">Warta Khusus</TabsTrigger>
          </TabsList>

          <TabsContent value="ibadah" className="mt-6">
            <div className="space-y-8">
              {/* Informasi Ibadah */}
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Informasi Ibadah Minggu</h3>
                      <div className="space-y-2">
                        <p><span className="font-medium">Tanggal:</span> {wartaData.ibadahMinggu.tanggal}</p>
                        <p><span className="font-medium">Pelayan:</span> {wartaData.ibadahMinggu.pelayan}</p>
                        <p><span className="font-medium">Pengiring:</span> {wartaData.ibadahMinggu.pengiring}</p>
                        <p><span className="font-medium">Jenis:</span> {wartaData.ibadahMinggu.jenis}</p>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold mb-4">Tata Ibadah Minggu</h3>
                  
                  {/* Votum & Salam */}
                  <div className="space-y-4 mb-8">
                    <div className="space-y-2">
                      <h4 className="font-medium text-primary">Votum</h4>
                      <p className="pl-4 border-l-2 border-primary italic">
                        {wartaData.ibadahMinggu.liturgi.votum}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium text-primary">Salam</h4>
                      <p className="pl-4 border-l-2 border-primary italic">
                        {wartaData.ibadahMinggu.liturgi.salam}
                      </p>
                    </div>
                  </div>

                  {/* Pengakuan Dosa */}
                  <div className="space-y-4 mb-8">
                    <h4 className="font-medium text-primary">Pengakuan Dosa</h4>
                    <div className="space-y-2 pl-4">
                      <p className="font-medium">Pendeta:</p>
                      <p className="italic">{wartaData.ibadahMinggu.liturgi.pengakuanDosa.pendeta}</p>
                      <p className="font-medium mt-4">Jemaat:</p>
                      <p className="italic bg-muted/50 p-4 rounded-md">
                        {wartaData.ibadahMinggu.liturgi.pengakuanDosa.jemaat}
                      </p>
                    </div>
                  </div>

                  {/* Berita Anugerah */}
                  <div className="space-y-4 mb-8">
                    <h4 className="font-medium text-primary">Berita Anugerah</h4>
                    <div className="pl-4 border-l-2 border-primary">
                      <p className="font-medium">{wartaData.ibadahMinggu.liturgi.beritaAnugerah.ayat}</p>
                      <p className="italic mt-2">{wartaData.ibadahMinggu.liturgi.beritaAnugerah.isi}</p>
                    </div>
                  </div>

                  {/* Petunjuk Hidup Baru */}
                  <div className="space-y-4 mb-8">
                    <h4 className="font-medium text-primary">Petunjuk Hidup Baru</h4>
                    <div className="pl-4 border-l-2 border-primary">
                      <p className="font-medium">{wartaData.ibadahMinggu.liturgi.petunjukHidup.ayat}</p>
                      <p className="italic mt-2">{wartaData.ibadahMinggu.liturgi.petunjukHidup.isi}</p>
                    </div>
                  </div>

                  {/* Persembahan Puji */}
                  <div className="space-y-4 mb-8">
                    <h4 className="font-medium text-primary">Persembahan Puji</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {wartaData.ibadahMinggu.liturgi.persembahanPuji.map((lagu, index) => (
                        <div key={index} className="p-4 bg-muted rounded-lg">
                          <p className="font-medium">{lagu.judul}</p>
                          <p className="text-sm text-muted-foreground">Ayat: {lagu.ayat}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Khotbah */}
                  <div className="space-y-4 mb-8">
                    <h4 className="font-medium text-primary">Khotbah</h4>
                    <div className="p-4 bg-primary/10 rounded-lg space-y-3">
                      <div>
                        <p className="font-medium">Tema:</p>
                        <p className="text-lg">{wartaData.ibadahMinggu.liturgi.khotbah.tema}</p>
                      </div>
                      <div>
                        <p className="font-medium">Bacaan: {wartaData.ibadahMinggu.liturgi.khotbah.bacaan}</p>
                        <p className="italic mt-2">{wartaData.ibadahMinggu.liturgi.khotbah.pembacaan}</p>
                      </div>
                    </div>
                  </div>

                  {/* Doa */}
                  <div className="space-y-4 mb-8">
                    <h4 className="font-medium text-primary">Doa</h4>
                    <div className="space-y-4 pl-4">
                      <div>
                        <p className="font-medium">Doa Syafaat</p>
                        <p className="italic">{wartaData.ibadahMinggu.liturgi.doa.syafaat}</p>
                      </div>
                      <div>
                        <p className="font-medium">Doa Penutup</p>
                        <p className="italic">{wartaData.ibadahMinggu.liturgi.doa.penutup}</p>
                      </div>
                    </div>
                  </div>

                  {/* Pengakuan Iman */}
                  <div className="space-y-4 mb-8">
                    <h4 className="font-medium text-primary">Pengakuan Iman</h4>
                    <div className="space-y-4 pl-4">
                      <p className="font-medium">Pendeta:</p>
                      <p className="italic">{wartaData.ibadahMinggu.liturgi.pengakuanIman.pendeta}</p>
                      <p className="font-medium">Jemaat:</p>
                      <p className="italic bg-muted/50 p-4 rounded-md">
                        {wartaData.ibadahMinggu.liturgi.pengakuanIman.jemaat}
                      </p>
                    </div>
                  </div>

                  {/* Berkat */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-primary">Berkat</h4>
                    <p className="pl-4 border-l-2 border-primary italic">
                      {wartaData.ibadahMinggu.liturgi.berkat}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="jadwal" className="mt-6">
            <h3 className="text-lg font-bold mb-4">Jadwal Pelayan Kebaktian Minggu</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Tugas</th>
                    <th className="text-left p-2">{wartaData.jadwalPelayan[0].tanggal}</th>
                    <th className="text-left p-2">{wartaData.jadwalPelayan[1].tanggal}</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(wartaData.jadwalPelayan[0].pelayan).map((key) => (
                    <tr key={key} className="border-b">
                      <td className="p-2 font-medium">{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</td>
                      <td className="p-2">{wartaData.jadwalPelayan[0].pelayan[key]}</td>
                      <td className="p-2">{wartaData.jadwalPelayan[1].pelayan[key]}</td>
                    </tr>
                  ))}
                  <tr className="border-b bg-muted/50">
                    <td className="p-2 font-medium">Bacaan Alkitab</td>
                    <td className="p-2">{wartaData.jadwalPelayan[0].bacaanAlkitab}</td>
                    <td className="p-2">{wartaData.jadwalPelayan[1].bacaanAlkitab}</td>
                  </tr>
                  <tr className="border-b bg-muted/50">
                    <td className="p-2 font-medium">Kalender Gerejawi</td>
                    <td className="p-2">{wartaData.jadwalPelayan[0].kalenderGerejawi}</td>
                    <td className="p-2">{wartaData.jadwalPelayan[1].kalenderGerejawi}</td>
                  </tr>
                  <tr className="border-b bg-muted/50">
                    <td className="p-2 font-medium">Warna Liturgis</td>
                    <td className="p-2">{wartaData.jadwalPelayan[0].warnaLiturgis}</td>
                    <td className="p-2">{wartaData.jadwalPelayan[1].warnaLiturgis}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-bold mt-8 mb-4">Jurnal Kebaktian</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Lagu</th>
                    <th className="text-left p-2">{wartaData.jadwalPelayan[0].tanggal}</th>
                    <th className="text-left p-2">{wartaData.jadwalPelayan[1].tanggal}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-2 font-medium">Lagu 1</td>
                    <td className="p-2">NKB 3:1-2</td>
                    <td className="p-2">PKJ 4</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-medium">Lagu 2</td>
                    <td className="p-2">KJ 46:1-2</td>
                    <td className="p-2">PKJ 3</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-medium">Lagu 3</td>
                    <td className="p-2">KJ 32:1, 3</td>
                    <td className="p-2">PKJ 37:1-2</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-medium">Lagu 4</td>
                    <td className="p-2">KJ 383:1,3</td>
                    <td className="p-2">PKJ 200</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-medium">Lagu 5</td>
                    <td className="p-2">KJ 290</td>
                    <td className="p-2">PKJ 146</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-medium">Lagu 6</td>
                    <td className="p-2">KJ 425:1-2</td>
                    <td className="p-2">PKJ 281:1-3</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="persembahan" className="mt-6">
            <div className="space-y-8">
              {/* Highlight Total Card */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="rounded-lg bg-primary/10 p-6 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Gift className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">Persembahan Mingguan</h3>
                    </div>
                    <span className="text-2xl font-bold">
                      {wartaData.persembahan.mingguan.total.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">Periode {wartaData.persembahan.mingguan.periode}</p>
                </div>

                <div className="rounded-lg bg-primary/10 p-6 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CreditCard className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">Persembahan Bulanan</h3>
                    </div>
                    <span className="text-2xl font-bold">
                      {wartaData.persembahan.bulanan.total.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">Periode {wartaData.persembahan.bulanan.periode}</p>
                </div>

                <div className="rounded-lg bg-primary/10 p-6 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <PiggyBank className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">Persembahan PHBP</h3>
                    </div>
                    <span className="text-2xl font-bold">
                      {wartaData.persembahan.phbp.total.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">Periode {wartaData.persembahan.phbp.periode}</p>
                </div>
              </div>

              {/* Persembahan Khusus */}
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Gift className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">Persembahan Khusus</h3>
                  </div>
                  <div className="space-y-4">
                    {wartaData.persembahan.khusus.map((item, index) => (
                      <div key={index} className="flex items-start space-x-4 p-4 bg-muted rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium">
                            {item.nominal 
                              ? `Rp ${item.nominal.toLocaleString()},-`
                              : item.item
                            }
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Dari: {item.dari}
                            {item.keterangan && ` (${item.keterangan})`}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Persembahan Lainnya */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <School className="h-5 w-5 text-primary" />
                      <h3 className="text-lg font-semibold">Persembahan Sidi</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                        <div>
                          <p className="font-medium">{wartaData.persembahan.sidi.data[0].jenis}</p>
                          <p className="text-sm text-muted-foreground">{wartaData.persembahan.sidi.periode}</p>
                        </div>
                        <span className="text-lg font-bold">
                          Rp {wartaData.persembahan.sidi.total.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <Users2 className="h-5 w-5 text-primary" />
                      <h3 className="text-lg font-semibold">Persembahan SM & Pemuda</h3>
                    </div>
                    <div className="space-y-3">
                      {wartaData.persembahan.smPemuda.data.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-md">
                          <div>
                            <p className="font-medium">{item.ibadah}</p>
                            <p className="text-sm text-muted-foreground">{item.tanggal}</p>
                          </div>
                          <span className="font-bold">
                            Rp {item.jumlah.toLocaleString()}
                          </span>
                        </div>
                      ))}
                      <div className="flex items-center justify-between p-3 bg-primary/10 rounded-md">
                        <p className="font-bold">Total</p>
                        <span className="font-bold">
                          Rp {wartaData.persembahan.smPemuda.total.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Detail Tables */}
              <div className="space-y-6">
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <Gift className="h-5 w-5 text-primary" />
                        <h3 className="text-lg font-semibold">Detail Persembahan Mingguan & Bulanan</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Periode {wartaData.persembahan.mingguan.periode}</p>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-muted">
                          <tr>
                            <th className="text-left p-2">Tanggal</th>
                            <th className="text-left p-2">Jenis</th>
                            <th className="text-left p-2">Wilayah/Unit</th>
                            <th className="text-right p-2">Jumlah (Rp)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* Mingguan */}
                          {wartaData.persembahan.mingguan.data.map((item, index) => (
                            <tr key={`mingguan-${index}`} className="border-b">
                              <td className="p-2">{item.tanggal}</td>
                              <td className="p-2">Mingguan</td>
                              <td className="p-2">{item.wilayah}</td>
                              <td className="p-2 text-right">{item.jumlah.toLocaleString()}</td>
                            </tr>
                          ))}
                          {/* Bulanan */}
                          {wartaData.persembahan.bulanan.data.map((item, index) => (
                            <tr key={`bulanan-${index}`} className="border-b">
                              <td className="p-2">{item.tanggal}</td>
                              <td className="p-2">Bulanan</td>
                              <td className="p-2">{item.unit}</td>
                              <td className="p-2 text-right">{item.jumlah.toLocaleString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="doa" className="mt-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Kesehatan */}
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <Heart className="h-5 w-5 text-red-500" />
                      <h3 className="text-lg font-semibold">Kesehatan</h3>
                    </div>
                    <div className="space-y-3">
                      {wartaData.dukunganDoa.kesehatan.map((item, index) => (
                        <div key={index} className="p-3 bg-muted rounded-md">
                          <p className="font-medium">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Pemulihan */}
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <Hands className="h-5 w-5 text-emerald-500" />
                      <h3 className="text-lg font-semibold">Pemulihan</h3>
                    </div>
                    <div className="space-y-3">
                      {wartaData.dukunganDoa.pemulihan.map((item, index) => (
                        <div key={index} className="p-3 bg-muted rounded-md">
                          <p className="font-medium">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Pergumulan */}
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <Heart className="h-5 w-5 text-violet-500" />
                      <h3 className="text-lg font-semibold">Pergumulan Khusus</h3>
                    </div>
                    <div className="space-y-3">
                      {wartaData.dukunganDoa.pergumulan.map((item, index) => (
                        <div key={index} className="p-3 bg-muted rounded-md">
                          <p className="font-medium">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Doa untuk Bangsa & Gereja */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <Flag className="h-5 w-5 text-primary" />
                      <h3 className="text-lg font-semibold">Bangsa dan Negara</h3>
                    </div>
                    <div className="pl-4 border-l-2 border-primary space-y-2">
                      <p>Doakan bangsa dan negara Indonesia:</p>
                      <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                        <li>Kedamaian dan kesejahteraan bangsa</li>
                        <li>Kebijaksanaan bagi para pemimpin</li>
                        <li>Pemulihan ekonomi nasional</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <Church className="h-5 w-5 text-primary" />
                      <h3 className="text-lg font-semibold">Persekutuan Warga Gereja</h3>
                    </div>
                    <div className="pl-4 border-l-2 border-primary space-y-2">
                      <p>Doakan persekutuan warga gereja:</p>
                      <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                        <li>Pertumbuhan iman dan kasih</li>
                        <li>Pelayanan yang berdampak</li>
                        <li>Kesatuan dalam pelayanan</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Perdamaian Dunia */}
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Globe className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">Perdamaian Dunia</h3>
                  </div>
                  <div className="pl-4 border-l-2 border-primary space-y-2">
                    <p>Mari berdoa bersama untuk perdamaian dunia:</p>
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                      <li>Penyelesaian konflik di berbagai wilayah</li>
                      <li>Pemulihan hubungan antar bangsa</li>
                      <li>Kerja sama internasional dalam mengatasi krisis global</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="ultah" className="mt-6">
            <h3 className="text-lg font-bold mb-4">Warga Berulang Tahun di Bulan Januari</h3>
            <div className="max-w-2xl">
              <table className="w-full">
                <tbody>
                  {wartaData.ulangTahun.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2">{item.nama}</td>
                      <td className="py-2 text-right text-muted-foreground">Wilayah {item.wilayah}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="khusus" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="p-6">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">Sidang Majelis</h3>
                  </div>
                  <div className="mt-4 space-y-2">
                    <p>Akan diadakan pada:</p>
                    <div className="pl-4 border-l-2 border-primary">
                      <p className="font-medium">Hari/Tanggal: Minggu, 21 Januari 2025</p>
                      <p className="font-medium">Waktu: 11.30 WIB</p>
                      <p className="font-medium">Tempat: Ruang Konsistori</p>
                    </div>
                    <p className="text-muted-foreground">Diharapkan kehadiran seluruh anggota majelis.</p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="p-6">
                  <div className="flex items-center space-x-2">
                    <Church className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">Sakramen Perjamuan</h3>
                  </div>
                  <div className="mt-4 space-y-2">
                    <p>Akan dilaksanakan pada:</p>
                    <div className="pl-4 border-l-2 border-primary">
                      <p className="font-medium">Hari/Tanggal: Minggu, 28 Januari 2025</p>
                      <p className="font-medium">Waktu: 07.00 WIB</p>
                    </div>
                    <p className="text-muted-foreground">Mohon partisipasi seluruh warga jemaat yang sudah sidi.</p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="p-6">
                  <div className="flex items-center space-x-2">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">Sekolah Minggu</h3>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="pl-4 border-l-2 border-primary">
                      <p className="font-medium">Kelas Anak & Remaja</p>
                      <p>Setiap Minggu, 09.00 WIB</p>
                      <p>Ruang Sekolah Minggu</p>
                    </div>
                    <p className="text-muted-foreground">Orangtua diharapkan mendukung anak-anak untuk aktif mengikuti Sekolah Minggu.</p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="p-6">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">Pemuda-Remaja</h3>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="pl-4 border-l-2 border-primary">
                      <p className="font-medium">Ibadah & Persekutuan</p>
                      <p>Setiap Sabtu, 16.00 WIB</p>
                      <p>Ruang Pemuda</p>
                    </div>
                    <p className="text-muted-foreground">Mari bergabung dalam persekutuan dan pelayanan pemuda-remaja.</p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border bg-card text-card-foreground shadow-sm md:col-span-2">
                <div className="p-6">
                  <div className="flex items-center space-x-2">
                    <ScrollText className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">Pengumuman Lainnya</h3>
                  </div>
                  <div className="mt-4 space-y-4">
                    <div className="pl-4 border-l-2 border-primary">
                      <p className="font-medium">Pendaftaran Katekisasi</p>
                      <p>Bagi warga yang ingin mengikuti katekisasi, dapat mendaftar di kantor gereja pada jam kerja.</p>
                    </div>
                    <div className="pl-4 border-l-2 border-primary">
                      <p className="font-medium">Jadwal Paduan Suara</p>
                      <p>Latihan paduan suara setiap Jumat pukul 18.00 WIB di ruang multimedia.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
