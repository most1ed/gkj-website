import { useState, useEffect } from "react";

interface Event {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  location: string;
  type: "worship" | "fellowship" | "training" | "outreach" | "other";
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
  capacity?: number;
  registeredCount: number;
  price?: number;
  organizer: string;
  contact: string;
  image?: string;
}

interface Registration {
  id: string;
  eventId: string;
  eventTitle: string;
  registrationDate: Date;
  status: "pending" | "confirmed" | "cancelled" | "attended";
  paymentStatus?: "pending" | "paid" | "refunded";
  paymentAmount?: number;
  paymentDate?: Date;
  ticketNumber?: string;
  notes?: string;
}

interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end?: Date;
  allDay?: boolean;
  type: Event["type"];
  status: Event["status"];
}

interface UserEventsData {
  upcoming: Event[];
  calendar: CalendarEvent[];
  registrations: Registration[];
  history: Registration[];
  stats: {
    totalEvents: number;
    upcomingEvents: number;
    activeRegistrations: number;
    pastEvents: number;
  };
}

export function useUserEvents() {
  const [data, setData] = useState<UserEventsData>({
    upcoming: [
      {
        id: "1",
        title: "Ibadah Minggu",
        description: "Ibadah Minggu reguler",
        startDate: new Date("2024-01-28T07:00:00"),
        location: "Gedung Gereja",
        type: "worship",
        status: "upcoming",
        registeredCount: 150,
        organizer: "Majelis",
        contact: "admin@gkj.org",
      },
      {
        id: "2",
        title: "Retreat Pemuda",
        description: "Retreat tahunan pemuda GKJ",
        startDate: new Date("2024-02-15"),
        endDate: new Date("2024-02-17"),
        location: "Villa Kaliurang",
        type: "fellowship",
        status: "upcoming",
        capacity: 50,
        registeredCount: 30,
        price: 500000,
        organizer: "Komisi Pemuda",
        contact: "pemuda@gkj.org",
        image: "/images/events/retreat.jpg",
      },
    ],
    calendar: [
      {
        id: "1",
        title: "Ibadah Minggu",
        start: new Date("2024-01-28T07:00:00"),
        end: new Date("2024-01-28T09:00:00"),
        type: "worship",
        status: "upcoming",
      },
      {
        id: "2",
        title: "Retreat Pemuda",
        start: new Date("2024-02-15"),
        end: new Date("2024-02-17"),
        allDay: true,
        type: "fellowship",
        status: "upcoming",
      },
    ],
    registrations: [
      {
        id: "1",
        eventId: "2",
        eventTitle: "Retreat Pemuda",
        registrationDate: new Date("2024-01-15"),
        status: "confirmed",
        paymentStatus: "paid",
        paymentAmount: 500000,
        paymentDate: new Date("2024-01-16"),
        ticketNumber: "RPM-2024-001",
      },
    ],
    history: [
      {
        id: "2",
        eventId: "3",
        eventTitle: "Pelatihan Musik",
        registrationDate: new Date("2023-12-01"),
        status: "attended",
        paymentStatus: "paid",
        paymentAmount: 100000,
        paymentDate: new Date("2023-12-02"),
        ticketNumber: "PMK-2023-001",
      },
    ],
    stats: {
      totalEvents: 24,
      upcomingEvents: 5,
      activeRegistrations: 2,
      pastEvents: 10,
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
    registerEvent: async () => {},
    cancelRegistration: async () => {},
    getEventDetails: async () => {},
    getRegistrationDetails: async () => {},
  };
}
