import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import PDFDownloadButton from "@/components/PDFDownloadButton";

// Dummy data untuk arsip warta
const arsipWarta = [
  {
    id: 1,
    tanggal: "2025-01-12",
    kategori: "Persembahan",
    judul: "Informasi persembahan bulanan",
    konten: "Periode 11 s.d. 17 Januari 2025\n\nTotal persembahan: Rp. 5.500.000",
    lampiran: true
  },
  {
    id: 2,
    tanggal: "2025-01-12",
    kategori: "Jadwal",
    judul: "Jadwal pelayan kebaktian minggu",
    konten: "Minggu, 26 Januari 2025\nPelayan Firman: Pdt. Lusindo Tobing (GKJ Nehemia)",
    lampiran: true
  },
  {
    id: 3,
    tanggal: "2025-01-05",
    kategori: "Informasi",
    judul: "Persembahan khusus",
    konten: "Majelis telah menerima persembahan khusus dari PT KAI berupa seperangkat sarana kebersihan",
    lampiran: false
  },
  // Tambahkan data arsip lainnya di sini
];

const kategoriWarta = [
  { value: "semua", label: "Semua kategori" },
  { value: "informasi", label: "Informasi" },
  { value: "persembahan", label: "Persembahan" },
  { value: "jadwal", label: "Jadwal pelayan" },
  { value: "liturgi", label: "Liturgi" },
  { value: "doa", label: "Dukungan doa" },
  { value: "ultah", label: "Ulang tahun" },
];

export default function ArsipWarta() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedKategori, setSelectedKategori] = useState("semua");
  const [date, setDate] = useState({
    from: addDays(new Date(), -30),
    to: new Date(),
  });

  // Filter arsip berdasarkan pencarian, kategori, dan tanggal
  const filteredArsip = arsipWarta.filter(arsip => {
    const matchQuery = arsip.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      arsip.konten.toLowerCase().includes(searchQuery.toLowerCase());
    const matchKategori = selectedKategori === "semua" || 
                         arsip.kategori.toLowerCase() === selectedKategori.toLowerCase();
    const arsipDate = new Date(arsip.tanggal);
    const matchDate = (!date.from || arsipDate >= date.from) &&
                     (!date.to || arsipDate <= date.to);
    
    return matchQuery && matchKategori && matchDate;
  });

  return (
    <div className="container mx-auto py-6">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold tracking-tight">Arsip warta jemaat</h2>
        </div>

        {/* Filter Section */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <label className="text-sm font-medium">Cari warta</label>
            <Input
              placeholder="Cari berdasarkan judul atau isi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Kategori</label>
            <Select value={selectedKategori} onValueChange={setSelectedKategori}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih kategori" />
              </SelectTrigger>
              <SelectContent>
                {kategoriWarta.map((kategori) => (
                  <SelectItem key={kategori.value} value={kategori.value}>
                    {kategori.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Rentang tanggal</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "dd/MM/yyyy")} -{" "}
                        {format(date.to, "dd/MM/yyyy")}
                      </>
                    ) : (
                      format(date.from, "dd/MM/yyyy")
                    )
                  ) : (
                    <span>Pilih tanggal</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Hasil Pencarian */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">
              Hasil pencarian ({filteredArsip.length} warta)
            </h3>
          </div>

          <div className="grid gap-4">
            {filteredArsip.map((arsip) => (
              <Card key={arsip.id} className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-xl font-semibold">{arsip.judul}</h4>
                      <div className="flex gap-2 mt-1">
                        <span className="text-sm text-muted-foreground">
                          {format(new Date(arsip.tanggal), "dd MMMM yyyy")}
                        </span>
                        <span className="text-sm text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">
                          {arsip.kategori}
                        </span>
                      </div>
                    </div>
                    {arsip.lampiran && (
                      <PDFDownloadButton
                        wartaJemaat={[]}
                        jadwalIbadah={[]}
                        jurnalKebaktian={[]}
                        dukunganDoa={[]}
                        tanggal={arsip.tanggal}
                      />
                    )}
                  </div>
                  <p className="text-muted-foreground whitespace-pre-line">
                    {arsip.konten}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
