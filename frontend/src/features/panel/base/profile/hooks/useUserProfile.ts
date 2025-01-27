import { useState, useEffect } from "react";

interface UserProfileData {
  name: string;
  memberNumber: string;
  region: string;
  photo?: string;
  personal: {
    name: string;
    gender: string;
    birthPlace: string;
    birthDate: Date;
    address: string;
    phone: string;
    email: string;
    occupation: string;
    education: string;
    baptismDate?: Date;
    confirmationDate?: Date;
    marriageDate?: Date;
    photo?: string;
  };
  family: {
    familyCardNumber: string;
    familyHead: string;
    address: string;
    region: string;
    members: {
      id: string;
      name: string;
      role: string;
      birthDate: Date;
      gender: string;
      baptismDate?: Date;
      confirmationDate?: Date;
      status: "active" | "inactive" | "moved" | "deceased";
    }[];
  };
  activities: {
    activities: {
      id: string;
      type: "worship" | "fellowship" | "service" | "training" | "other";
      title: string;
      role: string;
      date: Date;
      status: "upcoming" | "ongoing" | "completed";
    }[];
    commissions: {
      id: string;
      name: string;
      role: string;
      startDate: Date;
      endDate?: Date;
      status: "active" | "inactive";
    }[];
    stats: {
      totalActivities: number;
      upcomingActivities: number;
      totalCommissions: number;
      activeCommissions: number;
    };
  };
}

export function useUserProfile() {
  const [data, setData] = useState<UserProfileData>({
    name: "John Doe",
    memberNumber: "GKJ-2024-001",
    region: "Wilayah 1",
    photo: "/images/profile/john-doe.jpg",
    personal: {
      name: "John Doe",
      gender: "Laki-laki",
      birthPlace: "Yogyakarta",
      birthDate: new Date("1990-01-01"),
      address: "Jl. Magelang No. 123",
      phone: "08123456789",
      email: "john.doe@email.com",
      occupation: "Software Engineer",
      education: "S1 Teknik Informatika",
      baptismDate: new Date("1990-03-15"),
      confirmationDate: new Date("2005-04-20"),
      marriageDate: new Date("2015-06-12"),
      photo: "/images/profile/john-doe.jpg",
    },
    family: {
      familyCardNumber: "3404012345678901",
      familyHead: "John Doe",
      address: "Jl. Magelang No. 123",
      region: "Wilayah 1",
      members: [
        {
          id: "1",
          name: "John Doe",
          role: "Kepala Keluarga",
          birthDate: new Date("1990-01-01"),
          gender: "Laki-laki",
          baptismDate: new Date("1990-03-15"),
          confirmationDate: new Date("2005-04-20"),
          status: "active",
        },
        {
          id: "2",
          name: "Jane Doe",
          role: "Istri",
          birthDate: new Date("1992-05-15"),
          gender: "Perempuan",
          baptismDate: new Date("1992-07-20"),
          confirmationDate: new Date("2007-08-25"),
          status: "active",
        },
        {
          id: "3",
          name: "Baby Doe",
          role: "Anak",
          birthDate: new Date("2016-10-10"),
          gender: "Laki-laki",
          baptismDate: new Date("2016-12-25"),
          status: "active",
        },
      ],
    },
    activities: {
      activities: [
        {
          id: "1",
          type: "worship",
          title: "Ibadah Minggu",
          role: "Pemusik",
          date: new Date("2024-01-28"),
          status: "upcoming",
        },
        {
          id: "2",
          type: "service",
          title: "Pelayanan Diakonia",
          role: "Koordinator",
          date: new Date("2024-01-20"),
          status: "completed",
        },
        {
          id: "3",
          type: "fellowship",
          title: "Persekutuan Doa",
          role: "Peserta",
          date: new Date("2024-01-25"),
          status: "upcoming",
        },
      ],
      commissions: [
        {
          id: "1",
          name: "Komisi Musik",
          role: "Anggota",
          startDate: new Date("2020-01-01"),
          status: "active",
        },
        {
          id: "2",
          name: "Komisi Diakonia",
          role: "Koordinator",
          startDate: new Date("2022-01-01"),
          status: "active",
        },
        {
          id: "3",
          name: "Komisi Pemuda",
          role: "Anggota",
          startDate: new Date("2018-01-01"),
          endDate: new Date("2021-12-31"),
          status: "inactive",
        },
      ],
      stats: {
        totalActivities: 25,
        upcomingActivities: 5,
        totalCommissions: 3,
        activeCommissions: 2,
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
    updatePersonalInfo: async () => {},
    updateFamilyInfo: async () => {},
    addFamilyMember: async () => {},
    updateFamilyMember: async () => {},
    getActivityHistory: async () => {},
    getCommissionHistory: async () => {},
  };
}
