import { useState, useEffect } from "react";
import { 
  mockKeuanganStatisticsData, 
  mockKeuanganTransactions, 
  mockKeuanganSummary 
} from "@/lib/mock/keuangan-mock-data";

interface Transaction {
  id: string;
  date: string;
  description: string;
  type: "income" | "expense";
  category: string;
  amount: number;
  note?: string;
  status: "pending" | "approved" | "rejected";
  approvedBy?: string;
  attachment?: string;
}

interface Budget {
  id: string;
  year: number;
  category: string;
  amount: number;
  used: number;
  remaining: number;
  note?: string;
}

interface KeuanganData {
  category: string;
  income: number;
  expense: number;
  balance: number;
}

export function useKeuanganData() {
  const [data, setData] = useState<KeuanganData[]>(mockKeuanganStatisticsData);
  const [transactions, setTransactions] = useState<Transaction[]>(mockKeuanganTransactions);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate data fetching
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // In a real scenario, this would be an API call
        // For now, we're using mock data
        setData(mockKeuanganStatisticsData);
        setTransactions(mockKeuanganTransactions);
      } catch (err) {
        setError('Failed to fetch keuangan data');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { 
    data, 
    transactions, 
    isLoading, 
    error 
  };
}
