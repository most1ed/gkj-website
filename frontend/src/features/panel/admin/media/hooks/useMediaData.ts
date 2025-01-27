import { useState, useEffect } from "react";

interface MediaItem {
  id: string;
  title: string;
  description: string;
  type: "image" | "video" | "audio";
  url: string;
  thumbnail?: string;
  uploadedBy: string;
  uploadDate: Date;
  size: number;
  duration?: number;
  tags: string[];
}

interface Album {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  itemCount: number;
  createdAt: Date;
}

interface Sermon {
  id: string;
  title: string;
  speaker: string;
  date: Date;
  audioUrl: string;
  slides?: string;
  notes?: string;
  duration: number;
  series?: string;
  tags: string[];
}

interface MediaData {
  gallery: {
    items: MediaItem[];
    albums: Album[];
  };
  videos: MediaItem[];
  sermons: Sermon[];
}

export function useMediaData() {
  const [data, setData] = useState<MediaData>({
    gallery: {
      items: [
        {
          id: "1",
          title: "Ibadah Minggu Paskah",
          description: "Dokumentasi ibadah Minggu Paskah 2024",
          type: "image",
          url: "/images/gallery/easter-2024.jpg",
          uploadedBy: "Admin",
          uploadDate: new Date("2024-01-15"),
          size: 2500000,
          tags: ["Paskah", "Ibadah"],
        },
        {
          id: "2",
          title: "Retreat Pemuda",
          description: "Kegiatan retreat pemuda GKJ",
          type: "image",
          url: "/images/gallery/youth-retreat.jpg",
          uploadedBy: "Admin",
          uploadDate: new Date("2024-01-20"),
          size: 1800000,
          tags: ["Pemuda", "Retreat"],
        },
      ],
      albums: [
        {
          id: "1",
          title: "Paskah 2024",
          description: "Kumpulan foto perayaan Paskah 2024",
          coverImage: "/images/albums/easter-2024.jpg",
          itemCount: 25,
          createdAt: new Date("2024-01-15"),
        },
        {
          id: "2",
          title: "Retreat Pemuda 2024",
          description: "Dokumentasi retreat pemuda",
          coverImage: "/images/albums/youth-retreat.jpg",
          itemCount: 50,
          createdAt: new Date("2024-01-20"),
        },
      ],
    },
    videos: [
      {
        id: "1",
        title: "Ibadah Minggu - 21 Januari 2024",
        description: "Rekaman ibadah Minggu",
        type: "video",
        url: "/videos/worship-2024-01-21.mp4",
        thumbnail: "/videos/thumbnails/worship-2024-01-21.jpg",
        uploadedBy: "Admin",
        uploadDate: new Date("2024-01-21"),
        size: 150000000,
        duration: 5400,
        tags: ["Ibadah", "Minggu"],
      },
    ],
    sermons: [
      {
        id: "1",
        title: "Hidup dalam Kasih Kristus",
        speaker: "Pdt. John Doe",
        date: new Date("2024-01-21"),
        audioUrl: "/sermons/2024-01-21.mp3",
        slides: "/sermons/slides/2024-01-21.pdf",
        notes: "Catatan khotbah tentang kasih Kristus...",
        duration: 2400,
        series: "Seri Buah Roh",
        tags: ["Khotbah", "Kasih"],
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
    uploadMedia: async () => {},
    deleteMedia: async () => {},
    createAlbum: async () => {},
    updateAlbum: async () => {},
    deleteAlbum: async () => {},
    uploadSermon: async () => {},
    updateSermon: async () => {},
    deleteSermon: async () => {},
  };
}
