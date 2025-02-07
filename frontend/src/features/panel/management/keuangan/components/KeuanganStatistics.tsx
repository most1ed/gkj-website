import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Sankey, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { formatCurrency } from '@/lib/utils';
import { logError } from '@/lib/error-logging';
import { useTheme } from '@/components/common/theme/ThemeProvider';
import { cn } from '@/lib/utils';
import { 
  FINANCIAL_PALETTE, 
  COMPREHENSIVE_SANKEY_DATA,
  SankeyData,
  SankeyNode,
  SankeyLink
} from '../data/sankey-financial-flow';

const SankeyGradients: React.FC = () => (
  <defs>
    <linearGradient id="income-flow" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stopColor={FINANCIAL_PALETTE.income.base} stopOpacity="0.7" />
      <stop offset="100%" stopColor={FINANCIAL_PALETTE.flow.profitLight} stopOpacity="0.9" />
    </linearGradient>
    
    <linearGradient id="profit-flow" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stopColor={FINANCIAL_PALETTE.flow.profit} stopOpacity="0.8" />
      <stop offset="100%" stopColor={FINANCIAL_PALETTE.flow.profitLight} stopOpacity="1" />
    </linearGradient>
    
    <linearGradient id="expense-flow" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stopColor={FINANCIAL_PALETTE.flow.expense} stopOpacity="0.8" />
      <stop offset="100%" stopColor={FINANCIAL_PALETTE.flow.expenseLight} stopOpacity="1" />
    </linearGradient>
  </defs>
);

interface KeuanganStatisticsProps {
  sankeyData?: SankeyData;
}

export function KeuanganStatistics({ 
  sankeyData = COMPREHENSIVE_SANKEY_DATA 
}: KeuanganStatisticsProps) {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const [selectedNode, setSelectedNode] = useState<SankeyNode | null>(null);
  const [selectedLink, setSelectedLink] = useState<SankeyLink | null>(null);

  useEffect(() => {
    console.log('🎨 Sankey Styling Debug:', {
      nodeStyles: {
        fontSize: 9,
        fontWeight: 600,
        letterSpacing: '0.03em',
        opacity: 0.9
      },
      linkStyles: {
        strokeWidth: 1,
        strokeOpacity: 0.6,
        curvature: 0.4,
        blendMode: 'soft-light'
      },
      gradientConfig: {
        incomeFlow: FINANCIAL_PALETTE.income.base,
        profitFlow: FINANCIAL_PALETTE.flow.profit,
        expenseFlow: FINANCIAL_PALETTE.flow.expense
      }
    });
  }, []);

  // Calculate totals from the new data structure
  const totalIncome = sankeyData.links
    .filter(link => link.target === 4) // Links to Total Pendapatan
    .reduce((sum, link) => sum + link.value, 0);

  const totalExpenses = sankeyData.links
    .filter(link => link.source === 5) // Links from Pendapatan Operasional
    .reduce((sum, link) => sum + link.value, 0);

  const netBalance = totalIncome - totalExpenses;

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
            "text-xl font-bold tracking-tight flex justify-between items-center",
            isDarkMode ? "text-gray-100" : "text-gray-900"
          )}
        >
          Aliran Keuangan Gereja
          {selectedNode && (
            <span className="text-sm font-medium text-gray-500">
              {selectedNode.description}
            </span>
          )}
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
              value: netBalance, 
              color: netBalance >= 0 ? 'text-blue-600' : 'text-red-600'
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

        {/* Enhanced Sankey Diagram */}
        <div className={cn(
          "sankey-diagram-container",
          isDarkMode ? "dark" : ""
        )}>
          <div 
            className={cn(
              "sankey-diagram-background",
              isDarkMode ? "dark" : ""
            )}
          />
          <ResponsiveContainer width="100%" height="100%">
            <Sankey
              data={sankeyData}
              node={{
                fill: (node) => {
                  switch(node.category) {
                    case 'income':
                      return FINANCIAL_PALETTE.income.base;
                    case 'flow':
                      return FINANCIAL_PALETTE.flow.profit;
                    case 'expense':
                      return FINANCIAL_PALETTE.flow.expense;
                    default:
                      return FINANCIAL_PALETTE.income.base;
                  }
                },
                stroke: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                strokeWidth: 1,
                label: {
                  fontSize: 12,
                  fontWeight: 600,
                  fill: isDarkMode ? FINANCIAL_PALETTE.text.dark : FINANCIAL_PALETTE.text.light,
                  position: 'outside',
                  dy: -20,
                  dx: (node) => node.category === 'income' ? -60 : node.category === 'expense' ? 60 : 0,
                  className: 'sankey-node-label'
                },
                onClick: (node) => {
                  setSelectedNode(node);
                  setSelectedLink(null);
                }
              }}
              link={{ 
                stroke: (link) => `url(#${link.gradientKey})`,
                strokeWidth: 4,
                fill: 'none',
                strokeOpacity: 0.9,
                curvature: 0.5,
                className: 'sankey-link',
                onClick: (link) => {
                  setSelectedLink(link);
                  setSelectedNode(null);
                }
              }}
              nodePadding={40}
              nodeWidth={40}
              margin={{
                left: 120,
                right: 120,
                top: 60,
                bottom: 60
              }}
              iterations={64}
            >
              <SankeyGradients />
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload) return null;
                  const data = payload[0]?.payload;
                  
                  return (
                    <div className="sankey-tooltip">
                      <p className="sankey-tooltip-title">{data?.name}</p>
                      <p className="sankey-tooltip-value">{formatCurrency(data?.value || 0)}</p>
                      {data?.description && (
                        <p className="text-xs text-gray-500 mt-1">{data.description}</p>
                      )}
                    </div>
                  );
                }}
              />
            </Sankey>
          </ResponsiveContainer>
        </div>

        {/* Detailed Node/Link Information */}
        {(selectedNode || selectedLink) && (
          <div 
            className={cn(
              "p-4 rounded-lg transition-all duration-300 mt-4",
              isDarkMode 
                ? "bg-gray-700 text-gray-100" 
                : "bg-gray-100 text-gray-900"
            )}
          >
            {selectedNode && (
              <div>
                <h3 className="text-lg font-bold mb-2">{selectedNode.name}</h3>
                <p className="text-sm text-gray-600">{selectedNode.description}</p>
              </div>
            )}
            {selectedLink && (
              <div>
                <h3 className="text-lg font-bold mb-2">Aliran Dana</h3>
                <p className="text-sm">
                  {sankeyData.nodes[selectedLink.source].name} → {sankeyData.nodes[selectedLink.target].name}
                </p>
                <p className="text-sm font-medium mt-1">
                  Jumlah: {formatCurrency(selectedLink.value)}
                </p>
                {selectedLink.description && (
                  <p className="text-xs text-gray-600 mt-2">
                    {selectedLink.description}
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
