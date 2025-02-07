// Financial Flow Sankey Data
export interface SankeyNode {
  name: string;
  category: 'income' | 'flow' | 'expense';
  description?: string;
}

export interface SankeyLink {
  source: number;
  target: number;
  value: number;
  gradientKey: string;
  description?: string;
}

export interface SankeyData {
  nodes: SankeyNode[];
  links: SankeyLink[];
}

export const FINANCIAL_PALETTE = {
  income: {
    base: '#B0BEC5',          // Neutral gray for income
    hover: '#90A4AE',
    variants: {
      persepuluhan: '#B0BEC5',
      persembahan: '#90A4AE',
      donasi: '#78909C',
      lainnya: '#607D8B'
    }
  },
  flow: {
    profit: '#66BB6A',        // Green for profit flows
    profitLight: '#81C784',
    profitDark: '#4CAF50',
    expense: '#EF5350',       // Red for expense flows
    expenseLight: '#E57373',
    expenseDark: '#D32F2F'
  },
  text: {
    light: '#2D3748',
    dark: '#E2E8F0'
  },
  background: {
    light: '#FFFFFF',
    dark: '#1A202C'
  }
};

export const COMPREHENSIVE_SANKEY_DATA: SankeyData = {
  nodes: [
    // Income Sources (Left)
    { 
      name: 'Persepuluhan',
      category: 'income',
      description: 'Persembahan rutin sesuai prinsip perpuluhan'
    },
    { 
      name: 'Persembahan Mingguan',
      category: 'income',
      description: 'Kolekte dan persembahan dalam ibadah mingguan'
    },
    { 
      name: 'Donasi Khusus',
      category: 'income',
      description: 'Sumbangan untuk proyek atau kebutuhan spesifik'
    },
    { 
      name: 'Pendapatan Lainnya',
      category: 'income',
      description: 'Sumber pendapatan tambahan di luar kategori utama'
    },
    
    // Flow Transformations (Middle)
    { 
      name: 'Total Pendapatan',
      category: 'flow',
      description: 'Akumulasi seluruh sumber pendapatan'
    },
    { 
      name: 'Pendapatan Operasional',
      category: 'flow',
      description: 'Pendapatan yang digunakan untuk kegiatan operasional'
    },
    { 
      name: 'Pendapatan Bersih',
      category: 'flow',
      description: 'Sisa pendapatan setelah pengurangan biaya operasional'
    },
    
    // Expense Categories (Right)
    { 
      name: 'Biaya Operasional',
      category: 'expense',
      description: 'Biaya rutin untuk menjalankan kegiatan gereja'
    },
    { 
      name: 'Gaji & Tunjangan',
      category: 'expense',
      description: 'Kompensasi untuk staf dan pelayan gereja'
    },
    { 
      name: 'Pemeliharaan',
      category: 'expense',
      description: 'Biaya perawatan gedung dan fasilitas'
    },
    { 
      name: 'Program Pelayanan',
      category: 'expense',
      description: 'Anggaran untuk kegiatan dan program pelayanan'
    },
    {
      name: 'Pengembangan Misi',
      category: 'expense',
      description: 'Investasi untuk kegiatan misi dan penginjilan'
    }
  ],
  links: [
    // Income to Total Revenue
    { 
      source: 0, 
      target: 4, 
      value: 85000000, 
      gradientKey: 'income-flow',
      description: 'Persepuluhan dialirkan ke Total Pendapatan'
    },
    { 
      source: 1, 
      target: 4, 
      value: 65000000, 
      gradientKey: 'income-flow',
      description: 'Persembahan Mingguan dialirkan ke Total Pendapatan'
    },
    { 
      source: 2, 
      target: 4, 
      value: 45000000, 
      gradientKey: 'income-flow',
      description: 'Donasi Khusus dialirkan ke Total Pendapatan'
    },
    { 
      source: 3, 
      target: 4, 
      value: 35000000, 
      gradientKey: 'income-flow',
      description: 'Pendapatan Lainnya dialirkan ke Total Pendapatan'
    },

    // Revenue Flow
    { 
      source: 4, 
      target: 5, 
      value: 230000000, 
      gradientKey: 'profit-flow',
      description: 'Total Pendapatan dialirkan ke Pendapatan Operasional'
    },
    { 
      source: 5, 
      target: 6, 
      value: 170000000, 
      gradientKey: 'profit-flow',
      description: 'Pendapatan Operasional dikurangi biaya menjadi Pendapatan Bersih'
    },

    // Expenses from Operating Income
    { 
      source: 5, 
      target: 7, 
      value: 45000000, 
      gradientKey: 'expense-flow',
      description: 'Biaya Operasional dikeluarkan dari Pendapatan Operasional'
    },
    { 
      source: 5, 
      target: 8, 
      value: 40000000, 
      gradientKey: 'expense-flow',
      description: 'Gaji & Tunjangan dikeluarkan dari Pendapatan Operasional'
    },
    { 
      source: 5, 
      target: 9, 
      value: 30000000, 
      gradientKey: 'expense-flow',
      description: 'Biaya Pemeliharaan dikeluarkan dari Pendapatan Operasional'
    },
    { 
      source: 5, 
      target: 10, 
      value: 25000000, 
      gradientKey: 'expense-flow',
      description: 'Biaya Program Pelayanan dikeluarkan dari Pendapatan Operasional'
    },
    { 
      source: 5, 
      target: 11, 
      value: 20000000, 
      gradientKey: 'expense-flow',
      description: 'Investasi Pengembangan Misi dari Pendapatan Operasional'
    }
  ]
};
