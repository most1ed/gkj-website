import { WartaData } from "@/types/warta";

export const dummyWarta: WartaData = {
  sambutan: "Selamat hari Minggu dan selamat beribadah, Saudara-saudari yang dikasihi Tuhan. Kiranya ibadah hari ini menguatkan iman kita dan membawa berkat bagi kehidupan kita.",
  ibadahMingguIni: "Tema ibadah Minggu ini adalah 'Kasih yang Memulihkan' dengan nas Alkitab dari Yohanes 3:16.",
  tataIbadah: {
    bagian: [
      {
        nama: "Persiapan",
        isi: "Doa pribadi, Latihan pujian"
      },
      {
        nama: "Votum dan Salam",
        pelaksana: "Pdt. John Doe",
        isi: "Pertolongan kita adalah dalam nama Tuhan yang menjadikan langit dan bumi. Kasih karunia dan damai sejahtera dari Allah Bapa dan dari Tuhan kita Yesus Kristus menyertai saudara sekalian."
      },
      {
        nama: "Nyanyian Pembuka",
        nyanyian: {
          kode: "KJ 21",
          judul: "Hari Minggu, Hari yang Mulia",
          bait: [
            {
              nomor: 1,
              isi: "Hari Minggu, hari yang mulia, hari Tuhan yang diberkati.\nRaja Kristus bangkit dan menang,\nmenebus kita yang berdosa."
            }
          ],
          refrein: "Hari Minggu, hari yang mulia,\nHari Tuhan yang diberkati."
        }
      }
    ]
  },
  dukunganDoa: [
    {
      kategori: "sakit",
      nama: "Ibu Maria",
      wilayah: "Wilayah 2",
      alasan: "Sedang dirawat di RS Bethesda"
    },
    {
      kategori: "pemulihan",
      nama: "Bapak Yohanes",
      wilayah: "Wilayah 1",
      alasan: "Pemulihan pasca operasi"
    },
    {
      kategori: "umum",
      nama: "Keluarga Petrus",
      wilayah: "Wilayah 3",
      alasan: "Persiapan pindah rumah"
    }
  ],
  ulangTahunJemaat: [
    {
      nama: "Andreas Setiawan",
      tanggal: "15 Januari 2025",
      wilayah: "Wilayah 1"
    },
    {
      nama: "Maria Wijaya",
      tanggal: "22 Januari 2025", 
      wilayah: "Wilayah 2"
    }
  ],
  jadwalIbadah: [
    {
      waktu: "Minggu, 28 Januari 2025",
      jam: "08.00 WIB",
      tempat: "Gedung Utama GKJ",
      tema: "Kasih yang Memulihkan",
      pembicara: "Pdt. John Doe"
    },
    {
      waktu: "Minggu, 4 Februari 2025",
      jam: "09.30 WIB", 
      tempat: "Gedung Utama GKJ",
      tema: "Iman yang Teguh",
      pembicara: "Pdt. Jane Smith"
    }
  ],
  pengumuman: [
    {
      judul: "Pendaftaran Sekolah Minggu",
      deskripsi: "Pendaftaran peserta didik baru Sekolah Minggu akan dibuka mulai 1 Februari 2025.",
      tanggal: "15 Januari 2025"
    },
    {
      judul: "Kajian Alkitab Online",
      deskripsi: "Setiap Rabu malam pukul 19.30 WIB akan diadakan kajian Alkitab secara online.",
      tanggal: "20 Januari 2025"
    }
  ],
  jadwalPelayan: [
    {
      tanggal: "28 Januari 2025",
      koordinator: "Bpk. Yohanes",
      pelayanFirman: "Pdt. John Doe",
      pendamping: "Pdt. Jane Smith",
      penyambutJemaat: "Tim Pelayanan Wilayah 1",
      pemusikCantoria: "Kelompok Musik GKJ",
      pengisiPujian: "Paduan Suara GKJ",
      pewarta: "Sdri. Maria",
      liturgos: "Sdra. Andreas",
      multimedia: "Tim Multimedia",
      majelisPiket: "Majelis Wilayah 2"
    }
  ],
  jurnalKebaktian: [
    {
      tanggal: "28 Januari 2025",
      daftarLagu: [
        "KJ 21 - Hari Minggu, Hari yang Mulia",
        "NKB 45 - Kasih Kristus Menuntun Kita"
      ],
      bacaanAlkitab: "Yohanes 3:16-21",
      kalenderGerejawi: "Minggu Biasa",
      warnaLiturgis: "Hijau"
    }
  ],
  jadwalSekolahMinggu: [
    {
      tanggal: "28 Januari 2025",
      pelayanFirman: "Ibu Sarah"
    }
  ],
  jadwalPemudaRemaja: [
    {
      tanggal: "28 Januari 2025",
      pemusik: "Kelompok Musik Pemuda",
      pemandu: "Sdra. David",
      pelayanFirman: "Sdri. Rachel"
    }
  ],
  penghaturanPersembahan: [
    "Mari kita mengucap syukur kepada Tuhan atas segala berkat yang telah diberikan-Nya."
  ],
  persembahanKhusus: [
    {
      dari: "Keluarga Setiawan",
      bentuk: "Uang Tunai",
      jumlah: "Rp 1.000.000",
      keterangan: "Ucapan Syukur Ulang Tahun Pernikahan"
    }
  ]
};
