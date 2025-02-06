// Mock Data for Keuangan (Financial) Pages and Statistics

export interface KeuanganData {
  category: string;
  income: number;
  expense: number;
  balance: number;
  description?: string;
}

export interface KeuanganSummary {
  totalIncome: number;
  totalExpense: number;
  netBalance: number;
}

export const mockKeuanganStatisticsData: KeuanganData[] = [
  {
    category: 'Operasional',
    income: 50000000,
    expense: 35000000,
    balance: 15000000,
    description: 'Biaya operasional bulanan gereja'
  },
  {
    category: 'Pembangunan',
    income: 25000000,
    expense: 10000000,
    balance: 15000000,
    description: 'Dana pembangunan gedung gereja'
  },
  {
    category: 'Sosial',
    income: 15000000,
    expense: 12000000,
    balance: 3000000,
    description: 'Kegiatan sosial dan bantuan masyarakat'
  }
];

export const mockKeuanganSummary: KeuanganSummary = {
  totalIncome: mockKeuanganStatisticsData.reduce((sum, item) => sum + item.income, 0),
  totalExpense: mockKeuanganStatisticsData.reduce((sum, item) => sum + item.expense, 0),
  netBalance: mockKeuanganStatisticsData.reduce((sum, item) => sum + item.balance, 0)
};

export const mockKeuanganTransactions = [
  {
    id: 'TRX001',
    date: '2024-02-01',
    category: 'Operasional',
    type: 'income',
    amount: 10000000,
    description: 'Persembahan Minggu'
  },
  {
    id: 'TRX002',
    date: '2024-02-05',
    category: 'Pembangunan',
    type: 'expense',
    amount: 5000000,
    description: 'Pembelian material konstruksi'
  },
  {
    id: 'TRX003',
    date: '2024-02-10',
    category: 'Sosial',
    type: 'expense',
    amount: 2000000,
    description: 'Bantuan untuk korban bencana'
  },
  {
    id: 'TRX004',
    date: '2024-02-15',
    category: 'Operasional',
    type: 'income',
    amount: 15000000,
    description: 'Sumbangan khusus'
  }
];

// Function to generate more dynamic mock data
export function generateMockKeuanganData(months: number = 6): KeuanganData[] {
  const mockData: KeuanganData[] = [];
  const categories = ['Operasional', 'Pembangunan', 'Sosial', 'Misi', 'Pendidikan'];
  
  for (let i = 0; i < months; i++) {
    const category = categories[i % categories.length];
    const baseIncome = 20000000 + Math.random() * 10000000;
    const baseExpense = 15000000 + Math.random() * 8000000;
    
    mockData.push({
      category: `${category} ${i + 1}`,
      income: Math.round(baseIncome),
      expense: Math.round(baseExpense),
      balance: Math.round(baseIncome - baseExpense),
      description: `Mock data for ${category} - Month ${i + 1}`
    });
  }
  
  return mockData;
}
