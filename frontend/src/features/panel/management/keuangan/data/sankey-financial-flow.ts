// Financial Flow Sankey Data
export interface SankeyNode {
  name: string;
  category: 'income' | 'flow' | 'expense';
}

export interface SankeyLink {
  source: number;
  target: number;
  value: number;
  gradientKey: string;
}

export interface SankeyData {
  nodes: SankeyNode[];
  links: SankeyLink[];
}

export const FINANCIAL_PALETTE = {
  income: {
    base: '#64B5F6',          // Light blue for income
    hover: '#42A5F5',
    variants: {
      persepuluhan: '#64B5F6',
      persembahan: '#42A5F5',
      donasi: '#2196F3',
      lainnya: '#1E88E5'
    }
  },
  flow: {
    profit: '#4CAF50',        // Green for profit flows
    profitLight: '#81C784',
    expense: '#EF5350',       // Red for expense flows
    expenseLight: '#E57373'
  }
};

export const COMPREHENSIVE_SANKEY_DATA: SankeyData = {
  nodes: [
    // Income Sources (Left)
    { 
      name: 'Persepuluhan',
      category: 'income'
    },
    { 
      name: 'Persembahan Mingguan',
      category: 'income'
    },
    { 
      name: 'Donasi Khusus',
      category: 'income'
    },
    { 
      name: 'Pendapatan Lainnya',
      category: 'income'
    },
    
    // Flow Transformations (Middle)
    { 
      name: 'Total Pendapatan',
      category: 'flow'
    },
    { 
      name: 'Pendapatan Operasional',
      category: 'flow'
    },
    { 
      name: 'Pendapatan Bersih',
      category: 'flow'
    },
    
    // Expense Categories (Right)
    { 
      name: 'Biaya Operasional',
      category: 'expense'
    },
    { 
      name: 'Gaji & Tunjangan',
      category: 'expense'
    },
    { 
      name: 'Pemeliharaan',
      category: 'expense'
    },
    { 
      name: 'Program Pelayanan',
      category: 'expense'
    }
  ],
  links: [
    // Income to Total Revenue
    { source: 0, target: 4, value: 70000000, gradientKey: 'income-flow' },  // Persepuluhan
    { source: 1, target: 4, value: 50000000, gradientKey: 'income-flow' },  // Persembahan
    { source: 2, target: 4, value: 30000000, gradientKey: 'income-flow' },  // Donasi
    { source: 3, target: 4, value: 20000000, gradientKey: 'income-flow' },  // Lainnya

    // Revenue Flow
    { source: 4, target: 5, value: 170000000, gradientKey: 'profit-flow' }, // Total ke Operasional
    { source: 5, target: 6, value: 120000000, gradientKey: 'profit-flow' }, // Operasional ke Bersih

    // Expenses from Operating Income
    { source: 5, target: 7, value: 30000000, gradientKey: 'expense-flow' },  // Biaya Operasional
    { source: 5, target: 8, value: 25000000, gradientKey: 'expense-flow' },  // Gaji
    { source: 5, target: 9, value: 20000000, gradientKey: 'expense-flow' },  // Pemeliharaan
    { source: 5, target: 10, value: 15000000, gradientKey: 'expense-flow' }  // Program
  ]
};
