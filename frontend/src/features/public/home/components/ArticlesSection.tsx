import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Link } from "react-router-dom";

export function ArticlesSection() {
  const articles = [
    {
      id: "melayani-dengan-kasih",
      title: "Melayani dengan Kasih di Tengah Pandemi",
      type: "Renungan",
      author: "Pdt. Wurihanto Handoyo Adi",
      date: "20 Jan 2025",
      excerpt: "Bagaimana kita dapat tetap melayani sesama dengan penuh kasih di tengah tantangan...",
      imageUrl: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800&auto=format&fit=crop"
    },
    {
      id: "makna-natal",
      title: "Makna Natal bagi Kehidupan Sehari-hari",
      type: "Artikel",
      author: "Pnt. Joko Mulyono",
      date: "15 Jan 2025",
      excerpt: "Natal bukan sekadar perayaan tahunan, tetapi membawa makna mendalam bagi...",
      imageUrl: "https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=800&auto=format&fit=crop"
    },
    {
      id: "doa-kehidupan",
      title: "Doa dalam Kehidupan Orang Percaya",
      type: "Renungan",
      author: "Pdt. Lusindo Tobing",
      date: "10 Jan 2025",
      excerpt: "Pentingnya doa sebagai nafas kehidupan orang percaya dalam menjalani...",
      imageUrl: "https://images.unsplash.com/photo-1476900966873-ab290e38e3f7?w=800&auto=format&fit=crop"
    }
  ];

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold">Artikel & Renungan</h2>
            <p className="text-muted-foreground">Penguatan iman melalui tulisan</p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/articles">Lihat Semua</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link to={`/articles/${article.id}`} key={article.id}>
              <Card className="group cursor-pointer hover:shadow-lg transition-shadow h-full">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary text-primary-foreground text-sm rounded-full">
                      {article.type}
                    </span>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </CardTitle>
                  <CardDescription>
                    Oleh {article.author} • {article.date}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-2">
                    {article.excerpt}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
