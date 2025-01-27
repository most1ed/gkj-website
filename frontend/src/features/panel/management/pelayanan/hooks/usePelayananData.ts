import { useState, useEffect } from "react";

interface Commission {
  id: string;
  name: string;
  description: string;
  leader: string;
  members: {
    id: string;
    name: string;
    role: string;
    status: "active" | "inactive";
  }[];
  activities: {
    id: string;
    title: string;
    description: string;
    startDate: Date;
    endDate?: Date;
    location: string;
    status: "planned" | "ongoing" | "completed" | "cancelled";
    participants: number;
    budget: number;
  }[];
}

interface ServiceSchedule {
  id: string;
  date: Date;
  time: string;
  activity: string;
  commission: string;
  role: string;
  name: string;
  status: "confirmed" | "pending" | "declined";
  notes?: string;
}

interface PelayananData {
  commissions: Commission[];
  schedules: ServiceSchedule[];
  summary: {
    totalCommissions: number;
    totalMembers: number;
    activeMembers: number;
    totalActivities: number;
    ongoingActivities: number;
    totalSchedules: number;
    pendingSchedules: number;
  };
}

export function usePelayananData() {
  const [data, setData] = useState<PelayananData>({
    commissions: [
      {
        id: "1",
        name: "Komisi Anak",
        description: "Melayani anak-anak dalam pertumbuhan iman",
        leader: "Sdri. Maria",
        members: [
          {
            id: "1",
            name: "Sdri. Maria",
            role: "Ketua",
            status: "active",
          },
          {
            id: "2",
            name: "Sdri. Anna",
            role: "Wakil Ketua",
            status: "active",
          },
        ],
        activities: [
          {
            id: "1",
            title: "Sekolah Minggu",
            description: "Ibadah anak setiap hari Minggu",
            startDate: new Date("2024-01-28"),
            location: "Ruang Anak",
            status: "ongoing",
            participants: 30,
            budget: 1000000,
          },
        ],
      },
      {
        id: "2",
        name: "Komisi Pemuda",
        description: "Melayani pemuda dalam pelayanan",
        leader: "Sdr. Peter",
        members: [
          {
            id: "3",
            name: "Sdr. Peter",
            role: "Ketua",
            status: "active",
          },
          {
            id: "4",
            name: "Sdri. Sarah",
            role: "Sekretaris",
            status: "active",
          },
        ],
        activities: [
          {
            id: "2",
            title: "Retreat Pemuda",
            description: "Retreat tahunan pemuda GKJ",
            startDate: new Date("2024-02-15"),
            endDate: new Date("2024-02-17"),
            location: "Villa Kaliurang",
            status: "planned",
            participants: 50,
            budget: 25000000,
          },
        ],
      },
    ],
    schedules: [
      {
        id: "1",
        date: new Date("2024-01-28"),
        time: "09:00",
        activity: "Sekolah Minggu",
        commission: "Komisi Anak",
        role: "Guru",
        name: "Sdri. Maria",
        status: "confirmed",
      },
      {
        id: "2",
        date: new Date("2024-01-28"),
        time: "16:00",
        activity: "Persekutuan Pemuda",
        commission: "Komisi Pemuda",
        role: "Pembicara",
        name: "Pdt. John Doe",
        status: "pending",
        notes: "Menunggu konfirmasi",
      },
    ],
    summary: {
      totalCommissions: 8,
      totalMembers: 64,
      activeMembers: 48,
      totalActivities: 12,
      ongoingActivities: 3,
      totalSchedules: 24,
      pendingSchedules: 4,
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
    createCommission: async () => {},
    updateCommission: async () => {},
    deleteCommission: async () => {},
    addMember: async () => {},
    updateMember: async () => {},
    removeMember: async () => {},
    createActivity: async () => {},
    updateActivity: async () => {},
    deleteActivity: async () => {},
    createSchedule: async () => {},
    updateSchedule: async () => {},
    deleteSchedule: async () => {},
  };
}
