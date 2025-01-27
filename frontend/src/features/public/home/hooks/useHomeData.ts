import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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
      const response = await axios.get("/api/home");
      return response.data;
    },
  });
}
