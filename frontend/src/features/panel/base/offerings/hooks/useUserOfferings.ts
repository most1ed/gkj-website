import { useState, useEffect } from "react";

interface Offering {
  id: string;
  type: "tithe" | "thanksgiving" | "building" | "mission" | "other";
  amount: number;
  date: Date;
  paymentMethod: string;
  status: "pending" | "completed" | "failed";
  notes?: string;
}

interface PaymentMethod {
  id: string;
  type: "bank_transfer" | "e_wallet" | "qris" | "cash";
  name: string;
  accountNumber?: string;
  accountName?: string;
  isDefault: boolean;
  status: "active" | "inactive";
}

interface OfferingStats {
  totalOfferings: number;
  monthlyOfferings: number;
  yearlyOfferings: number;
  lastOffering?: {
    amount: number;
    date: Date;
    type: Offering["type"];
  };
}

interface UserOfferingsData {
  history: Offering[];
  paymentMethods: PaymentMethod[];
  stats: OfferingStats;
}

export function useUserOfferings() {
  const [data, setData] = useState<UserOfferingsData>({
    history: [
      {
        id: "1",
        type: "tithe",
        amount: 1000000,
        date: new Date("2024-01-20"),
        paymentMethod: "BCA Transfer",
        status: "completed",
        notes: "Persepuluhan Januari 2024",
      },
      {
        id: "2",
        type: "thanksgiving",
        amount: 500000,
        date: new Date("2024-01-15"),
        paymentMethod: "GoPay",
        status: "completed",
        notes: "Syukur ulang tahun",
      },
      {
        id: "3",
        type: "building",
        amount: 250000,
        date: new Date("2024-01-10"),
        paymentMethod: "QRIS",
        status: "completed",
      },
    ],
    paymentMethods: [
      {
        id: "1",
        type: "bank_transfer",
        name: "BCA Transfer",
        accountNumber: "1234567890",
        accountName: "GKJ SALIB PUTIH",
        isDefault: true,
        status: "active",
      },
      {
        id: "2",
        type: "e_wallet",
        name: "GoPay",
        accountNumber: "08123456789",
        accountName: "GKJ SALIB PUTIH",
        isDefault: false,
        status: "active",
      },
      {
        id: "3",
        type: "qris",
        name: "QRIS",
        isDefault: false,
        status: "active",
      },
    ],
    stats: {
      totalOfferings: 1750000,
      monthlyOfferings: 1750000,
      yearlyOfferings: 1750000,
      lastOffering: {
        amount: 1000000,
        date: new Date("2024-01-20"),
        type: "tithe",
      },
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
    giveOffering: async () => {},
    getOfferingHistory: async () => {},
    addPaymentMethod: async () => {},
    updatePaymentMethod: async () => {},
    deletePaymentMethod: async () => {},
    setDefaultPaymentMethod: async () => {},
  };
}
