import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface News {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  imageUrl: string;
}

interface LatestNewsProps {
  news?: News[];
}

export function LatestNews({ news = [] }: LatestNewsProps) {
  // Jika tidak ada data, tampilkan data dummy
  const dummyNews: News[] = [
    {
      id: "1",
      title: "Perayaan Paskah 2025",
      excerpt: "Rangkaian ibadah perayaan Paskah akan dimulai dengan ibadah Kamis Putih...",
      date: "25 Jan 2025",
      imageUrl: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800"
    },
    {
      id: "2",
      title: "Program Bantuan Pendidikan",
      excerpt: "GKJ Grogol membuka pendaftaran program bantuan pendidikan untuk tahun ajaran 2025...",
      date: "24 Jan 2025",
      imageUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800"
    },
    {
      id: "3",
      title: "Pemberkatan Nikah",
      excerpt: "Telah dilaksanakan pemberkatan nikah Sdr. John dan Sdri. Jane pada tanggal...",
      date: "23 Jan 2025",
      imageUrl: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=800"
    }
  ];

  const displayNews = news.length > 0 ? news : dummyNews;

  return (
    <section className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Berita Terkini</h2>
        <Link to="/news">
          <Button variant="outline">Lihat Semua</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayNews.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <img 
              src={item.imageUrl} 
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <p className="text-sm text-muted-foreground mb-2">{item.date}</p>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground mb-4">{item.excerpt}</p>
              <Link to={`/news/${item.id}`}>
                <Button variant="link" className="px-0">Baca Selengkapnya →</Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
