import { useState, useEffect } from "react";
import { 
  mockPelayananStatisticsData, 
  mockPelayananPersonnel,
  mockPelayananSummary 
} from "@/lib/mock/pelayanan-mock-data";

interface PelayananData {
  category: string;
  totalPersonnel: number;
  activePersonnel: number;
  newRecruits: number;
}

export function usePelayananData() {
  const [data, setData] = useState<PelayananData[]>(mockPelayananStatisticsData);
  const [personnel, setPersonnel] = useState(mockPelayananPersonnel);
  const [summary, setSummary] = useState(mockPelayananSummary);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate data fetching
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // In a real scenario, this would be an API call
        // For now, we're using mock data
        setData(mockPelayananStatisticsData);
        setPersonnel(mockPelayananPersonnel);
      } catch (err) {
        setError('Failed to fetch pelayanan data');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { 
    data, 
    personnel, 
    summary,
    isLoading, 
    error 
  };
}
