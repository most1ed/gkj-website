import { WartaData } from "@/types/warta";

export const dummyWarta: WartaData = {
  ibadah: {
    tanggal: "28 Januari 2024",
    waktu: "07:00 WIB",
    tema: "Melayani dengan Kasih",
    pengkhotbah: "Pdt. Bambang Sulistyo",
    bacaan: [
      "Yohanes 13:1-17",
      "1 Korintus 13:1-13"
    ],
    liturgi: {
      votum: "Pertolongan kita adalah dalam nama Tuhan yang menjadikan langit dan bumi",
      salam: "Kasih karunia dan damai sejahtera dari Allah, Bapa kita, dan dari Tuhan Yesus Kristus menyertai kamu",
      pengakuanDosa: "Ya Allah yang Mahakudus, kami mengaku bahwa kami telah berdosa dalam pikiran, perkataan, dan perbuatan...",
      beritaAnugerah: "Sebab karena kasih karunia kamu diselamatkan oleh iman; itu bukan hasil usahamu, tetapi pemberian Allah (Efesus 2:8)",
      petunjukHidup: "Kasihilah Tuhan, Allahmu, dengan segenap hatimu dan dengan segenap jiwamu dan dengan segenap akal budimu (Matius 22:37)",
      persembahanPuji: [
        "KJ 246 - Yesuslah Sobat yang Sejati",
        "PKJ 267 - Damai di Dunia"
      ],
      doa: "Ya Bapa yang Mahakasih, kami bersyukur atas kasih dan anugerah-Mu...",
      khotbah: "Melayani dengan kasih seperti teladan Yesus",
      pengakuanIman: "Aku percaya kepada Allah, Bapa yang Mahakuasa, Khalik langit dan bumi...",
      berkat: "Tuhan memberkati engkau dan melindungi engkau..."
    }
  },
  jadwalPelayan: [
    {
      tanggal: "28 Januari 2024",
      waktu: "07:00 WIB",
      koordinator: "Pnt. Joko Mulyono",
      pelayanFirman: "Pdt. Samuel Agus Santoso",
      pendamping: "Dkn. Bambang Prakoso",
      penyambutJemaat: "Pnt. Yidi Rengganis",
      pemusik: "Pudjo – Eko & Dina",
      pengisiPujian: "Kel. Victor Emanuel",
      pewarta: "Pnt. Rinto Hadi",
      liturgos: "Dkn. Yehezkiel Panji",
      multimedia: "Tim Multimedia",
      majelisPiket: "Pnt. Andreas Dhanu",
      bacaanAlkitab: "Lukas 4:14-21",
      kalenderGerejawi: "Minggu Biasa II",
      warnaLiturgis: "Hijau",
      lagu: [
        "KJ 4 - Hai Mari Sembah",
        "PKJ 14 - Kunyanyikan Kasih Setia Tuhan",
        "KJ 393 - Tuhan, Betapa Banyaknya"
      ]
    },
    {
      tanggal: "4 Februari 2024",
      waktu: "07:00 WIB",
      koordinator: "Pnt. Rinto Hadi",
      pelayanFirman: "Pdt. Wurihanto Handoyo Adi",
      pendamping: "Pnt. Kristianto Nugroho",
      penyambutJemaat: "Pnt. Pudyastuti Sardjono",
      pemusik: "Hari & Yuli – Andreas & Desyana",
      pengisiPujian: "Sekolah Minggu",
      pewarta: "Dkn. Yehezkiel Panji",
      liturgos: "Pnt. Yidi Rengganis",
      multimedia: "Tim Multimedia",
      majelisPiket: "Dkn. Adiyana Esti",
      bacaanAlkitab: "Lukas 4:21-30",
      kalenderGerejawi: "Minggu Biasa III",
      warnaLiturgis: "Hijau",
      lagu: [
        "KJ 21 - Hari Minggu, Hari yang Mulia",
        "PKJ 238 - Ya Tuhan, Kami Puji NamaMu",
        "KJ 426 - Kita Harus Membawa Berita"
      ]
    }
  ],
  persembahan: {
    mingguan: {
      periode: "Januari 2024",
      data: [
        {
          tanggal: "7 Jan 2024",
          wilayah: "Wilayah 1",
          jumlah: 2500000
        },
        {
          tanggal: "14 Jan 2024",
          wilayah: "Wilayah 2",
          jumlah: 3000000
        }
      ],
      total: 5500000
    },
    bulanan: {
      periode: "Januari 2024",
      data: [
        {
          nomor: "1",
          unit: "Majelis",
          tanggal: "5 Jan 2024",
          bulan: "Januari",
          jumlah: 5000000
        },
        {
          nomor: "2",
          unit: "Komisi Pemuda",
          tanggal: "12 Jan 2024",
          bulan: "Januari",
          jumlah: 2000000
        }
      ],
      total: 7000000
    },
    phbp: {
      periode: "Januari 2024",
      data: [
        {
          nomor: "1",
          tanggal: "7 Jan 2024",
          wilayah: "Wilayah 1",
          jumlah: 1500000
        },
        {
          nomor: "2",
          tanggal: "14 Jan 2024",
          wilayah: "Wilayah 2",
          jumlah: 2000000
        }
      ],
      total: 3500000
    },
    sidi: {
      periode: "Januari 2024",
      data: [
        {
          nomor: "1",
          tanggal: "21 Jan 2024",
          jenis: "Sidi Dewasa",
          jumlah: 3000000
        }
      ],
      total: 3000000
    },
    smPemuda: {
      data: [
        {
          nomor: "1",
          tanggal: "7 Jan 2024",
          ibadah: "Sekolah Minggu",
          jumlah: 500000
        },
        {
          nomor: "2",
          tanggal: "14 Jan 2024",
          ibadah: "Pemuda",
          jumlah: 750000
        }
      ],
      total: 1250000
    },
    khusus: [
      {
        item: "Pembangunan Gereja",
        nominal: 10000000,
        dari: "Keluarga Bpk. Suharto",
        keterangan: "Untuk renovasi ruang multimedia"
      },
      {
        item: "1 Set Alat Musik",
        nominal: 0,
        dari: "Kel. Ibu Maria",
        keterangan: "Untuk tim musik pemuda"
      }
    ]
  },
  dukunganDoa: [
    {
      nama: "Ibu Susanti",
      kondisi: "Pemulihan pasca operasi",
      wilayah: "1"
    },
    {
      nama: "Bpk. Rahmat",
      kondisi: "Sakit di RS Bethesda",
      wilayah: "3"
    },
    {
      nama: "Sdri. Anna",
      kondisi: "Persiapan ujian akhir",
      wilayah: "2"
    }
  ],
  ulangTahun: [
    {
      nama: "Bpk. Joko Widodo",
      wilayah: "1"
    },
    {
      nama: "Ibu Maria Kristiani",
      wilayah: "2"
    },
    {
      nama: "Sdr. Andi Wijaya",
      wilayah: "3"
    }
  ],
  wartaKhusus: [
    {
      judul: "Sidang Majelis",
      isi: "Akan diadakan Sidang Majelis untuk membahas program kerja tahun 2024.",
      tanggal: "4 Februari 2024",
      tempat: "Ruang Konsistori"
    },
    {
      judul: "Katekisasi",
      isi: "Pendaftaran katekisasi sidi dewasa telah dibuka. Bagi yang berminat dapat mendaftar di kantor gereja.",
      tanggal: "Mulai 1 Februari 2024"
    },
    {
      judul: "Pembangunan Gereja",
      isi: "Renovasi ruang multimedia akan dimulai minggu depan. Mohon dukungan doa dari seluruh jemaat."
    }
  ],
  fellowship: {
    items: [
      {
        nama: "Bpk. Joko Widodo",
        wilayah: "1",
        jenis: "Ulang Tahun"
      },
      {
        nama: "Ibu Maria Kristiani",
        wilayah: "2",
        jenis: "Ulang Tahun"
      },
      {
        nama: "Bpk. Bambang Susilo & Ibu Siti Rahayu",
        wilayah: "1",
        jenis: "Pernikahan"
      },
      {
        nama: "Gabriel Prasetyo",
        wilayah: "3",
        jenis: "Kelahiran"
      },
      {
        nama: "Sdri. Anna Maria",
        wilayah: "1",
        jenis: "Baptis"
      },
      {
        nama: "Sdri. Jessica Tanaka",
        wilayah: "3",
        jenis: "Sidi"
      }
    ]
  },
};
