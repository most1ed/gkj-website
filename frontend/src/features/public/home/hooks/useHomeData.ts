import { useQuery } from "@tanstack/react-query";
import { mockApi } from "@/lib/mock";

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

export function useHomeData() {
  return useQuery<HomeData>({
    queryKey: ["home-data"],
    queryFn: async () => {
      // Use new mock API with dynamic data generation
      return {
        news: mockApi.home.generateNews(),
        events: mockApi.home.generateEvents()
      };
    }
  });
}
