import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { CalendarDays, Clock, User } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

// Dummy data - nanti akan diganti dengan data dari API/backend
const article = {
  id: '1',
  title: 'Melayani dengan Kasih di Tengah Pandemi',
  type: 'Renungan',
  author: 'Pdt. Wurihanto Handoyo Adi',
  date: '20 Januari 2025',
  readTime: '5 menit',
  imageUrl: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=1600&auto=format&fit=crop',
  content: `
    <h2>Pendahuluan</h2>
    <p>
      Di tengah pandemi yang masih berlangsung, kita sebagai umat Kristiani dipanggil untuk tetap 
      melayani dengan kasih. Bagaimana kita dapat melakukannya dengan efektif sambil tetap 
      memperhatikan protokol kesehatan?
    </p>

    <h2>Tantangan Pelayanan di Era Pandemi</h2>
    <p>
      Pandemi COVID-19 telah mengubah cara kita melayani secara drastis. Pembatasan fisik, 
      protokol kesehatan, dan kebutuhan akan adaptasi digital menjadi tantangan utama dalam 
      pelayanan gereja.
    </p>

    <h2>Adaptasi dan Inovasi</h2>
    <p>
      Gereja perlu beradaptasi dengan situasi ini melalui berbagai inovasi:
    </p>
    <ul>
      <li>Pengembangan pelayanan digital dan hybrid</li>
      <li>Penguatan pelayanan pastoral jarak jauh</li>
      <li>Pemanfaatan teknologi untuk persekutuan</li>
    </ul>

    <h2>Mempertahankan Esensi Pelayanan</h2>
    <p>
      Meski bentuk pelayanan berubah, esensi pelayanan harus tetap dipertahankan:
    </p>
    <ul>
      <li>Kasih sebagai dasar pelayanan</li>
      <li>Fokus pada kebutuhan jemaat</li>
      <li>Pembinaan iman yang berkelanjutan</li>
    </ul>

    <h2>Kesimpulan</h2>
    <p>
      Pandemi mungkin telah mengubah cara kita melayani, tetapi tidak mengubah esensi pelayanan 
      itu sendiri. Mari kita terus berinovasi dalam pelayanan sambil tetap berpegang pada 
      nilai-nilai kristiani yang fundamental.
    </p>

    <blockquote>
      "Sebab itu, selama masih ada kesempatan bagi kita, marilah kita berbuat baik kepada semua 
      orang, tetapi terutama kepada kawan-kawan kita seiman." - Galatia 6:10
    </blockquote>
  `
};

// Komponen untuk menampilkan metadata artikel
function ArticleMeta({ icon: Icon, label, value }: { icon: LucideIcon, label: string, value: string }) {
  return (
    <div className="flex items-center gap-2 text-muted-foreground">
      <Icon className="h-4 w-4" />
      <span className="sr-only">{label}:</span>
      <span className="text-sm">{value}</span>
    </div>
  );
}

export default function ArticleDetail() {
  const { slug } = useParams();

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        {/* Article Header */}
        <div className="max-w-4xl mx-auto mb-8">
          <Button
            variant="ghost"
            className="mb-4"
            onClick={() => window.history.back()}
          >
            ← Kembali
          </Button>

          <div className="space-y-4">
            <div className="space-y-2">
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                {article.type}
              </span>
              <h1 className="text-4xl font-bold">{article.title}</h1>
            </div>

            <div className="flex flex-wrap gap-4">
              <ArticleMeta icon={User} label="Penulis" value={article.author} />
              <ArticleMeta icon={CalendarDays} label="Tanggal" value={article.date} />
              <ArticleMeta icon={Clock} label="Waktu Baca" value={article.readTime} />
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="aspect-[2/1] rounded-lg overflow-hidden">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Article Content */}
        <div className="max-w-3xl mx-auto">
          <Card>
            <div className="p-8 prose prose-slate max-w-none dark:prose-invert">
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            </div>
          </Card>

          {/* Share and Actions */}
          <div className="mt-8 flex justify-between items-center">
            <Button variant="outline">Bagikan</Button>
            <Button variant="outline" onClick={() => window.history.back()}>
              Artikel Lainnya
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
