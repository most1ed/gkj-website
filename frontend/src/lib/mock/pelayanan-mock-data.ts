// Mock Data for Pelayanan (Service) Pages and Statistics

export interface PelayananData {
  category: string;
  totalPersonnel: number;
  activePersonnel: number;
  newRecruits: number;
  description?: string;
}

export const mockPelayananStatisticsData: PelayananData[] = [
  {
    category: 'Musik & Worship',
    totalPersonnel: 25,
    activePersonnel: 20,
    newRecruits: 5,
    description: 'Tim musik dan pujian'
  },
  {
    category: 'Diakonia',
    totalPersonnel: 15,
    activePersonnel: 12,
    newRecruits: 3,
    description: 'Pelayanan sosial dan kepedulian'
  },
  {
    category: 'Pengajaran',
    totalPersonnel: 20,
    activePersonnel: 18,
    newRecruits: 2,
    description: 'Pendidikan dan pembinaan jemaat'
  }
];

export const mockPelayananSummary = {
  totalPersonnel: mockPelayananStatisticsData.reduce((sum, item) => sum + item.totalPersonnel, 0),
  activePersonnel: mockPelayananStatisticsData.reduce((sum, item) => sum + item.activePersonnel, 0),
  newRecruits: mockPelayananStatisticsData.reduce((sum, item) => sum + item.newRecruits, 0)
};

export const mockPelayananPersonnel = [
  {
    id: 'PEL001',
    name: 'John Doe',
    category: 'Musik & Worship',
    role: 'Worship Leader',
    status: 'Active',
    joinDate: '2023-01-15'
  },
  {
    id: 'PEL002',
    name: 'Jane Smith',
    category: 'Diakonia',
    role: 'Social Worker',
    status: 'Active',
    joinDate: '2022-11-20'
  },
  {
    id: 'PEL003',
    name: 'Michael Wong',
    category: 'Pengajaran',
    role: 'Sunday School Teacher',
    status: 'New Recruit',
    joinDate: '2024-01-10'
  }
];

// Function to generate more dynamic mock data
export function generateMockPelayananData(categories: string[] = ['Musik & Worship', 'Diakonia', 'Pengajaran', 'Pemuda', 'Anak']): PelayananData[] {
  return categories.map(category => ({
    category,
    totalPersonnel: Math.floor(Math.random() * 30) + 10,
    activePersonnel: Math.floor(Math.random() * 25) + 5,
    newRecruits: Math.floor(Math.random() * 10) + 1,
    description: `Tim pelayanan ${category}`
  }));
}
