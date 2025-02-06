import React from 'react';
import { 
  ResponsiveContainer, 
  Sankey, 
  Tooltip, 
  TooltipProps 
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import { useTheme } from '@/components/common/theme/ThemeProvider';
import { cn } from '@/lib/utils';

// Enhanced Color Palette for Financial Flow
const FINANCIAL_COLORS = {
  // Income Colors (Shades of Green)
  income: {
    primary: '#4CAF50',    // Main Green
    light: '#81C784',      // Light Green
    dark: '#2E7D32'        // Dark Green
  },
  
  // Expense Colors (Shades of Red)
  expenses: {
    primary: '#F44336',    // Main Red
    light: '#E57373',      // Light Red
    dark: '#D32F2F'        // Dark Red
  },
  
  // Specific Category Colors
  categories: {
    tithe: '#2196F3',            // Blue
    weeklyOffering: '#00BCD4',   // Cyan
    donation: '#FF5722',         // Deep Orange
    otherIncome: '#9C27B0',      // Purple
    
    staffSalary: '#E91E63',      // Pink
    operational: '#FF9800',      // Orange
    worship: '#3F51B5',          // Indigo
    social: '#009688',           // Teal
    maintenance: '#795548',      // Brown
    youth: '#673AB7',            // Deep Purple
    reserve: '#607D8B'           // Blue Grey
  }
};

// Sankey Diagram Data Structure
export interface SankeyNode {
  name: string;
  color?: string;
}

export interface SankeyLink {
  source: number;
  target: number;
  value: number;
  color?: string;
}

export interface SankeyData {
  nodes: SankeyNode[];
  links: SankeyLink[];
}

// Default Sankey Data with Enhanced Structure
export const DEFAULT_CHURCH_SANKEY_DATA: SankeyData = {
  nodes: [
    { name: "Pemasukan", color: FINANCIAL_COLORS.income.primary },
    { name: "Persepuluhan", color: FINANCIAL_COLORS.categories.tithe },
    { name: "Persembahan Mingguan", color: FINANCIAL_COLORS.categories.weeklyOffering },
    { name: "Donasi", color: FINANCIAL_COLORS.categories.donation },
    { name: "Pendapatan Lain", color: FINANCIAL_COLORS.categories.otherIncome },
    { name: "Total Pemasukan", color: FINANCIAL_COLORS.income.dark },
    { name: "Pengeluaran", color: FINANCIAL_COLORS.expenses.primary },
    { name: "Gaji Pelayan", color: FINANCIAL_COLORS.categories.staffSalary },
    { name: "Biaya Operasional", color: FINANCIAL_COLORS.categories.operational },
    { name: "Pelayanan Ibadah", color: FINANCIAL_COLORS.categories.worship },
    { name: "Pelayanan Sosial", color: FINANCIAL_COLORS.categories.social },
    { name: "Pemeliharaan", color: FINANCIAL_COLORS.categories.maintenance },
    { name: "Kegiatan Pemuda", color: FINANCIAL_COLORS.categories.youth },
    { name: "Dana Cadangan", color: FINANCIAL_COLORS.categories.reserve }
  ],
  links: [
    { source: 0, target: 1, value: 70000000, color: 'rgba(33, 150, 243, 0.5)' },
    { source: 0, target: 2, value: 50000000, color: 'rgba(0, 188, 212, 0.5)' },
    { source: 0, target: 3, value: 30000000, color: 'rgba(255, 87, 34, 0.5)' },
    { source: 0, target: 4, value: 20000000, color: 'rgba(156, 39, 176, 0.5)' },
    { source: 1, target: 5, value: 70000000, color: 'rgba(33, 150, 243, 0.7)' },
    { source: 2, target: 5, value: 50000000, color: 'rgba(0, 188, 212, 0.7)' },
    { source: 3, target: 5, value: 30000000, color: 'rgba(255, 87, 34, 0.7)' },
    { source: 4, target: 5, value: 20000000, color: 'rgba(156, 39, 176, 0.7)' },
    { source: 5, target: 6, value: 150000000, color: 'rgba(244, 67, 54, 0.5)' },
    { source: 6, target: 7, value: 40000000, color: 'rgba(233, 30, 63, 0.5)' },
    { source: 6, target: 8, value: 30000000, color: 'rgba(255, 152, 0, 0.5)' },
    { source: 6, target: 9, value: 20000000, color: 'rgba(63, 81, 181, 0.5)' },
    { source: 6, target: 10, value: 20000000, color: 'rgba(0, 150, 136, 0.5)' },
    { source: 6, target: 11, value: 25000000, color: 'rgba(121, 85, 72, 0.5)' },
    { source: 6, target: 12, value: 15000000, color: 'rgba(103, 58, 183, 0.5)' },
    { source: 6, target: 13, value: 10000000, color: 'rgba(96, 125, 139, 0.5)' }
  ]
};

// Custom Tooltip for Sankey Chart
const SankeyTooltip: React.FC<TooltipProps<number, string>> = ({ 
  active, 
  payload 
}) => {
  if (!active || !payload || payload.length === 0) return null;

  const { source, target, value } = payload[0].payload;
  const sourceNode = DEFAULT_CHURCH_SANKEY_DATA.nodes[source];
  const targetNode = DEFAULT_CHURCH_SANKEY_DATA.nodes[target];

  return (
    <div 
      className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border dark:border-gray-700"
      style={{ 
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)'
      }}
    >
      <div className="flex items-center mb-2">
        <div 
          className="w-4 h-4 mr-2 rounded"
          style={{ 
            backgroundColor: sourceNode.color || '#4299E1',
            opacity: 0.7
          }}
        />
        <span className="font-semibold text-sm">
          {sourceNode.name} → {targetNode.name}
        </span>
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-300">
        Aliran: {formatCurrency(value)}
      </div>
    </div>
  );
};

interface ChurchSankeyChartProps {
  sankeyData?: SankeyData;
}

const ChurchSankeyChart: React.FC<ChurchSankeyChartProps> = ({ 
  sankeyData = DEFAULT_CHURCH_SANKEY_DATA 
}) => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  // Calculate total income and expenses
  const totalIncome = sankeyData.links
    .filter(link => link.source === 5)
    .reduce((sum, link) => sum + link.value, 0);

  const totalExpenses = sankeyData.links
    .filter(link => link.source === 6)
    .reduce((sum, link) => sum + link.value, 0);

  return (
    <Card 
      className={cn(
        "w-full overflow-hidden transition-all duration-300 ease-in-out",
        isDarkMode 
          ? "bg-gray-800 text-gray-100 border-gray-700" 
          : "bg-white text-gray-900 shadow-md"
      )}
    >
      <CardHeader className="p-4 pb-0">
        <CardTitle 
          className={cn(
            "text-xl font-bold tracking-tight flex items-center justify-between",
            isDarkMode ? "text-gray-100" : "text-gray-900"
          )}
        >
          <span>Aliran Kas Keuangan Gereja</span>
          <div className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: FINANCIAL_COLORS.income.primary }} 
              title="Pemasukan"
            ></div>
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: FINANCIAL_COLORS.expenses.primary }} 
              title="Pengeluaran"
            ></div>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-4 space-y-4">
        {/* Financial Summary */}
        <div className="grid grid-cols-3 gap-4 text-center">
          {[
            { 
              label: 'Total Pemasukan', 
              value: totalIncome, 
              color: 'text-green-600' 
            },
            { 
              label: 'Total Pengeluaran', 
              value: totalExpenses, 
              color: 'text-red-600' 
            },
            { 
              label: 'Saldo Bersih', 
              value: totalIncome - totalExpenses, 
              color: totalIncome - totalExpenses >= 0 ? 'text-blue-600' : 'text-red-600'
            }
          ].map((item, index) => (
            <div 
              key={index} 
              className={cn(
                "p-3 rounded-lg transition-all duration-300",
                isDarkMode 
                  ? "bg-gray-700 hover:bg-gray-600" 
                  : "bg-gray-100 hover:bg-gray-200"
              )}
            >
              <p className="text-xs font-medium text-gray-500 mb-1">
                {item.label}
              </p>
              <p className={cn("text-lg font-bold", item.color)}>
                {formatCurrency(item.value)}
              </p>
            </div>
          ))}
        </div>

        {/* Sankey Diagram */}
        <div className="w-full h-[600px]">
          <ResponsiveContainer width="100%" height="100%">
            <Sankey
              data={sankeyData}
              node={{ 
                fill: (node) => node.color || (isDarkMode ? '#4A5568' : '#1E88E5'),
                stroke: isDarkMode ? '#718096' : '#1565C0',
                strokeWidth: 1,
                label: {
                  fontSize: 8,
                  fontWeight: 'bold',
                  fill: 'white'
                }
              }}
              link={{ 
                stroke: (link) => link.color || (isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0, 0, 0, 0.2)'),
                strokeOpacity: 0.5,
                fill: 'gradient',
                fillOpacity: 0.6,
                blendStroke: true
              }}
              nodePadding={10}
              margin={{
                left: 20,
                right: 20,
                top: 20,
                bottom: 20
              }}
            >
              <Tooltip content={<SankeyTooltip />} />
            </Sankey>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export default ChurchSankeyChart;
    },
    { 
      source: 0, 
      target: 2, 
      value: 150000000, 
      color: createLinearGradient(
        FINANCIAL_COLORS.income.base, 
        FINANCIAL_COLORS.income.nodes.persembahan.base
      )
    },
    { 
      source: 0, 
      target: 3, 
      value: 100000000, 
      color: createLinearGradient(
        FINANCIAL_COLORS.income.base, 
        FINANCIAL_COLORS.income.nodes.donasi.base
      )
    },
    { 
      source: 0, 
      target: 4, 
      value: 50000000, 
      color: createLinearGradient(
        FINANCIAL_COLORS.income.base, 
        FINANCIAL_COLORS.income.nodes.lainnya.base
      )
    },
    // Konsolidasi Pendapatan
    { 
      source: 1, 
      target: 5, 
      value: 200000000, 
      color: createLinearGradient(
        FINANCIAL_COLORS.income.nodes.persepuluhan.base, 
        FINANCIAL_COLORS.income.base
      )
    },
    { 
      source: 2, 
      target: 5, 
      value: 150000000, 
      color: createLinearGradient(
        FINANCIAL_COLORS.income.nodes.persembahan.base, 
        FINANCIAL_COLORS.income.base
      )
    },
    { 
      source: 3, 
      target: 5, 
      value: 100000000, 
      color: createLinearGradient(
        FINANCIAL_COLORS.income.nodes.donasi.base, 
        FINANCIAL_COLORS.income.base
      )
    },
    { 
      source: 4, 
      target: 5, 
      value: 50000000, 
      color: createLinearGradient(
        FINANCIAL_COLORS.income.nodes.lainnya.base, 
        FINANCIAL_COLORS.income.base
      )
    },
    // Aliran Pengeluaran dengan Gradien Spesifik
    { 
      source: 5, 
      target: 6, 
      value: 500000000, 
      color: createLinearGradient(
        FINANCIAL_COLORS.income.base, 
        FINANCIAL_COLORS.expenses.base
      )
    },
    // Sub-Aliran Pengeluaran
    { 
      source: 6, 
      target: 7, 
      value: 200000000, 
      color: createLinearGradient(
        FINANCIAL_COLORS.expenses.base, 
        FINANCIAL_COLORS.expenses.nodes.gaji.base
      )
    },
    { 
      source: 6, 
      target: 8, 
      value: 100000000, 
      color: createLinearGradient(
        FINANCIAL_COLORS.expenses.base, 
        FINANCIAL_COLORS.expenses.nodes.operasional.base
      )
    },
    { 
      source: 6, 
      target: 9, 
      value: 80000000, 
      color: createLinearGradient(
        FINANCIAL_COLORS.expenses.base, 
        FINANCIAL_COLORS.expenses.nodes.ibadah.base
      )
    },
    { 
      source: 6, 
      target: 10, 
      value: 70000000, 
      color: createLinearGradient(
        FINANCIAL_COLORS.expenses.base, 
        FINANCIAL_COLORS.expenses.nodes.sosial.base
      )
    },
    { 
      source: 6, 
      target: 11, 
      value: 50000000, 
      color: createLinearGradient(
        FINANCIAL_COLORS.expenses.base, 
        FINANCIAL_COLORS.expenses.nodes.pemeliharaan.base
      )
    }
  ]
};

console.log('Sankey Chart Data:', SANKEY_DATA);

// Tooltip Profesional dengan Informasi Detail
const SankeyTooltip: React.FC<TooltipProps<number, string>> = ({ 
  active, 
  payload 
}) => {
  if (!active || !payload || payload.length === 0) return null;

  const { source, target, value } = payload[0].payload;
  const sourceNode = SANKEY_DATA.nodes[source];
  const targetNode = SANKEY_DATA.nodes[target];

  return (
    <div 
      className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out"
      style={{ 
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        transform: 'scale(1.02)',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
      }}
    >
      <div className="flex items-center mb-2">
        <div 
          className="w-4 h-4 mr-3 rounded-sm transition-all duration-300"
          style={{ 
            background: sourceNode.color,
            opacity: 0.8,
            transform: 'scale(1.1)'
          }}
        />
        <span className="font-semibold text-sm text-gray-700 dark:text-gray-200 transition-colors duration-300">
          {sourceNode.name} → {targetNode.name}
        </span>
      </div>
      <div className="space-y-1">
        <div className="text-sm text-gray-600 dark:text-gray-300 font-mono transition-colors duration-300">
          Aliran Dana: {formatCurrency(value)}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300">
          {sourceNode.name} Total: {formatCurrency(sourceNode.totalAmount)}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300">
          {targetNode.name} Total: {formatCurrency(targetNode.totalAmount)}
        </div>
      </div>
    </div>
  );
};

// Komponen Sankey Chart dengan Spasi Optimal
const ChurchSankeyChart: React.FC = () => {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  console.log('Hovered Node:', hoveredNode);

  return (
    <Card className="w-full overflow-hidden shadow-md dark:bg-gray-900 transition-all duration-300">
      <CardHeader className="p-4 pb-0">
        <CardTitle className="text-xl font-bold tracking-tight text-gray-800 dark:text-gray-100 transition-colors duration-300">
          Aliran Keuangan Gereja
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-4">
        <ResponsiveContainer width="100%" height={500}>
          <Sankey
            data={SANKEY_DATA}
            node={{
              fill: (node, index) => {
                console.log(`Node ${index}:`, node);
                return hoveredNode !== null && hoveredNode !== index 
                  ? 'rgba(0,0,0,0.2)' 
                  : node.color;
              },
              stroke: 'transparent',
              label: {
                fontSize: 10,
                fontWeight: 600,
                fill: 'white'
              }
            }}
            link={{
              stroke: (link) => {
                console.log('Link:', link);
                return link.color;
              },
              strokeOpacity: 0.7,
              fill: 'gradient',
              fillOpacity: 0.5,
              transition: 'all 0.3s ease-in-out'
            }}
            nodePadding={40}
            margin={{
              left: 20,
              right: 20,
              top: 20,
              bottom: 20
            }}
            onMouseEnter={(_, index) => setHoveredNode(index)}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <Tooltip content={<SankeyTooltip />} />
          </Sankey>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ChurchSankeyChart;
