// Tipe data untuk Warta Jemaat
export interface WartaData {
  ibadah: IbadahData;
  jadwalPelayan: JadwalPelayanData[];
  persembahan: PersembahanData;
  dukunganDoa: DukunganDoaData[];
  fellowship: FellowshipData;
  wartaKhusus: WartaKhususData[];
}

// Ibadah
export interface IbadahData {
  tanggal: string;
  waktu: string;
  tema: string;
  pengkhotbah: string;
  bacaan: string[];
  liturgi: LiturgiData;
}

export interface LiturgiData {
  votum: string;
  salam: string;
  pengakuanDosa: string;
  beritaAnugerah: string;
  petunjukHidup: string;
  persembahanPuji: string[];
  doa: string;
  khotbah: string;
  pengakuanIman: string;
  berkat: string;
}

// Jadwal Pelayan
export interface JadwalPelayanData {
  tanggal: string;
  waktu: string;
  koordinator?: string;
  pelayanFirman: string;
  pendamping?: string;
  penyambutJemaat?: string;
  pemusik: string;
  pengisiPujian: string;
  pewarta?: string;
  liturgos?: string;
  multimedia?: string;
  majelisPiket?: string;
  bacaanAlkitab?: string;
  kalenderGerejawi?: string;
  warnaLiturgis?: string;
  lagu?: string[];
}

// Persembahan
export interface PersembahanData {
  mingguan: PersembahanMingguan;
  bulanan: PersembahanBulanan;
  phbp: PersembahanPHBP;
  sidi: PersembahanSidi;
  smPemuda: PersembahanSMPemuda;
  khusus: PersembahanKhusus[];
}

export interface PersembahanMingguan {
  periode: string;
  data: {
    tanggal: string;
    wilayah: string;
    jumlah: number;
  }[];
  total: number;
}

export interface PersembahanBulanan {
  periode: string;
  data: {
    nomor: string;
    unit: string;
    tanggal: string;
    bulan: string;
    jumlah: number;
  }[];
  total: number;
}

export interface PersembahanPHBP {
  periode: string;
  data: {
    nomor: string;
    tanggal: string;
    wilayah: string;
    jumlah: number;
  }[];
  total: number;
}

export interface PersembahanSidi {
  periode: string;
  data: {
    nomor: string;
    tanggal: string;
    jenis: string;
    jumlah: number;
  }[];
  total: number;
}

export interface PersembahanSMPemuda {
  data: {
    nomor: string;
    tanggal: string;
    ibadah: string;
    jumlah: number;
  }[];
  total: number;
}

export interface PersembahanKhusus {
  item: string;
  nominal: number;
  dari: string;
  keterangan?: string;
}

// Dukungan Doa
export interface DukunganDoaData {
  nama: string;
  kondisi: string;
  wilayah?: string;
}

// Fellowship
export interface FellowshipData {
  items: {
    nama: string;
    wilayah: string;
    jenis: "Ulang Tahun" | "Pernikahan" | "Kelahiran" | "Baptis" | "Sidi";
  }[];
}

// Warta Khusus
export interface WartaKhususData {
  judul: string;
  isi: string;
  tanggal?: string;
  tempat?: string;
}
