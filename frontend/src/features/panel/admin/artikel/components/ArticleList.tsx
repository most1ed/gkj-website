import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Search, Edit, Trash2, Eye, FileText } from "lucide-react";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  category: string;
  tags: string[];
  status: "draft" | "published" | "archived";
  publishDate?: Date;
  lastModified: Date;
}

export function ArticleList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [articles, setArticles] = useState<Article[]>([
    {
      id: "1",
      title: "Merayakan Paskah di Era Digital",
      excerpt: "Bagaimana gereja beradaptasi dengan teknologi dalam merayakan Paskah",
      author: "Pdt. John Doe",
      category: "Renungan",
      tags: ["Paskah", "Teknologi", "Ibadah"],
      status: "published",
      publishDate: new Date("2024-01-15"),
      lastModified: new Date("2024-01-15"),
    },
    {
      id: "2",
      title: "Pelayanan Pemuda di Masa Pandemi",
      excerpt: "Strategi dan tantangan pelayanan pemuda di masa pandemi",
      author: "Pnt. Jane Smith",
      category: "Pelayanan",
      tags: ["Pemuda", "Pandemi", "Pelayanan"],
      status: "draft",
      lastModified: new Date("2024-01-20"),
    },
    // Add more dummy data as needed
  ]);

  const getStatusBadgeClass = (status: Article["status"]) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-700";
      case "draft":
        return "bg-yellow-100 text-yellow-700";
      case "archived":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusText = (status: Article["status"]) => {
    switch (status) {
      case "published":
        return "Terbit";
      case "draft":
        return "Draft";
      case "archived":
        return "Arsip";
      default:
        return "-";
    }
  };

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari artikel berdasarkan judul, penulis, kategori, atau tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button>
          <FileText className="h-4 w-4 mr-2" />
          Tulis Artikel
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Artikel</TableHead>
              <TableHead>Penulis</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Tag</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Terbit</TableHead>
              <TableHead>Diubah</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredArticles.map((article) => (
              <TableRow key={article.id}>
                <TableCell>
                  <div className="space-y-1">
                    <div className="font-medium">{article.title}</div>
                    <div className="text-sm text-muted-foreground line-clamp-1">
                      {article.excerpt}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{article.author}</TableCell>
                <TableCell>
                  <Badge variant="outline">{article.category}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {article.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusBadgeClass(article.status)}>
                    {getStatusText(article.status)}
                  </Badge>
                </TableCell>
                <TableCell>
                  {article.publishDate
                    ? format(article.publishDate, "dd MMM yyyy", { locale: id })
                    : "-"}
                </TableCell>
                <TableCell>
                  {format(article.lastModified, "dd MMM yyyy", { locale: id })}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    Lihat
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button size="sm" variant="destructive">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Hapus
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
