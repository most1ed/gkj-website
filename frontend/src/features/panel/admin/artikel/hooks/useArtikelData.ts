import { useState, useEffect } from "react";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  status: "draft" | "published" | "archived";
  publishDate?: Date;
  lastModified: Date;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  articleCount: number;
}

interface Tag {
  id: string;
  name: string;
  slug: string;
  articleCount: number;
}

interface ArtikelData {
  articles: Article[];
  categories: Category[];
  tags: Tag[];
}

export function useArtikelData() {
  const [data, setData] = useState<ArtikelData>({
    articles: [
      {
        id: "1",
        title: "Merayakan Paskah di Era Digital",
        excerpt: "Bagaimana gereja beradaptasi dengan teknologi dalam merayakan Paskah",
        content: "Lorem ipsum dolor sit amet...",
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
        content: "Lorem ipsum dolor sit amet...",
        author: "Pnt. Jane Smith",
        category: "Pelayanan",
        tags: ["Pemuda", "Pandemi", "Pelayanan"],
        status: "draft",
        lastModified: new Date("2024-01-20"),
      },
    ],
    categories: [
      {
        id: "1",
        name: "Renungan",
        slug: "renungan",
        description: "Artikel-artikel renungan harian",
        articleCount: 10,
      },
      {
        id: "2",
        name: "Pelayanan",
        slug: "pelayanan",
        description: "Artikel seputar pelayanan gereja",
        articleCount: 5,
      },
      {
        id: "3",
        name: "Berita",
        slug: "berita",
        description: "Berita dan pengumuman gereja",
        articleCount: 8,
      },
    ],
    tags: [
      {
        id: "1",
        name: "Paskah",
        slug: "paskah",
        articleCount: 3,
      },
      {
        id: "2",
        name: "Teknologi",
        slug: "teknologi",
        articleCount: 2,
      },
      {
        id: "3",
        name: "Ibadah",
        slug: "ibadah",
        articleCount: 5,
      },
      {
        id: "4",
        name: "Pemuda",
        slug: "pemuda",
        articleCount: 4,
      },
      {
        id: "5",
        name: "Pandemi",
        slug: "pandemi",
        articleCount: 3,
      },
      {
        id: "6",
        name: "Pelayanan",
        slug: "pelayanan",
        articleCount: 6,
      },
    ],
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Simulasi loading data
  useEffect(() => {
    setIsLoading(true);
    // Di sini nanti akan ada pemanggilan API
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return {
    data,
    isLoading,
    error,
    // Nanti bisa ditambahkan fungsi-fungsi untuk manipulasi data
    createArticle: async () => {},
    updateArticle: async () => {},
    deleteArticle: async () => {},
    createCategory: async () => {},
    updateCategory: async () => {},
    deleteCategory: async () => {},
    createTag: async () => {},
    updateTag: async () => {},
    deleteTag: async () => {},
  };
}
