import React, { useState, useEffect, useMemo } from 'react';
import { 
  Home, 
  DollarSign, 
  Users, 
  Calendar, 
  Church, 
  PlusCircle, 
  Trash2,
  Move,
  X,
  Maximize2 
} from 'lucide-react';

// Charting Library
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  PieChart, 
  Pie, 
  Cell, 
  LineChart, 
  Line, 
  ResponsiveContainer 
} from 'recharts';

// Grid Layout
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

// Zustand Store and Utilities
import { useFlexDashboardStore } from '../store/flexDashboardStore';
import { WidgetManager } from '../utils/widgetHelpers';

// Authentication and Routing
import { useAuth } from '@/hooks/auth';
import { UserRole } from '@/routes/types';

// UI Components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

// Types
import { 
  BaseWidget, 
  WidgetTemplate, 
  WidgetCategory, 
  WidgetSize 
} from '../types/widget.types';

// Responsive Grid Layout with Width Provider
const ResponsiveGridLayout = WidthProvider(Responsive);

// Sample Chart Data
const FINANCIAL_CHART_DATA = [
  { month: 'Jan', pemasukan: 4000, pengeluaran: 2400 },
  { month: 'Feb', pemasukan: 3000, pengeluaran: 1398 },
  { month: 'Mar', pemasukan: 2000, pengeluaran: 9800 },
  { month: 'Apr', pemasukan: 2780, pengeluaran: 3908 },
  { month: 'Mei', pemasukan: 1890, pengeluaran: 4800 },
  { month: 'Jun', pemasukan: 2390, pengeluaran: 3800 }
];

const MEMBERSHIP_CHART_DATA = [
  { role: 'Majelis', count: 50 },
  { role: 'Pemuda', count: 120 },
  { role: 'Anak', count: 80 },
  { role: 'Lansia', count: 30 }
];

const MINISTRY_CHART_DATA = [
  { ministry: 'Musik', members: 20 },
  { ministry: 'Doa', members: 15 },
  { ministry: 'Sosial', members: 25 },
  { ministry: 'Pengajaran', members: 10 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// Financial Widget with Chart
const FinancialWidget: React.FC<{ data: any; onDelete?: () => void }> = ({ data, onDelete }) => (
  <div className="relative group h-full w-full">
    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2 z-10">
      <Button 
        variant="ghost" 
        size="icon" 
        className="text-destructive hover:bg-destructive/10"
        onClick={onDelete}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon" 
        className="text-primary hover:bg-primary/10"
      >
        <Maximize2 className="h-4 w-4" />
      </Button>
    </div>
    <div className="p-4 bg-white rounded-lg shadow-md h-full w-full flex flex-col overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <DollarSign className="text-primary h-6 w-6" />
        <h3 className="text-lg font-semibold flex-grow text-right">{data.title}</h3>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div>
          <p className="text-sm text-gray-500">Total Kas</p>
          <p className="font-bold text-green-600">{data.totalCash}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Pengeluaran</p>
          <p className="font-bold text-red-600">{data.expenses}</p>
        </div>
      </div>
      <div className="flex-grow min-h-[150px] max-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={FINANCIAL_CHART_DATA}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pemasukan" fill="#8884d8" name="Pemasukan" />
            <Bar dataKey="pengeluaran" fill="#82ca9d" name="Pengeluaran" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);

// Membership Widget with Pie Chart
const MembershipWidget: React.FC<{ data: any; onDelete?: () => void }> = ({ data, onDelete }) => (
  <div className="relative group h-full w-full">
    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2 z-10">
      <Button 
        variant="ghost" 
        size="icon" 
        className="text-destructive hover:bg-destructive/10"
        onClick={onDelete}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon" 
        className="text-primary hover:bg-primary/10"
      >
        <Maximize2 className="h-4 w-4" />
      </Button>
    </div>
    <div className="p-4 bg-white rounded-lg shadow-md h-full w-full flex flex-col overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <Users className="text-primary h-6 w-6" />
        <h3 className="text-lg font-semibold flex-grow text-right">{data.title}</h3>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div>
          <p className="text-sm text-gray-500">Total Anggota</p>
          <p className="font-bold">{data.totalMembers}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Anggota Baru</p>
          <p className="font-bold text-blue-600">{data.newMembers}</p>
        </div>
      </div>
      <div className="flex-grow min-h-[150px] max-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={MEMBERSHIP_CHART_DATA}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius="80%"
              fill="#8884d8"
              dataKey="count"
            >
              {MEMBERSHIP_CHART_DATA.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend 
              layout="horizontal" 
              verticalAlign="bottom" 
              align="center"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);

// Ministry Widget with Bar Chart
const MinistryWidget: React.FC<{ data: any; onDelete?: () => void }> = ({ data, onDelete }) => (
  <div className="relative group h-full w-full">
    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2 z-10">
      <Button 
        variant="ghost" 
        size="icon" 
        className="text-destructive hover:bg-destructive/10"
        onClick={onDelete}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon" 
        className="text-primary hover:bg-primary/10"
      >
        <Maximize2 className="h-4 w-4" />
      </Button>
    </div>
    <div className="p-4 bg-white rounded-lg shadow-md h-full w-full flex flex-col overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <Church className="text-primary h-6 w-6" />
        <h3 className="text-lg font-semibold flex-grow text-right">{data.title}</h3>
      </div>
      <div className="flex-grow min-h-[150px] max-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={MINISTRY_CHART_DATA}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="ministry" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="members" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);

// Event Widget with Line Chart
const EventWidget: React.FC<{ data: any; onDelete?: () => void }> = ({ data, onDelete }) => {
  // Sample event participation data
  const EVENT_PARTICIPATION_DATA = [
    { event: 'Kebaktian Minggu', peserta: 200 },
    { event: 'Pertemuan Pemuda', peserta: 150 },
    { event: 'Pelayanan Sosial', peserta: 100 },
    { event: 'Seminar Rohani', peserta: 180 }
  ];

  return (
    <div className="relative group h-full w-full">
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2 z-10">
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-destructive hover:bg-destructive/10"
          onClick={onDelete}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-primary hover:bg-primary/10"
        >
          <Maximize2 className="h-4 w-4" />
        </Button>
      </div>
      <div className="p-4 bg-white rounded-lg shadow-md h-full w-full flex flex-col overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <Calendar className="text-primary h-6 w-6" />
          <h3 className="text-lg font-semibold flex-grow text-right">{data.title}</h3>
        </div>
        <div className="flex-grow min-h-[150px] max-h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={EVENT_PARTICIPATION_DATA}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="event" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="peserta" 
                stroke="#8884d8" 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2">
          <ul className="space-y-2">
            {data.upcomingEvents.map((event: any, index: number) => (
              <li key={index} className="flex justify-between items-center">
                <span className="text-sm">{event.name}</span>
                <Badge variant="outline">{event.date}</Badge>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// Overview Widget
const OverviewWidget: React.FC<{ data: any; onDelete?: () => void }> = ({ data, onDelete }) => (
  <div className="relative group h-full w-full">
    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2 z-10">
      <Button 
        variant="ghost" 
        size="icon" 
        className="text-destructive hover:bg-destructive/10"
        onClick={onDelete}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon" 
        className="text-primary hover:bg-primary/10"
      >
        <Maximize2 className="h-4 w-4" />
      </Button>
    </div>
    <div className="p-4 bg-white rounded-lg shadow-md h-full w-full">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold">{data.title}</h3>
      </div>
      <p className="text-gray-600">{data.content}</p>
      <div className="mt-4 flex justify-between items-center">
        <Badge variant="secondary">{data.category}</Badge>
        <span className="text-sm text-gray-500">{data.lastUpdated}</span>
      </div>
    </div>
  </div>
);

// Update WIDGET_COMPONENTS to include new chart-based widgets
const WIDGET_COMPONENTS = {
  [WidgetCategory.OVERVIEW]: OverviewWidget,
  [WidgetCategory.FINANCIAL]: FinancialWidget,
  [WidgetCategory.MEMBERSHIP]: MembershipWidget,
  [WidgetCategory.EVENTS]: EventWidget,
  [WidgetCategory.MINISTRY]: MinistryWidget
};

const FlexDashboardPage: React.FC = () => {
  const { user, isLoading } = useAuth();
  const { toast } = useToast();
  const { 
    widgets, 
    setWidgetsForRole, 
    addWidget, 
    removeWidget 
  } = useFlexDashboardStore();

  const [isAddWidgetDialogOpen, setIsAddWidgetDialogOpen] = useState(false);
  const [availableWidgets, setAvailableWidgets] = useState<WidgetTemplate[]>([]);
  const [gridLayout, setGridLayout] = useState<any[]>([]);

  // Convert widgets to grid layout format with dynamic sizing
  useEffect(() => {
    const layout = widgets.map((widget, index) => {
      let height = 4; // Default height
      let width = 4;  // Default width

      // Dynamically adjust height based on widget category
      switch (widget.category) {
        case WidgetCategory.FINANCIAL:
        case WidgetCategory.MEMBERSHIP:
          height = 5; // Slightly taller for charts
          width = 5;
          break;
        case WidgetCategory.EVENTS:
          height = 6; // Taller for events with list and chart
          width = 5;
          break;
        case WidgetCategory.MINISTRY:
          height = 4;
          width = 4;
          break;
        case WidgetCategory.OVERVIEW:
        default:
          height = 3;
          width = 4;
      }

      return {
        i: widget.id,
        x: (index % 3) * 4,
        y: Math.floor(index / 3) * height,
        w: width,
        h: height,
        minW: 3,   // Minimum width
        minH: 3,   // Minimum height
        maxW: 6,   // Maximum width
        maxH: 7    // Maximum height
      };
    });
    setGridLayout(layout);
  }, [widgets]);

  useEffect(() => {
    if (user) {
      // Provide a default set of widgets for all users
      const defaultWidgets = [
        {
          id: 'user-overview',
          title: `Selamat Datang, ${user.name}`,
          description: 'Ringkasan informasi untuk semua pengguna',
          category: WidgetCategory.OVERVIEW,
          content: `Anda login sebagai ${user.role}`,
          roles: Object.values(UserRole),
          size: WidgetSize.LARGE,
          icon: 'home',
          isCustomizable: true
        },
        {
          id: 'profile-summary',
          title: 'Profil Pengguna',
          description: 'Informasi dasar akun Anda',
          category: WidgetCategory.OVERVIEW,
          content: `Email: ${user.email}`,
          roles: Object.values(UserRole),
          size: WidgetSize.MEDIUM,
          icon: 'user',
          isCustomizable: true
        }
      ];

      // Set widgets based on user's role, with fallback to default
      const roleWidgets = WidgetManager.getWidgetsForRole(user.role as UserRole);
      setWidgetsForRole(user.role as UserRole);
      
      // Combine role-specific and default widgets
      setAvailableWidgets([
        ...defaultWidgets,
        ...roleWidgets
      ]);
    }
  }, [user]);

  const handleAddWidget = (widget: WidgetTemplate) => {
    if (widget.isCustomizable) {
      const isDuplicate = widgets.some(w => w.title === widget.title);
      
      if (!isDuplicate) {
        addWidget(widget);
        toast({
          title: "Widget Ditambahkan",
          description: `Widget "${widget.title}" berhasil ditambahkan.`,
        });
        setIsAddWidgetDialogOpen(false);
      } else {
        toast({
          title: "Gagal Menambahkan Widget",
          description: "Widget dengan judul yang sama sudah ada.",
          variant: "destructive"
        });
      }
    } else {
      toast({
        title: "Widget Tidak Dapat Ditambahkan",
        description: "Widget ini tidak dapat disesuaikan.",
        variant: "destructive"
      });
    }
  };

  const handleRemoveWidget = (widgetId: string) => {
    removeWidget(widgetId);
    toast({
      title: "Widget Dihapus",
      description: "Widget berhasil dihapus dari dashboard.",
    });
  };

  const renderWidget = (widget: BaseWidget) => {
    const WidgetComponent = WIDGET_COMPONENTS[widget.category];
    
    // Sample data - replace with actual data fetching logic
    const widgetData = {
      [WidgetCategory.OVERVIEW]: {
        title: widget.title,
        content: 'Ringkasan informasi dashboard',
        category: widget.category,
        lastUpdated: new Date().toLocaleDateString()
      },
      [WidgetCategory.FINANCIAL]: {
        title: widget.title,
        totalCash: 'Rp 500,000,000',
        expenses: 'Rp 50,000,000'
      },
      [WidgetCategory.MEMBERSHIP]: {
        title: widget.title,
        totalMembers: 1500,
        newMembers: 25
      },
      [WidgetCategory.EVENTS]: {
        title: widget.title,
        upcomingEvents: [
          { name: 'Kebaktian Minggu', date: '10 Feb 2024' },
          { name: 'Pertemuan Pemuda', date: '15 Feb 2024' }
        ]
      },
      [WidgetCategory.MINISTRY]: {
        title: widget.title,
        ministries: [
          { name: 'Musik', members: 20 },
          { name: 'Doa', members: 15 }
        ]
      }
    }[widget.category];

    const handleRemoveWidget = () => {
      removeWidget(widget.id);
      toast({
        title: "Widget Dihapus",
        description: `Widget "${widget.title}" berhasil dihapus dari dashboard.`,
      });
    };

    return (
      <div key={widget.id} className="h-full">
        {WidgetComponent ? (
          <WidgetComponent 
            data={widgetData} 
            onDelete={handleRemoveWidget} 
          />
        ) : (
          <div className="p-4 bg-white rounded-lg shadow-md h-full flex items-center justify-center">
            <p className="text-gray-500">Widget tidak tersedia</p>
          </div>
        )}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-full text-center p-4">
        <div>
          <h2 className="text-xl font-bold mb-4">Silakan Login</h2>
          <p className="text-gray-600">
            Anda perlu login untuk mengakses Dashboard.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Dashboard Fleksibel</h1>
        <Button 
          variant="outline" 
          onClick={() => setIsAddWidgetDialogOpen(true)}
          className="flex items-center"
        >
          <PlusCircle className="mr-2 h-4 w-4" /> Tambah Widget
        </Button>
      </div>

      {/* Responsive Grid Layout */}
      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: gridLayout }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4 }}
        rowHeight={60}
        onLayoutChange={(layout) => {
          // Optionally save layout changes
          setGridLayout(layout);
        }}
        compactType="vertical"
        preventCollision={false}
        isDraggable={true}
        isResizable={true}
        draggableHandle=".drag-handle"
        resizeHandles={['se', 'sw', 'ne', 'nw']}
        margin={[10, 10]}
        containerPadding={[10, 10]}
      >
        {widgets.map(widget => (
          <div key={widget.id} className="group">
            {/* Drag Handle */}
            <div 
              className="drag-handle absolute top-0 left-0 w-full h-8 cursor-move opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
            >
              <Move className="h-4 w-4 text-gray-500 mx-auto mt-2" />
            </div>
            {renderWidget(widget)}
          </div>
        ))}
      </ResponsiveGridLayout>

      {/* Add Widget Dialog */}
      <Dialog 
        open={isAddWidgetDialogOpen} 
        onOpenChange={setIsAddWidgetDialogOpen}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Pilih Widget</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            {availableWidgets.map(widget => (
              <Card 
                key={widget.id} 
                className="hover:border-primary cursor-pointer transition-all"
                onClick={() => handleAddWidget(widget)}
              >
                <CardHeader>
                  <CardTitle>{widget.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-2">{widget.description}</p>
                  <div className="flex justify-between items-center">
                    <Badge variant="secondary">{widget.category}</Badge>
                    <Button 
                      size="sm" 
                      variant={widget.isCustomizable ? 'default' : 'ghost'}
                      disabled={!widget.isCustomizable}
                    >
                      {widget.isCustomizable ? 'Tambah' : 'Tidak Tersedia'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FlexDashboardPage;
