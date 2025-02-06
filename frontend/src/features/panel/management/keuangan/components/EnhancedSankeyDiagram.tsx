import React from 'react';
import { ResponsiveContainer, Sankey, Tooltip } from 'recharts';
import { SankeyData } from '../data/sankey-financial-flow';
import { FINANCIAL_PALETTE } from '../data/sankey-financial-flow';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/utils';

interface EnhancedSankeyDiagramProps {
  data: SankeyData;
  isDarkMode?: boolean;
}

export const EnhancedSankeyDiagram: React.FC<EnhancedSankeyDiagramProps> = ({ 
  data, 
  isDarkMode = false 
}) => {
  return (
    <div className="w-full h-[700px] relative">
      {/* Background Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px)',
          backgroundSize: '20px 100%'
        }}
      />
      <ResponsiveContainer width="100%" height="100%">
        <Sankey
          data={data}
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
              fontWeight: 'bold',
              fill: isDarkMode ? '#E2E8F0' : '#2D3748',
              position: 'outside',
              dy: -20,
              dx: (node) => node.category === 'income' ? -60 : node.category === 'expense' ? 60 : 0
            }
          }}
          link={{ 
            stroke: (link) => `url(#${link.gradientKey})`,
            strokeWidth: 4,
            fill: 'none',
            strokeOpacity: 0.9,
            curvature: 0.5
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
          <defs>
            <linearGradient id="income-flow" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={FINANCIAL_PALETTE.income.base} stopOpacity={0.8} />
              <stop offset="100%" stopColor={FINANCIAL_PALETTE.flow.profitLight} stopOpacity={0.8} />
            </linearGradient>
            <linearGradient id="profit-flow" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={FINANCIAL_PALETTE.flow.profit} stopOpacity={0.8} />
              <stop offset="100%" stopColor={FINANCIAL_PALETTE.flow.profitLight} stopOpacity={0.8} />
            </linearGradient>
            <linearGradient id="expense-flow" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={FINANCIAL_PALETTE.flow.expense} stopOpacity={0.8} />
              <stop offset="100%" stopColor={FINANCIAL_PALETTE.flow.expenseLight} stopOpacity={0.8} />
            </linearGradient>
          </defs>
          <Tooltip
            content={({ active, payload }) => {
              if (!active || !payload) return null;
              const data = payload[0]?.payload;
              
              return (
                <div className={cn(
                  'p-3 rounded-lg shadow-lg border',
                  isDarkMode 
                    ? 'bg-gray-800/90 border-gray-700 text-white' 
                    : 'bg-white/90 border-gray-200 text-gray-900'
                )}>
                  <p className="font-bold mb-1">{data?.name}</p>
                  <p className="text-sm">{formatCurrency(data?.value || 0)}</p>
                </div>
              );
            }}
          />
        </Sankey>
      </ResponsiveContainer>
    </div>
  );
};
