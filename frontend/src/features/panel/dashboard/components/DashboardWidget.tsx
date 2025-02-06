import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { 
  Maximize2, 
  Minimize2, 
  BarChart2, 
  LineChart as LineChartIcon, 
  PieChart as PieChartIcon 
} from 'lucide-react';

// Widget types and interfaces
export type WidgetType = 'bar' | 'line' | 'pie';

export interface WidgetData {
  id: string;
  title: string;
  type: WidgetType;
  data: any[];
  description?: string;
}

interface DashboardWidgetProps {
  widget: WidgetData;
  onExpand?: (id: string) => void;
  onMinimize?: (id: string) => void;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export function DashboardWidget({ 
  widget, 
  onExpand, 
  onMinimize 
}: DashboardWidgetProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const renderChart = () => {
    const chartProps = {
      width: '100%',
      height: isExpanded ? 400 : 250,
      data: widget.data
    };

    switch (widget.type) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={isExpanded ? 400 : 250}>
            <BarChart {...chartProps}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8">
                {widget.data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={isExpanded ? 400 : 250}>
            <LineChart {...chartProps}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#8884d8" 
                strokeWidth={2} 
              />
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={isExpanded ? 400 : 250}>
            <PieChart>
              <Pie
                data={widget.data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={isExpanded ? 120 : 80}
                fill="#8884d8"
                dataKey="value"
              >
                {widget.data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    if (isExpanded && onMinimize) {
      onMinimize(widget.id);
    } else if (!isExpanded && onExpand) {
      onExpand(widget.id);
    }
  };

  const renderTypeIcon = () => {
    switch (widget.type) {
      case 'bar': return <BarChart2 className="mr-2 h-4 w-4" />;
      case 'line': return <LineChartIcon className="mr-2 h-4 w-4" />;
      case 'pie': return <PieChartIcon className="mr-2 h-4 w-4" />;
    }
  };

  return (
    <Card className={`w-full transition-all duration-300 ${isExpanded ? 'col-span-2 row-span-2' : ''}`}>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center">
          {renderTypeIcon()}
          <CardTitle>{widget.title}</CardTitle>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={toggleExpand}
        >
          {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
        </Button>
      </CardHeader>
      {widget.description && (
        <CardDescription className="px-6 pb-2">
          {widget.description}
        </CardDescription>
      )}
      <CardContent>
        {renderChart()}
      </CardContent>
    </Card>
  );
}
