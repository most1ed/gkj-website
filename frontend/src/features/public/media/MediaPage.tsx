import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { CalendarDays, Clock, Video, Music, Newspaper, Play } from "lucide-react";

// Data galeri foto
const galeriData = [
  {
    id: 1,
    judul: "Ibadah Minggu",
    tanggal: "21 Januari 2024",
    thumbnail: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=800&auto=format&fit=crop",
    kategori: "Ibadah"
  },
  {
    id: 2,
    judul: "Retreat Pemuda",
    tanggal: "15 Januari 2024",
    thumbnail: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&auto=format&fit=crop",
    kategori: "Kegiatan"
  },
  {
    id: 3,
    judul: "Natal 2023",
    tanggal: "25 Desember 2023",
    thumbnail: "https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=800&auto=format&fit=crop",
    kategori: "Perayaan"
  },
  {
    id: 4,
    judul: "Pelayanan Diakonia",
    tanggal: "10 Januari 2024",
    thumbnail: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format&fit=crop",
    kategori: "Pelayanan"
  },
  {
    id: 5,
    judul: "Paskah 2023",
    tanggal: "9 April 2023",
    thumbnail: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800&auto=format&fit=crop",
    kategori: "Perayaan"
  },
  {
    id: 6,
    judul: "Kebaktian Paduan Suara",
    tanggal: "5 Januari 2024",
    thumbnail: "https://images.unsplash.com/photo-1477233534935-f5e6fe7c1159?w=800&auto=format&fit=crop",
    kategori: "Ibadah"
  }
];

// Data video
const videoData = [
  {
    id: 1,
    judul: "Ibadah Minggu - 21 Januari 2024",
    deskripsi: "Tema: 'Kasih yang Memulihkan'",
    durasi: "1:45:30",
    thumbnail: "https://images.unsplash.com/photo-1616763355548-1b606f439f86?w=800&auto=format&fit=crop",
    url: "https://youtube.com/watch?v=xxx1"
  },
  {
    id: 2,
    judul: "Persekutuan Doa - 17 Januari 2024",
    deskripsi: "Tema: 'Doa yang Mengubahkan'",
    durasi: "1:15:00",
    thumbnail: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800&auto=format&fit=crop",
    url: "https://youtube.com/watch?v=xxx2"
  },
  {
    id: 3,
    judul: "Kebaktian Paduan Suara - 14 Januari 2024",
    deskripsi: "Pelayanan Paduan Suara Gereja",
    durasi: "1:30:00",
    thumbnail: "https://images.unsplash.com/photo-1477233534935-f5e6fe7c1159?w=800&auto=format&fit=crop",
    url: "https://youtube.com/watch?v=xxx3"
  }
];

// Data podcast
const podcastData = [
  {
    id: 1,
    judul: "Renungan Harian",
    episode: "Episode 45",
    deskripsi: "Menemukan Damai di Tengah Badai",
    durasi: "15:30",
    tanggal: "20 Januari 2024",
    thumbnail: "https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    judul: "Obrolan Iman",
    episode: "Episode 23",
    deskripsi: "Membangun Keluarga Kristen",
    durasi: "25:45",
    tanggal: "18 Januari 2024",
    thumbnail: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&auto=format&fit=crop"
  }
];

// Data artikel
const artikelData = [
  {
    id: 1,
    judul: "Merayakan Paskah di Era Digital",
    penulis: "Pdt. Adi Sutanto",
    tanggal: "19 Januari 2024",
    ringkasan: "Bagaimana teknologi dapat membantu kita merayakan Paskah dengan lebih bermakna",
    thumbnail: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    judul: "Pelayanan Gereja di Masa Pandemi",
    penulis: "Pnt. Budi Santoso",
    tanggal: "17 Januari 2024",
    ringkasan: "Adaptasi dan inovasi dalam pelayanan gereja menghadapi tantangan pandemi",
    thumbnail: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&auto=format&fit=crop"
  }
];

export default function Media() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col items-start gap-2 mb-8">
          <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl">
            Media
          </h1>
          <p className="text-lg text-muted-foreground">
            Kumpulan media dan dokumentasi kegiatan GKJ dalam berbagai format.
          </p>
        </div>

        <Tabs defaultValue="galeri" className="space-y-4">
          <TabsList>
            <TabsTrigger value="galeri">Galeri Foto</TabsTrigger>
            <TabsTrigger value="video">Video</TabsTrigger>
            <TabsTrigger value="podcast">Podcast</TabsTrigger>
            <TabsTrigger value="artikel">Artikel</TabsTrigger>
          </TabsList>

          <TabsContent value="galeri" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galeriData.map((item) => (
                <Card key={item.id} className="group cursor-pointer overflow-hidden">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img
                      src={item.thumbnail}
                      alt={item.judul}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-primary text-primary-foreground text-sm rounded-full">
                        {item.kategori}
                      </span>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {item.judul}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4" />
                      {item.tanggal}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="video" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videoData.map((item) => (
                <Card key={item.id} className="group cursor-pointer">
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={item.thumbnail}
                      alt={item.judul}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="h-12 w-12 text-white" />
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {item.judul}
                    </CardTitle>
                    <CardDescription>
                      <div className="flex flex-col gap-1">
                        <span>{item.deskripsi}</span>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          {item.durasi}
                        </div>
                      </div>
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="podcast" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {podcastData.map((item) => (
                <Card key={item.id} className="group cursor-pointer">
                  <div className="flex gap-4">
                    <div className="w-32 h-32 overflow-hidden">
                      <img
                        src={item.thumbnail}
                        alt={item.judul}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1 py-4 pr-4">
                      <h3 className="font-semibold group-hover:text-primary transition-colors">
                        {item.judul}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">{item.episode}</p>
                      <p className="text-sm mb-2">{item.deskripsi}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {item.durasi}
                        </div>
                        <div className="flex items-center gap-1">
                          <CalendarDays className="h-4 w-4" />
                          {item.tanggal}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="artikel" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {artikelData.map((item) => (
                <Card key={item.id} className="group cursor-pointer">
                  <div className="flex gap-4">
                    <div className="w-48 h-32 overflow-hidden">
                      <img
                        src={item.thumbnail}
                        alt={item.judul}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1 py-4 pr-4">
                      <h3 className="font-semibold group-hover:text-primary transition-colors">
                        {item.judul}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Oleh {item.penulis}
                      </p>
                      <p className="text-sm mb-2 line-clamp-2">{item.ringkasan}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CalendarDays className="h-4 w-4" />
                        {item.tanggal}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
