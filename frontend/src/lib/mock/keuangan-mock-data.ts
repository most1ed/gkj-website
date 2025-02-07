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
    income: 75000000,
    expense: 55000000,
    balance: 20000000,
    description: 'Biaya operasional bulanan gereja termasuk utilitas, administrasi, dan kebutuhan rutin'
  },
  {
    category: 'Pembangunan',
    income: 45000000,
    expense: 25000000,
    balance: 20000000,
    description: 'Dana pembangunan dan renovasi fasilitas gereja'
  },
  {
    category: 'Sosial',
    income: 30000000,
    expense: 22000000,
    balance: 8000000,
    description: 'Kegiatan sosial, bantuan masyarakat, dan program kepedulian'
  },
  {
    category: 'Misi',
    income: 25000000,
    expense: 18000000,
    balance: 7000000,
    description: 'Pendanaan kegiatan misi, penginjilan, dan pelayanan lintas wilayah'
  },
  {
    category: 'Pendidikan',
    income: 20000000,
    expense: 15000000,
    balance: 5000000,
    description: 'Biaya pendidikan, pelatihan rohani, dan pengembangan SDM gereja'
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
  const categories = [
    'Operasional', 
    'Pembangunan', 
    'Sosial', 
    'Misi', 
    'Pendidikan'
  ];
  
  for (let i = 0; i < months; i++) {
    const category = categories[i % categories.length];
    
    // Ensure minimum income and expense values
    const baseIncome = 30000000 + Math.random() * 15000000;
    const baseExpense = 20000000 + Math.random() * 10000000;
    
    mockData.push({
      category: `${category} ${i + 1}`,
      income: Math.max(30000000, Math.round(baseIncome)),
      expense: Math.max(20000000, Math.round(baseExpense)),
      balance: Math.round(baseIncome - baseExpense),
      description: `Proyeksi keuangan untuk ${category} - Bulan ${i + 1}`
    });
  }
  
  return mockData;
}
