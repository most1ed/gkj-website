import { useState, useEffect } from "react";

interface Liturgy {
  id: string;
  title: string;
  description?: string;
  sections: {
    id: string;
    title: string;
    content: string;
    type: "text" | "song" | "reading" | "prayer";
    notes?: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

interface WorshipService {
  id: string;
  date: Date;
  time: string;
  type: string;
  theme?: string;
  preacher: string;
  liturgist: string;
  musicians: string[];
  status: "scheduled" | "ongoing" | "completed" | "cancelled";
  liturgy?: Liturgy;
}

interface ServiceSchedule {
  id: string;
  date: Date;
  time: string;
  role: string;
  name: string;
  status: "confirmed" | "pending" | "declined";
  notes?: string;
}

interface IbadahData {
  services: WorshipService[];
  schedules: ServiceSchedule[];
  liturgies: Liturgy[];
  summary: {
    totalServices: number;
    upcomingServices: number;
    totalLiturgies: number;
    totalSchedules: number;
  };
}

export function useIbadahData() {
  const [data, setData] = useState<IbadahData>({
    services: [
      {
        id: "1",
        date: new Date("2024-01-28"),
        time: "07:00",
        type: "Ibadah Minggu",
        theme: "Hidup dalam Kasih Kristus",
        preacher: "Pdt. John Doe",
        liturgist: "Pnt. Jane Smith",
        musicians: ["Organis 1", "Pianis 1", "Gitaris 1"],
        status: "scheduled",
      },
      {
        id: "2",
        date: new Date("2024-01-28"),
        time: "09:00",
        type: "Ibadah Minggu",
        theme: "Hidup dalam Kasih Kristus",
        preacher: "Pdt. John Doe",
        liturgist: "Pnt. Bob Wilson",
        musicians: ["Organis 2", "Pianis 2", "Gitaris 2"],
        status: "scheduled",
      },
    ],
    schedules: [
      {
        id: "1",
        date: new Date("2024-01-28"),
        time: "07:00",
        role: "Liturgos",
        name: "Pnt. Jane Smith",
        status: "confirmed",
      },
      {
        id: "2",
        date: new Date("2024-01-28"),
        time: "09:00",
        role: "Organis",
        name: "Sdr. John Doe",
        status: "pending",
        notes: "Menunggu konfirmasi",
      },
    ],
    liturgies: [
      {
        id: "1",
        title: "Liturgi Ibadah Minggu",
        description: "Liturgi untuk ibadah minggu reguler",
        sections: [
          {
            id: "1",
            title: "Votum dan Salam",
            content: "Pertolongan kita adalah dalam nama Tuhan...",
            type: "text",
          },
          {
            id: "2",
            title: "Nyanyian Pembuka",
            content: "KJ 21 - Hari Minggu, Hari yang Mulia",
            type: "song",
            notes: "Bait 1 & 3",
          },
        ],
        createdAt: new Date("2024-01-20"),
        updatedAt: new Date("2024-01-20"),
      },
    ],
    summary: {
      totalServices: 24,
      upcomingServices: 4,
      totalLiturgies: 10,
      totalSchedules: 48,
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
    createService: async () => {},
    updateService: async () => {},
    deleteService: async () => {},
    createSchedule: async () => {},
    updateSchedule: async () => {},
    deleteSchedule: async () => {},
    createLiturgy: async () => {},
    updateLiturgy: async () => {},
    deleteLiturgy: async () => {},
  };
}
