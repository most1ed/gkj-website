import { useQuery } from "@tanstack/react-query";

interface News {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  slug: string;
}

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
}

interface HomeData {
  news: News[];
  events: Event[];
}

// Mock data
const mockData: HomeData = {
  news: [
    {
      id: "1",
      title: "Ibadah Minggu Ini",
      excerpt: "Jadwal ibadah minggu ini dengan protokol kesehatan",
      image: "/images/worship.jpg",
      date: "2025-01-28",
      slug: "ibadah-minggu-ini"
    }
  ],
  events: [
    {
      id: "1",
      title: "Kebaktian Minggu",
      date: "2025-01-28",
      time: "09:00",
      location: "GKJ Pusat"
    }
  ]
};

export function useHomeData() {
  return useQuery<HomeData>({
    queryKey: ["home-data"],
    queryFn: async () => {
      // Return mock data instead of API call
      return Promise.resolve(mockData);
    }
  });
}
