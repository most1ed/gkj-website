export interface WartaJemaat {
  title: string;
  content: string;
  priority: 'high' | 'normal';
}

export interface JadwalIbadah {
  tanggal: string;
  waktu: string;
  pelayan: string;
  tempat: string;
}

export interface PelayanKebaktian {
  jabatan: string;
  nama: string;
}

export interface JadwalPelayan {
  tanggal: string;
  koordinator: string;
  pelayanFirman: string;
  pendamping: string;
  penyambutJemaat: string;
  pemusikCantoria: string;
  pengisiPujian: string;
  pewarta: string;
  liturgos: string;
  multimedia: string;
  majelisPiket: string;
}

export interface JurnalKebaktian {
  tanggal: string;
  daftarLagu: string[];
  bacaanAlkitab: string;
  kalenderGerejawi: string;
  warnaLiturgis: string;
}

export interface JadwalSekolahMinggu {
  tanggal: string;
  pelayanFirman: string;
}

export interface JadwalPemudaRemaja {
  tanggal: string;
  pemusik: string;
  pemandu: string;
  pelayanFirman: string;
}

export interface UlangTahunJemaat {
  nama: string;
  tanggal: string;
}

export interface DukunganDoa {
  nama: string;
  wilayah?: string;
  alasan: string;
  kategori: 'sakit' | 'pemulihan' | 'umum';
}

export interface PersembahanKhusus {
  dari: string;
  bentuk: string;
  jumlah?: string;
  keterangan?: string;
}

export interface TataIbadah {
  nama: string;
  bagian: {
    nama: string;
    isi?: string;
    pelaksana?: string;
    nyanyian?: {
      judul: string;
      kode: string;
      refrein?: string;
      bait: Array<{
        nomor: number;
        isi: string;
      }>;
    };
  }[];
}

export interface WartaGereja {
  tanggal: string;
  sambutan: string;
  ibadahMingguIni: string;
  jadwalPelayan: JadwalPelayan[];
  jurnalKebaktian: JurnalKebaktian[];
  jadwalSekolahMinggu: JadwalSekolahMinggu[];
  jadwalPemudaRemaja: JadwalPemudaRemaja[];
  penghaturanPersembahan: string[];
  pelayananSakramenPerjamuan?: {
    tanggal: string;
    keterangan: string;
  };
  persiapanSakramenPerjamuan?: {
    majelis: {
      tanggal: string;
      tempat: string;
    };
    jemaat: Array<{
      tanggal: string;
      waktu: string;
      keterangan?: string;
    }>;
  };
  sidangMajelis?: {
    tanggal: string;
    tempat: string;
    keterangan: string;
  };
  ulangTahunJemaat: UlangTahunJemaat[];
  persembahanKhusus: PersembahanKhusus[];
  dukunganDoa: DukunganDoa[];
  tataIbadah: TataIbadah;
}
