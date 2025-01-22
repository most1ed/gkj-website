import { useParams, Link } from 'react-router-dom';
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { PDFButton } from "@/components/PDFButton";
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { wartaGereja } from "@/data/dummyData";

// Dummy archive data - replace with actual API call later
const archiveData = Array.from({ length: 12 }, (_, i) => {
  const date = new Date(2025, 0, 22);
  date.setMonth(date.getMonth() - i);
  return {
    id: i + 1,
    date: date,
    data: wartaGereja // Using the same data structure for demo
  };
});

export default function WartaDetail() {
  const { id } = useParams();
  const archive = archiveData.find(item => item.id === Number(id));

  if (!archive) {
    return (
      <div className="container mx-auto py-6">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Warta tidak ditemukan</h2>
          <Button asChild>
            <Link to="/arsip-warta">Kembali ke Arsip</Link>
          </Button>
        </div>
      </div>
    );
  }

  const { data } = archive;

  return (
    <div className="container mx-auto py-6">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Warta Jemaat</h2>
            <p className="text-muted-foreground">
              {format(archive.date, 'EEEE, dd MMMM yyyy', { locale: id })}
            </p>
          </div>
          <div className="space-x-2">
            <PDFButton data={data} />
            <Button variant="outline" asChild>
              <Link to="/arsip-warta">Kembali ke Arsip</Link>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="liturgi" className="space-y-4">
          <div className="overflow-x-auto">
            <TabsList className="inline-flex min-w-max w-full md:w-auto">
              <TabsTrigger value="liturgi">Liturgi</TabsTrigger>
              <TabsTrigger value="info">Informasi</TabsTrigger>
              <TabsTrigger value="jadwal">Jadwal</TabsTrigger>
              <TabsTrigger value="persembahan">Persembahan</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="liturgi">
            <Card>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">Tata Ibadah</h3>
                <div className="space-y-4">
                  {data.tataIbadah.bagian.map((bagian, index) => (
                    <div key={index} className="space-y-2">
                      <h4 className="font-semibold">{bagian.nama}</h4>
                      {bagian.pelaksana && (
                        <p className="text-sm text-muted-foreground">Pelaksana: {bagian.pelaksana}</p>
                      )}
                      {bagian.isi && (
                        <p className="text-muted-foreground whitespace-pre-line">{bagian.isi}</p>
                      )}
                      {bagian.nyanyian && (
                        <div className="space-y-2">
                          <p className="font-medium">{bagian.nyanyian.kode} - {bagian.nyanyian.judul}</p>
                          {bagian.nyanyian.bait.map((bait) => (
                            <div key={bait.nomor} className="space-y-1">
                              <p className="text-sm font-medium">Bait {bait.nomor}</p>
                              <p className="text-muted-foreground whitespace-pre-line">{bait.isi}</p>
                            </div>
                          ))}
                          {bagian.nyanyian.refrein && (
                            <div className="space-y-1">
                              <p className="text-sm font-medium">Refrein</p>
                              <p className="text-muted-foreground whitespace-pre-line">{bagian.nyanyian.refrein}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="info">
            <div className="grid gap-4">
              {/* Sambutan */}
              <Card>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Sambutan</h3>
                  <p className="text-muted-foreground whitespace-pre-line">{data.sambutan}</p>
                </div>
              </Card>

              {/* Ibadah Minggu Ini */}
              <Card>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Ibadah Minggu Ini</h3>
                  <p className="text-muted-foreground whitespace-pre-line">{data.ibadahMingguIni}</p>
                </div>
              </Card>

              {/* Dukungan Doa */}
              <Card>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Dukungan Doa</h3>
                  <div className="space-y-4">
                    {/* Sakit */}
                    {data.dukunganDoa.filter(d => d.kategori === 'sakit').length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2">Sakit</h4>
                        {data.dukunganDoa
                          .filter(d => d.kategori === 'sakit')
                          .map((doa, index) => (
                            <p key={index} className="text-muted-foreground">
                              {doa.nama} {doa.wilayah && `(${doa.wilayah})`}: {doa.alasan}
                            </p>
                          ))}
                      </div>
                    )}

                    {/* Pemulihan */}
                    {data.dukunganDoa.filter(d => d.kategori === 'pemulihan').length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2">Pemulihan</h4>
                        {data.dukunganDoa
                          .filter(d => d.kategori === 'pemulihan')
                          .map((doa, index) => (
                            <p key={index} className="text-muted-foreground">
                              {doa.nama} {doa.wilayah && `(${doa.wilayah})`}: {doa.alasan}
                            </p>
                          ))}
                      </div>
                    )}

                    {/* Umum */}
                    {data.dukunganDoa.filter(d => d.kategori === 'umum').length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2">Umum</h4>
                        {data.dukunganDoa
                          .filter(d => d.kategori === 'umum')
                          .map((doa, index) => (
                            <p key={index} className="text-muted-foreground">
                              {doa.nama} {doa.wilayah && `(${doa.wilayah})`}: {doa.alasan}
                            </p>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              </Card>

              {/* Ulang Tahun */}
              <Card>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Jemaat Berulang Tahun</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nama</TableHead>
                        <TableHead>Tanggal</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data.ulangTahunJemaat.map((jemaat, index) => (
                        <TableRow key={index}>
                          <TableCell>{jemaat.nama}</TableCell>
                          <TableCell>{jemaat.tanggal}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="jadwal">
            <div className="grid gap-4">
              {/* Jadwal Pelayan */}
              <Card>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Jadwal Pelayan</h3>
                  <div className="space-y-6">
                    {data.jadwalPelayan.map((jadwal, index) => (
                      <div key={index}>
                        <h4 className="font-semibold mb-2">{jadwal.tanggal}</h4>
                        <Table>
                          <TableBody>
                            <TableRow>
                              <TableCell className="font-medium">Koordinator</TableCell>
                              <TableCell>{jadwal.koordinator}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Pelayan Firman</TableCell>
                              <TableCell>{jadwal.pelayanFirman}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Pendamping</TableCell>
                              <TableCell>{jadwal.pendamping}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Penyambut Jemaat</TableCell>
                              <TableCell>{jadwal.penyambutJemaat}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Pemusik & Cantoria</TableCell>
                              <TableCell>{jadwal.pemusikCantoria}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Pengisi Pujian</TableCell>
                              <TableCell>{jadwal.pengisiPujian}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Pewarta</TableCell>
                              <TableCell>{jadwal.pewarta}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Liturgos</TableCell>
                              <TableCell>{jadwal.liturgos}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Multimedia</TableCell>
                              <TableCell>{jadwal.multimedia}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Majelis Piket</TableCell>
                              <TableCell>{jadwal.majelisPiket}</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Jurnal Kebaktian */}
              <Card>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Jurnal Kebaktian</h3>
                  <div className="space-y-6">
                    {data.jurnalKebaktian.map((jurnal, index) => (
                      <div key={index}>
                        <h4 className="font-semibold mb-2">{jurnal.tanggal}</h4>
                        <Table>
                          <TableBody>
                            <TableRow>
                              <TableCell className="font-medium">Daftar Lagu</TableCell>
                              <TableCell>
                                <ul className="list-disc list-inside">
                                  {jurnal.daftarLagu.map((lagu, idx) => (
                                    <li key={idx}>{lagu}</li>
                                  ))}
                                </ul>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Bacaan Alkitab</TableCell>
                              <TableCell>{jurnal.bacaanAlkitab}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Kalender Gerejawi</TableCell>
                              <TableCell>{jurnal.kalenderGerejawi}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Warna Liturgis</TableCell>
                              <TableCell>{jurnal.warnaLiturgis}</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Jadwal Sekolah Minggu */}
              <Card>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Jadwal Sekolah Minggu</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tanggal</TableHead>
                        <TableHead>Pelayan Firman</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data.jadwalSekolahMinggu.map((jadwal, index) => (
                        <TableRow key={index}>
                          <TableCell>{jadwal.tanggal}</TableCell>
                          <TableCell>{jadwal.pelayanFirman}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </Card>

              {/* Jadwal Pemuda Remaja */}
              <Card>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Jadwal Pemuda Remaja</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tanggal</TableHead>
                        <TableHead>Pemusik</TableHead>
                        <TableHead>Pemandu</TableHead>
                        <TableHead>Pelayan Firman</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data.jadwalPemudaRemaja.map((jadwal, index) => (
                        <TableRow key={index}>
                          <TableCell>{jadwal.tanggal}</TableCell>
                          <TableCell>{jadwal.pemusik}</TableCell>
                          <TableCell>{jadwal.pemandu}</TableCell>
                          <TableCell>{jadwal.pelayanFirman}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="persembahan">
            <div className="grid gap-4">
              {/* Penghaturan Persembahan */}
              <Card>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Penghaturan Persembahan</h3>
                  {data.penghaturanPersembahan.map((persembahan, index) => (
                    <p key={index} className="text-muted-foreground whitespace-pre-line">{persembahan}</p>
                  ))}
                </div>
              </Card>

              {/* Persembahan Khusus */}
              <Card>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Persembahan Khusus</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Dari</TableHead>
                        <TableHead>Bentuk</TableHead>
                        <TableHead>Jumlah</TableHead>
                        <TableHead>Keterangan</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data.persembahanKhusus.map((persembahan, index) => (
                        <TableRow key={index}>
                          <TableCell>{persembahan.dari}</TableCell>
                          <TableCell>{persembahan.bentuk}</TableCell>
                          <TableCell>{persembahan.jumlah || '-'}</TableCell>
                          <TableCell>{persembahan.keterangan || '-'}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
