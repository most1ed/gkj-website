import React from 'react';
import { 
  ResponsiveContainer, 
  Sankey, 
  Tooltip
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import { useTheme } from '@/components/common/theme/ThemeProvider';
import { cn } from '@/lib/utils';
import { 
  COMPREHENSIVE_SANKEY_DATA, 
  FINANCIAL_PALETTE,
  SankeyData 
} from '../data/sankey-financial-flow';

interface ChurchSankeyChartProps {
  sankeyData?: SankeyData;
}

const ChurchSankeyChart: React.FC<ChurchSankeyChartProps> = ({ sankeyData }) => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  const finalSankeyData = sankeyData || COMPREHENSIVE_SANKEY_DATA;

  // Calculate totals
  const totalIncome = finalSankeyData.links
    .filter(link => link.source < 4 && link.target === 4)
    .reduce((sum, link) => sum + link.value, 0);

  const totalExpenses = finalSankeyData.links
    .filter(link => link.source === 5 && link.target >= 7)
    .reduce((sum, link) => sum + link.value, 0);

  return (
    <Card className={cn(
      "w-full overflow-hidden",
      isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"
    )}>
      <CardHeader className="p-4">
        <CardTitle className="flex items-center justify-between">
          <span>Aliran Kas Keuangan Gereja</span>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-1" 
                style={{ backgroundColor: FINANCIAL_PALETTE.flow.profitLight }} 
              />
              <span className="text-xs">Pemasukan</span>
            </div>
            <div className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-1" 
                style={{ backgroundColor: FINANCIAL_PALETTE.flow.expenseLight }} 
              />
              <span className="text-xs">Pengeluaran</span>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="w-full h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <Sankey
              data={finalSankeyData}
              node={{
                nodePadding: 50,
                nodeWidth: 10,
                fill: (node: any) => {
                  switch (node.category) {
                    case 'income':
                      return FINANCIAL_PALETTE.income.base;
                    case 'flow':
                      return FINANCIAL_PALETTE.flow.profit;
                    case 'expense':
                      return FINANCIAL_PALETTE.flow.expense;
                    default:
                      return '#999';
                  }
                }
              }}
              link={{
                stroke: (link: any) => {
                  switch (link.gradientKey) {
                    case 'income-flow':
                      return FINANCIAL_PALETTE.flow.profitLight;
                    case 'profit-flow':
                      return FINANCIAL_PALETTE.flow.profit;
                    case 'expense-flow':
                      return FINANCIAL_PALETTE.flow.expenseLight;
                    default:
                      return '#999';
                  }
                }
              }}
              margin={{ top: 20, right: 160, bottom: 20, left: 160 }}
            >
              <Tooltip 
                content={({ active, payload }) => {
                  if (!active || !payload || !payload.length) return null;
                  const data = payload[0];
                  const node = data.payload;
                  return (
                    <div className="bg-white dark:bg-gray-800 p-2 shadow rounded border dark:border-gray-700">
                      <p className="text-sm font-medium">
                        {node.description || node.name}
                      </p>
                      {data.value && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {formatCurrency(data.value)}
                        </p>
                      )}
                    </div>
                  );
                }}
              />
            </Sankey>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mt-4 text-center">
          <div>
            <div className="text-sm text-gray-500">Total Pemasukan</div>
            <div className="text-lg font-semibold text-green-600">
              {formatCurrency(totalIncome)}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Total Pengeluaran</div>
            <div className="text-lg font-semibold text-red-600">
              {formatCurrency(totalExpenses)}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Saldo</div>
            <div className={cn(
              "text-lg font-semibold",
              totalIncome - totalExpenses >= 0 ? "text-green-600" : "text-red-600"
            )}>
              {formatCurrency(totalIncome - totalExpenses)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChurchSankeyChart;
