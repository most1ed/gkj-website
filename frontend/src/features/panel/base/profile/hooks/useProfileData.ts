import { useState, useEffect } from "react";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  birthDate: Date;
  gender: "male" | "female";
  baptismDate?: Date;
  marriageDate?: Date;
  familyCardNumber?: string;
  familyRole: "head" | "spouse" | "child" | "other";
  photo?: string;
  wilayah: string;
  status: "active" | "inactive";
  roles: string[];
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface AccountSettings {
  emailNotifications: boolean;
  whatsappNotifications: boolean;
  language: "id" | "en";
  theme: "light" | "dark" | "system";
  twoFactorEnabled: boolean;
}

interface ProfileData {
  profile: UserProfile;
  settings: AccountSettings;
  stats: {
    totalDocuments: number;
    totalEvents: number;
    totalOfferings: number;
    lastDocumentRequest?: Date;
    lastEventRegistration?: Date;
    lastOffering?: Date;
  };
}

export function useProfileData() {
  const [data, setData] = useState<ProfileData>({
    profile: {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+62 812-3456-7890",
      address: "Jl. Contoh No. 123",
      birthDate: new Date("1990-01-01"),
      gender: "male",
      baptismDate: new Date("2000-01-01"),
      marriageDate: new Date("2015-01-01"),
      familyCardNumber: "1234567890",
      familyRole: "head",
      photo: "/images/avatars/john-doe.jpg",
      wilayah: "Wilayah 1",
      status: "active",
      roles: ["user"],
      lastLogin: new Date("2024-01-26T10:00:00"),
      createdAt: new Date("2020-01-01"),
      updatedAt: new Date("2024-01-01"),
    },
    settings: {
      emailNotifications: true,
      whatsappNotifications: true,
      language: "id",
      theme: "system",
      twoFactorEnabled: false,
    },
    stats: {
      totalDocuments: 5,
      totalEvents: 3,
      totalOfferings: 12,
      lastDocumentRequest: new Date("2024-01-20"),
      lastEventRegistration: new Date("2024-01-15"),
      lastOffering: new Date("2024-01-25"),
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
    updateProfile: async () => {},
    updateSettings: async () => {},
    updatePassword: async () => {},
    uploadPhoto: async () => {},
    enable2FA: async () => {},
    disable2FA: async () => {},
  };
}
