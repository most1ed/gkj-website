import { useState, useEffect } from "react";

interface AboutContent {
  description: string;
  image: string;
  lastUpdated: Date;
}

interface HistoryEvent {
  id: string;
  year: string;
  title: string;
  description: string;
  image?: string;
}

interface HistoryContent {
  introduction: string;
  events: HistoryEvent[];
  lastUpdated: Date;
}

interface VisionMissionContent {
  vision: string;
  missions: {
    id: string;
    title: string;
    description: string;
  }[];
  lastUpdated: Date;
}

interface Leader {
  id: string;
  name: string;
  position: string;
  image?: string;
}

interface Division {
  id: string;
  name: string;
  description: string;
  leader: string;
}

interface OrganizationContent {
  leaders: Leader[];
  divisions: Division[];
  structureImage: string;
  lastUpdated: Date;
}

interface KontenData {
  about: AboutContent;
  history: HistoryContent;
  visionMission: VisionMissionContent;
  organization: OrganizationContent;
}

export function useKontenData() {
  const [data, setData] = useState<KontenData>({
    about: {
      description: `Gereja Kristen Jawa (GKJ) adalah gereja yang berdiri di atas dasar firman Tuhan, 
      mengakar pada budaya Jawa, dan terpanggil untuk melayani semua orang. Kami adalah 
      bagian dari tubuh Kristus yang berkomitmen untuk memberitakan Injil dan melayani 
      sesama dengan kasih Kristus.`,
      image: "/images/church/about.jpg",
      lastUpdated: new Date(),
    },
    history: {
      introduction: `Gereja Kristen Jawa memiliki sejarah panjang dalam melayani 
      dan memberitakan Injil di tanah Jawa. Berikut adalah tonggak-tonggak 
      penting dalam perjalanan pelayanan kami:`,
      events: [
        {
          id: "1",
          year: "1950",
          title: "Pendirian Gereja",
          description: "Gereja didirikan oleh sekelompok jemaat yang rindu beribadah.",
          image: "/images/history/founding.jpg",
        },
        {
          id: "2",
          year: "1975",
          title: "Pembangunan Gedung Baru",
          description: "Pembangunan gedung gereja yang lebih besar untuk menampung jemaat yang bertumbuh.",
          image: "/images/history/building.jpg",
        },
      ],
      lastUpdated: new Date(),
    },
    visionMission: {
      vision: `Menjadi gereja yang bertumbuh dalam iman, mengakar dalam budaya, 
      dan berbuah dalam pelayanan untuk kemuliaan Tuhan.`,
      missions: [
        {
          id: "1",
          title: "Pembinaan Iman",
          description: "Membina jemaat untuk bertumbuh dalam pengenalan akan Kristus.",
        },
        {
          id: "2",
          title: "Pelayanan Holistik",
          description: "Melayani kebutuhan rohani dan jasmani jemaat serta masyarakat.",
        },
        {
          id: "3",
          title: "Kesaksian Kristiani",
          description: "Memberitakan Injil melalui kesaksian hidup dan perkataan.",
        },
      ],
      lastUpdated: new Date(),
    },
    organization: {
      leaders: [
        {
          id: "1",
          name: "Pdt. John Doe",
          position: "Pendeta Jemaat",
          image: "/images/leaders/pendeta.jpg",
        },
        {
          id: "2",
          name: "Tn. Jane Smith",
          position: "Ketua Majelis",
          image: "/images/leaders/ketua.jpg",
        },
      ],
      divisions: [
        {
          id: "1",
          name: "Komisi Anak",
          description: "Melayani anak-anak dalam pertumbuhan iman",
          leader: "Sdri. Maria",
        },
        {
          id: "2",
          name: "Komisi Pemuda",
          description: "Membina pemuda dalam pelayanan",
          leader: "Sdr. Peter",
        },
      ],
      structureImage: "/images/organization/structure.png",
      lastUpdated: new Date(),
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
    updateAbout: async () => {},
    updateHistory: async () => {},
    updateVisionMission: async () => {},
    updateOrganization: async () => {},
  };
}
