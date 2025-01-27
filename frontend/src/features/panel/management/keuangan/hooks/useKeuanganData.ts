import { useState, useEffect } from "react";

interface Transaction {
  id: string;
  date: Date;
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
  transactions: Transaction[];
  budgets: Budget[];
  summary: {
    totalIncome: number;
    totalExpense: number;
    balance: number;
    previousBalance: number;
  };
  categories: {
    income: string[];
    expense: string[];
  };
}

export function useKeuanganData() {
  const [data, setData] = useState<KeuanganData>({
    transactions: [
      {
        id: "1",
        date: new Date("2024-01-07"),
        description: "Persembahan Minggu 1",
        type: "income",
        category: "Persembahan Minggu",
        amount: 7500000,
        status: "approved",
        approvedBy: "Bendahara",
      },
      {
        id: "2",
        date: new Date("2024-01-10"),
        description: "Pembayaran Listrik",
        type: "expense",
        category: "Operasional",
        amount: 2500000,
        status: "approved",
        approvedBy: "Bendahara",
        attachment: "/files/invoice-listrik.pdf",
      },
    ],
    budgets: [
      {
        id: "1",
        year: 2024,
        category: "Operasional",
        amount: 100000000,
        used: 25000000,
        remaining: 75000000,
        note: "Anggaran operasional gereja",
      },
      {
        id: "2",
        year: 2024,
        category: "Diakonia",
        amount: 50000000,
        used: 10000000,
        remaining: 40000000,
        note: "Anggaran pelayanan diakonia",
      },
    ],
    summary: {
      totalIncome: 50000000,
      totalExpense: 35000000,
      balance: 15000000,
      previousBalance: 12000000,
    },
    categories: {
      income: [
        "Persembahan Minggu",
        "Persembahan Khusus",
        "Perpuluhan",
        "Lain-lain",
      ],
      expense: [
        "Operasional",
        "Diakonia",
        "Pembangunan",
        "Gaji",
        "Utilitas",
        "Lain-lain",
      ],
    },
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
    createTransaction: async () => {},
    updateTransaction: async () => {},
    deleteTransaction: async () => {},
    approveTransaction: async () => {},
    rejectTransaction: async () => {},
    createBudget: async () => {},
    updateBudget: async () => {},
    deleteBudget: async () => {},
  };
}
