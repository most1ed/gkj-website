import { useState, useEffect } from "react";

interface Jemaat {
  id: string;
  name: string;
  memberNumber: string;
  gender: string;
  birthDate: Date;
  address: string;
  phone: string;
  email: string;
  familyCardNumber: string;
  familyRole: string;
  baptismDate?: Date;
  confirmationDate?: Date;
  marriageDate?: Date;
  region: string;
  status: "active" | "inactive" | "moved" | "deceased";
  photo?: string;
}

interface Family {
  id: string;
  familyCardNumber: string;
  familyHead: string;
  address: string;
  region: string;
  memberCount: number;
  status: "active" | "inactive";
}

interface Region {
  id: string;
  name: string;
  coordinator: string;
  familyCount: number;
  memberCount: number;
}

interface JemaatStats {
  totalMembers: number;
  activeMembers: number;
  totalFamilies: number;
  activeFamilies: number;
  membersByGender: {
    male: number;
    female: number;
  };
  membersByAge: {
    children: number; // 0-12
    youth: number; // 13-25
    adult: number; // 26-60
    elderly: number; // 60+
  };
  membersByRegion: {
    [key: string]: number;
  };
}

interface JemaatData {
  jemaat: Jemaat[];
  families: Family[];
  regions: Region[];
  stats: JemaatStats;
}

export function useJemaatData() {
  const [data, setData] = useState<JemaatData>({
    jemaat: [
      {
        id: "1",
        name: "John Doe",
        memberNumber: "GKJ-2024-001",
        gender: "Laki-laki",
        birthDate: new Date("1990-01-01"),
        address: "Jl. Magelang No. 123",
        phone: "08123456789",
        email: "john.doe@email.com",
        familyCardNumber: "3404012345678901",
        familyRole: "Kepala Keluarga",
        baptismDate: new Date("1990-03-15"),
        confirmationDate: new Date("2005-04-20"),
        marriageDate: new Date("2015-06-12"),
        region: "Wilayah 1",
        status: "active",
        photo: "/images/profile/john-doe.jpg",
      },
      {
        id: "2",
        name: "Jane Doe",
        memberNumber: "GKJ-2024-002",
        gender: "Perempuan",
        birthDate: new Date("1992-05-15"),
        address: "Jl. Magelang No. 123",
        phone: "08123456790",
        email: "jane.doe@email.com",
        familyCardNumber: "3404012345678901",
        familyRole: "Istri",
        baptismDate: new Date("1992-07-20"),
        confirmationDate: new Date("2007-08-25"),
        marriageDate: new Date("2015-06-12"),
        region: "Wilayah 1",
        status: "active",
        photo: "/images/profile/jane-doe.jpg",
      },
    ],
    families: [
      {
        id: "1",
        familyCardNumber: "3404012345678901",
        familyHead: "John Doe",
        address: "Jl. Magelang No. 123",
        region: "Wilayah 1",
        memberCount: 3,
        status: "active",
      },
      {
        id: "2",
        familyCardNumber: "3404012345678902",
        familyHead: "James Smith",
        address: "Jl. Magelang No. 456",
        region: "Wilayah 2",
        memberCount: 4,
        status: "active",
      },
    ],
    regions: [
      {
        id: "1",
        name: "Wilayah 1",
        coordinator: "Peter Johnson",
        familyCount: 25,
        memberCount: 75,
      },
      {
        id: "2",
        name: "Wilayah 2",
        coordinator: "Mary Williams",
        familyCount: 30,
        memberCount: 90,
      },
    ],
    stats: {
      totalMembers: 500,
      activeMembers: 450,
      totalFamilies: 150,
      activeFamilies: 140,
      membersByGender: {
        male: 240,
        female: 260,
      },
      membersByAge: {
        children: 100,
        youth: 150,
        adult: 200,
        elderly: 50,
      },
      membersByRegion: {
        "Wilayah 1": 75,
        "Wilayah 2": 90,
        "Wilayah 3": 85,
        "Wilayah 4": 100,
        "Wilayah 5": 150,
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
    getJemaatDetails: async () => {},
    getFamilyDetails: async () => {},
    getRegionDetails: async () => {},
    addJemaat: async () => {},
    updateJemaat: async () => {},
    addFamily: async () => {},
    updateFamily: async () => {},
    addRegion: async () => {},
    updateRegion: async () => {},
    generateStatistics: async () => {},
  };
}
