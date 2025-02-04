import React, { 
  useState, 
  useEffect, 
  useMemo, 
  createElement, 
  useCallback 
} from 'react';
import { 
  // Navigation and UI Icons
  Home, 
  DollarSign, 
  Users, 
  Calendar, 
  BarChart2, 
  PieChart, 
  Briefcase, 
  Gift, 
  UserCheck, 
  Users2, 
  Trash2, 
  Plus,
  PlusCircle,
  X,
  
  // Additional Contextual Icons
  TrendingUp,
  TrendingDown,
  Activity,
  BookOpen,
  CreditCard,
  Globe,
  HeartPulse,
  Layers,
  Megaphone,
  Target,
  Church, 
  Move,
  Maximize2,
  BookPlus
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
  PieChart as RechartsPieChart, 
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

// Date Formatting
import { format } from 'date-fns';

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
  DialogTitle, 
  DialogDescription, 
  DialogFooter 
} from '@/components/ui/dialog';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { WidgetConfigForm } from '../components/WidgetConfigForm';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

// Types
import { 
  BaseWidget, 
  CreateWidgetDTO, 
  WidgetLayout, 
  WidgetSize,
  WidgetTemplate, 
  WidgetCategory 
} from '@/features/panel/flexdash/types/widget.types';

// Zustand Store and Utilities
import { useFlexDashboardStore } from '@/features/panel/flexdash/store/flexDashboardStore';
import { WidgetManager } from '@/features/panel/flexdash/utils/widgetHelpers';

// API Mock
import { widgetMockApi } from '@/features/panel/flexdash/api/widgetMockApi';

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

// Additional Sample Data
const ATTENDANCE_TREND_DATA = [
  { week: 'Minggu 1', ibadahPagi: 450, ibadahSore: 200, ibadahPemuda: 120 },
  { week: 'Minggu 2', ibadahPagi: 480, ibadahSore: 220, ibadahPemuda: 140 },
  { week: 'Minggu 3', ibadahPagi: 420, ibadahSore: 180, ibadahPemuda: 100 },
  { week: 'Minggu 4', ibadahPagi: 500, ibadahSore: 250, ibadahPemuda: 150 }
];

const DONATION_DISTRIBUTION_DATA = [
  { name: 'Pembangunan', value: 4000 },
  { name: 'Diakonia', value: 3000 },
  { name: 'Misi', value: 2000 },
  { name: 'Operasional', value: 2780 },
  { name: 'Pendidikan', value: 1890 }
];

const AGE_DISTRIBUTION_DATA = [
  { age: '0-12', count: 120 },
  { age: '13-17', count: 80 },
  { age: '18-25', count: 150 },
  { age: '26-40', count: 200 },
  { age: '41-60', count: 180 },
  { age: '60+', count: 90 }
];

const GENDER_DISTRIBUTION_DATA = [
  { name: 'Pria', value: 540 },
  { name: 'Wanita', value: 620 }
];

const COLORS_EXTENDED = [...COLORS, '#8884D8', '#82CA9D'];

// Financial Widget with Chart
const FinancialWidget: React.FC<{ data: any; onDelete?: () => void }> = ({ data, onDelete }) => (
  <div className="widget-container group">
    <div className="widget-base">
      <div className="widget-header">
        <DollarSign className="widget-icon" />
        <h3 className="widget-title">{data.title}</h3>
      </div>
      <div className="widget-stats">
        <div>
          <p className="widget-stat-label">Total Kas</p>
          <p className="widget-stat-value widget-stat-value-positive">{data.totalCash}</p>
        </div>
        <div>
          <p className="widget-stat-label">Pengeluaran</p>
          <p className="widget-stat-value widget-stat-value-negative">{data.expenses}</p>
        </div>
      </div>
      <div className="widget-content">
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
  <div className="widget-container group">
    <div className="widget-base">
      <div className="widget-header">
        <Users className="widget-icon" />
        <h3 className="widget-title">{data.title}</h3>
      </div>
      <div className="widget-stats">
        <div>
          <p className="widget-stat-label">Total Anggota</p>
          <p className="widget-stat-value">{data.totalMembers}</p>
        </div>
        <div>
          <p className="widget-stat-label">Anggota Baru</p>
          <p className="widget-stat-value widget-stat-value-positive">{data.newMembers}</p>
        </div>
      </div>
      <div className="widget-content">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPieChart>
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
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);

// Ministry Widget with Bar Chart
const MinistryWidget: React.FC<{ data: any; onDelete?: () => void }> = ({ data, onDelete }) => (
  <div className="widget-container group">
    <div className="widget-base">
      <div className="widget-header">
        <Church className="widget-icon" />
        <h3 className="widget-title">{data.title}</h3>
      </div>
      <div className="widget-content">
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
  // Ensure data and upcomingEvents exist
  const upcomingEvents = data?.upcomingEvents || [];
  
  // Render placeholder or empty state if no events
  if (!upcomingEvents || upcomingEvents.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        <Calendar className="mx-auto mb-2 h-8 w-8 text-gray-400" />
        <p>Tidak ada acara yang akan datang</p>
        {onDelete && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onDelete} 
            className="mt-2"
          >
            <Trash2 className="mr-2 h-4 w-4" /> Hapus Widget
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Acara Mendatang</h3>
        {onDelete && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onDelete}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      <div className="space-y-2">
        {upcomingEvents.slice(0, 5).map((event, index) => (
          <div 
            key={event.id || index} 
            className="flex items-center justify-between border-b pb-2 last:border-b-0"
          >
            <div>
              <p className="font-medium">{event.title || 'Acara Tanpa Judul'}</p>
              <p className="text-sm text-gray-500">
                {event.date 
                  ? format(new Date(event.date), 'dd MMM yyyy') 
                  : 'Tanggal Tidak Tersedia'}
              </p>
            </div>
            <Badge variant="secondary">
              {event.type || 'Acara Umum'}
            </Badge>
          </div>
        ))}
      </div>

      {upcomingEvents.length > 5 && (
        <div className="text-center mt-2">
          <Button variant="link" size="sm">
            Lihat Semua Acara
          </Button>
        </div>
      )}
    </div>
  );
};

// Overview Widget
const OverviewWidget: React.FC<{ data: any; onDelete?: () => void }> = ({ data, onDelete }) => (
  <div className="widget-container group">
    <div className="widget-base">
      <div className="widget-header">
        <h3 className="widget-title">{data.title}</h3>
      </div>
      <p className="text-gray-600">{data.content}</p>
      <div className="mt-4 flex justify-between items-center">
        <Badge variant="secondary">{data.category}</Badge>
        <span className="text-sm text-gray-500">{data.lastUpdated}</span>
      </div>
    </div>
  </div>
);

// New Chart Widgets
function AttendanceTrendWidget({ data, onDelete }) {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">
          Trend Kehadiran Ibadah
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={ATTENDANCE_TREND_DATA}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="ibadahPagi" stroke="#0088FE" name="Ibadah Pagi" />
            <Line type="monotone" dataKey="ibadahSore" stroke="#00C49F" name="Ibadah Sore" />
            <Line type="monotone" dataKey="ibadahPemuda" stroke="#FFBB28" name="Ibadah Pemuda" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

function DonationDistributionWidget({ data, onDelete }) {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">
          Distribusi Persembahan
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <RechartsPieChart>
            <Pie
              data={DONATION_DISTRIBUTION_DATA}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {DONATION_DISTRIBUTION_DATA.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS_EXTENDED[index % COLORS_EXTENDED.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </RechartsPieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

function AgeDistributionWidget({ data, onDelete }) {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">
          Distribusi Usia Jemaat
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={AGE_DISTRIBUTION_DATA}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="age" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" name="Jumlah Jemaat">
              {AGE_DISTRIBUTION_DATA.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS_EXTENDED[index % COLORS_EXTENDED.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

function GenderDistributionWidget({ data, onDelete }) {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">
          Distribusi Gender
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <ResponsiveContainer width="100%" height={300}>
          <RechartsPieChart>
            <Pie
              data={GENDER_DISTRIBUTION_DATA}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              <Cell fill="#0088FE" />
              <Cell fill="#00C49F" />
            </Pie>
            <Tooltip />
            <Legend />
          </RechartsPieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

// Update WIDGET_COMPONENTS to include new chart widgets
const WIDGET_COMPONENTS = {
  [WidgetCategory.OVERVIEW]: OverviewWidget,
  [WidgetCategory.FINANCIAL]: FinancialWidget,
  [WidgetCategory.MEMBERSHIP]: MembershipWidget,
  [WidgetCategory.MINISTRY]: MinistryWidget,
  [WidgetCategory.EVENT]: EventWidget,
  'ATTENDANCE_TREND': AttendanceTrendWidget,
  'DONATION_DISTRIBUTION': DonationDistributionWidget,
  'AGE_DISTRIBUTION': AgeDistributionWidget,
  'GENDER_DISTRIBUTION': GenderDistributionWidget,
};

// Comprehensive widget size configuration
const WIDGET_SIZE_CONFIG = {
  [WidgetCategory.OVERVIEW]: {
    hasChart: false,
    size: { w: 3, h: 3 },
    minSize: { w: 3, h: 3 }
  },
  [WidgetCategory.FINANCIAL]: {
    hasChart: true,
    size: { w: 4, h: 4 },
    minSize: { w: 4, h: 4 }
  },
  [WidgetCategory.MEMBERSHIP]: {
    hasChart: true,
    size: { w: 4, h: 4 },
    minSize: { w: 4, h: 4 }
  },
  [WidgetCategory.MINISTRY]: {
    hasChart: true,
    size: { w: 4, h: 4 },
    minSize: { w: 4, h: 4 }
  },
  [WidgetCategory.EVENT]: {
    hasChart: true,
    size: { w: 3, h: 4 },
    minSize: { w: 3, h: 3 }
  },
  'ATTENDANCE_TREND': {
    hasChart: true,
    size: { w: 4, h: 4 },
    minSize: { w: 4, h: 4 }
  },
  'DONATION_DISTRIBUTION': {
    hasChart: true,
    size: { w: 4, h: 4 },
    minSize: { w: 4, h: 4 }
  },
  'AGE_DISTRIBUTION': {
    hasChart: true,
    size: { w: 4, h: 4 },
    minSize: { w: 4, h: 4 }
  },
  'GENDER_DISTRIBUTION': {
    hasChart: true,
    size: { w: 3, h: 3 },
    minSize: { w: 3, h: 3 }
  },
  default: {
    hasChart: false,
    size: { w: 3, h: 3 },
    minSize: { w: 3, h: 3 }
  }
};

// Preset Dashboard Configurations
const DASHBOARD_PRESETS = {
  [UserRole.ADMIN]: {
    name: 'Admin Dashboard',
    widgets: [
      { 
        category: WidgetCategory.OVERVIEW, 
        title: 'System Overview',
        data: {} // Placeholder for system-wide metrics
      },
      { 
        category: WidgetCategory.FINANCIAL, 
        title: 'Financial Summary',
        data: {} // Placeholder for financial data
      },
      { 
        category: WidgetCategory.MEMBERSHIP, 
        title: 'Membership Insights',
        data: {} // Placeholder for membership data
      },
      { 
        category: WidgetCategory.MINISTRY, 
        title: 'Ministry Performance',
        data: {} // Placeholder for ministry data
      },
      { 
        category: WidgetCategory.EVENT, 
        title: 'Upcoming Events',
        data: {} // Placeholder for events data
      }
    ]
  },
  [UserRole.TREASURER]: {
    name: 'Financial Dashboard',
    widgets: [
      { 
        category: WidgetCategory.FINANCIAL, 
        title: 'Income Overview',
        data: {} // Specific financial widgets
      },
      { 
        category: WidgetCategory.FINANCIAL, 
        title: 'Expense Tracking',
        data: {} // Different financial widget
      },
      { 
        category: WidgetCategory.OVERVIEW, 
        title: 'Financial Health',
        data: {} // Summary widget
      }
    ]
  },
  [UserRole.MINISTRY_LEADER]: {
    name: 'Ministry Dashboard',
    widgets: [
      { 
        category: WidgetCategory.MINISTRY, 
        title: 'Ministry Attendance',
        data: {} // Ministry-specific widget
      },
      { 
        category: WidgetCategory.EVENT, 
        title: 'Ministry Events',
        data: {} // Events related to ministry
      },
      { 
        category: WidgetCategory.OVERVIEW, 
        title: 'Ministry Summary',
        data: {} // Overview of ministry metrics
      }
    ]
  },
  default: {
    name: 'Default Dashboard',
    widgets: [
      { 
        category: WidgetCategory.OVERVIEW, 
        title: 'Welcome Dashboard',
        data: {} // Basic overview for all users
      }
    ]
  }
};

// Dynamic widget size calculation
const calculateWidgetSize = (widget: BaseWidget) => {
  // Determine widget configuration
  const widgetConfig = WIDGET_SIZE_CONFIG[widget.category] || WIDGET_SIZE_CONFIG.default;
  
  // Check if the widget has a chart component
  const WidgetComponent = WIDGET_COMPONENTS[widget.category];
  const hasChartComponent = WidgetComponent && widgetConfig.hasChart;
  
  // Return appropriate size based on chart presence
  return hasChartComponent 
    ? widgetConfig.size 
    : widgetConfig.minSize;
};

// Function to generate a unique ID for widgets
const generateWidgetId = () => `widget_${Math.random().toString(36).substr(2, 9)}`;

// Function to load dashboard preset based on user role
const loadDashboardPreset = (userRole: UserRole) => {
  // Select preset based on user role, fallback to default
  const preset = DASHBOARD_PRESETS[userRole] || DASHBOARD_PRESETS.default;
  
  // Transform preset widgets into full widget objects
  return preset.widgets.map(presetWidget => ({
    id: generateWidgetId(),
    category: presetWidget.category,
    title: presetWidget.title,
    data: presetWidget.data,
    lastUpdated: new Date().toISOString()
  }));
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
  const [widgetSizes, setWidgetSizes] = useState<{[key: string]: { w: number, h: number }}>({});
  const [isWidgetConfigOpen, setIsWidgetConfigOpen] = useState(false);

  // State for preset management
  const [isPresetDialogOpen, setIsPresetDialogOpen] = useState(false);
  const [newPreset, setNewPreset] = useState<Partial<WidgetPreset>>({
    name: '',
    description: '',
    category: WidgetCategory.OVERVIEW,
    defaultConfig: {}
  });

  // Handler for creating a new preset
  const handleCreatePreset = async () => {
    try {
      const createdPreset = await widgetPresetApi.createPreset({
        name: newPreset.name || 'Preset Baru',
        description: newPreset.description || 'Preset widget kustom',
        category: newPreset.category || WidgetCategory.OVERVIEW,
        defaultConfig: newPreset.defaultConfig || {}
      });

      // Optional: Add toast or notification
      toast({
        title: 'Preset Berhasil Dibuat',
        description: `Preset "${createdPreset.name}" telah ditambahkan`,
        variant: 'default'
      });

      // Close dialog and reset form
      setIsPresetDialogOpen(false);
      setNewPreset({
        name: '',
        description: '',
        category: WidgetCategory.OVERVIEW,
        defaultConfig: {}
      });
    } catch (error) {
      // Error handling
      toast({
        title: 'Gagal Membuat Preset',
        description: error instanceof Error ? error.message : 'Terjadi kesalahan',
        variant: 'destructive'
      });
    }
  };

  // Function to delete a widget from the dashboard
  const handleDeleteWidget = useCallback(async (widgetId: string) => {
    try {
      // Use mock API to delete widget
      await widgetMockApi.deleteWidget(widgetId);
      
      // Update store state
      removeWidget(widgetId);
      
      // Update grid layout
      setGridLayout(prevLayout => prevLayout.filter(item => item.i !== widgetId));
      
      // Remove widget size configuration
      setWidgetSizes(prev => {
        const newSizes = { ...prev };
        delete newSizes[widgetId];
        return newSizes;
      });

      // Show success notification
      toast({
        title: "Widget Dihapus",
        description: "Widget telah berhasil dihapus dari dashboard.",
        variant: "default"
      });
    } catch (error) {
      console.error('Error deleting widget:', error);
      
      // Show error notification
      toast({
        title: "Gagal Menghapus Widget",
        description: "Terjadi kesalahan saat menghapus widget.",
        variant: "destructive"
      });
    }
  }, [
    removeWidget, 
    setGridLayout, 
    setWidgetSizes, 
    widgetMockApi.deleteWidget, 
    toast
  ]);

  // Function to dynamically render widget based on its category
  const renderWidget = useCallback((widget: WidgetTemplate) => {
    // Find the appropriate widget component based on the category
    const WidgetComponent = WIDGET_COMPONENTS[widget.category];
    
    // If no matching component is found, return a fallback
    if (!WidgetComponent) {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Widget Tidak Tersedia</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Kategori widget: {widget.category}</p>
          </CardContent>
        </Card>
      );
    }

    // Render the widget with its data and delete handler
    return (
      <WidgetComponent 
        data={widget.data || []} 
        onDelete={() => handleDeleteWidget(widget.id)} 
      />
    );
  }, [WIDGET_COMPONENTS, handleDeleteWidget]);

  useEffect(() => {
    if (user) {
      // Load preset widgets for the user's role
      const roleWidgets = WidgetManager.getWidgetsForRole(user.role as UserRole);
      
      // Set widgets based on user's role
      setWidgetsForRole(user.role as UserRole);
      
      // Combine role-specific and default widgets
      setAvailableWidgets([
        ...roleWidgets
      ]);
    }
  }, [user]);

  // Add a method to load a specific dashboard preset
  const loadPresetDashboard = (presetRole: UserRole) => {
    const presetWidgets = loadDashboardPreset(presetRole);
    
    // Clear existing widgets and add preset widgets
    setWidgetsForRole(presetRole, presetWidgets);
    
    // Optional: Show a toast notification
    toast({
      title: `Loaded ${DASHBOARD_PRESETS[presetRole]?.name || 'Dashboard Preset'}`,
      description: 'Dashboard has been updated with role-specific widgets.'
    });
  };

  // Render preset dropdown and widget addition UI
  const renderDashboardControls = () => {
    // Determine available presets based on user role
    const availablePresets = Object.entries(DASHBOARD_PRESETS)
      .filter(([role]) => role !== 'default')
      .map(([role, preset]) => ({
        value: role,
        label: preset.name
      }));

    return (
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Dashboard Fleksibel</h1>
        <div className="flex items-center space-x-2">
          {/* Preset Dashboard Dropdown */}
          <Select 
            onValueChange={(selectedRole) => {
              loadPresetDashboard(selectedRole as UserRole);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Pilih Preset Dashboard" />
            </SelectTrigger>
            <SelectContent>
              {availablePresets.map((preset) => (
                <SelectItem 
                  key={preset.value} 
                  value={preset.value}
                >
                  {preset.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Bottom Action Buttons */}
          <div className="fixed bottom-4 right-4 z-50 flex space-x-2">
            {/* Buat Preset Button */}
            <Button 
              onClick={() => setIsPresetDialogOpen(true)} 
              variant="secondary"
              className="flex items-center"
            >
              <BookPlus className="mr-2 h-4 w-4" /> Buat Preset
            </Button>

            {/* Buat Widget Button */}
            <Button 
              onClick={() => setIsWidgetConfigOpen(true)} 
              className="flex items-center"
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Buat Widget
            </Button>
          </div>
        </div>
      </div>
    );
  };

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

  useEffect(() => {
    const layout = widgets.map((widget, index) => {
      // Check if widget has a manually set size
      const manualSize = widgetSizes[widget.id];
      
      // If manually sized, use those dimensions
      if (manualSize) {
        return {
          i: widget.id,
          x: (index % 3) * 4,
          y: Math.floor(index / 3) * 4,
          w: manualSize.w,
          h: manualSize.h,
          minW: 3,
          minH: 3
        };
      }
      
      // Otherwise, use dynamic calculation
      const { w, h } = calculateWidgetSize(widget);
      
      return {
        i: widget.id,
        x: (index % 3) * 4,
        y: Math.floor(index / 3) * 4,
        w,
        h,
        minW: 3,
        minH: 3
      };
    });

    setGridLayout(layout);
  }, [widgets, widgetSizes]);

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

  // Method to dynamically add a new widget
  const handleAddNewWidget = useCallback(async () => {
    try {
      // More comprehensive widget configuration options
      const widgetConfigurations = [
        {
          category: WidgetCategory.FINANCIAL,
          title: 'Laporan Keuangan Bulanan',
          dataSource: DataSource.FINANCIAL,
          visualizationType: VisualizationType.BAR_CHART,
          icon: DollarSign,
          roles: [UserRole.ADMIN, UserRole.STAFF],
          fields: ['tithe', 'offering', 'special']
        },
        {
          category: WidgetCategory.MEMBERSHIP,
          title: 'Pertumbuhan Keanggotaan',
          dataSource: DataSource.MEMBERSHIP,
          visualizationType: VisualizationType.LINE_CHART,
          icon: Users,
          roles: [UserRole.ADMIN],
          fields: ['newMembers', 'totalMembers']
        },
        {
          category: WidgetCategory.EVENT,
          title: 'Jadwal Acara Mendatang',
          dataSource: DataSource.EVENTS,
          visualizationType: VisualizationType.TABLE,
          icon: Calendar,
          roles: [UserRole.STAFF, UserRole.ADMIN],
          fields: ['name', 'date', 'attendanceExpected']
        },
        {
          category: WidgetCategory.ATTENDANCE_TREND,
          title: 'Trend Kehadiran Mingguan',
          dataSource: DataSource.ATTENDANCE,
          visualizationType: VisualizationType.BAR_CHART,
          icon: BarChart2,
          roles: [UserRole.ADMIN],
          fields: ['morning', 'evening', 'midweek']
        },
        {
          category: WidgetCategory.MINISTRY,
          title: 'Statistik Pelayanan',
          dataSource: DataSource.FINANCIAL,
          visualizationType: VisualizationType.PIE_CHART,
          icon: Briefcase,
          roles: [UserRole.ADMIN, UserRole.STAFF],
          fields: ['ministry', 'facilities', 'outreach']
        }
      ];

      // Randomly select a widget configuration
      const randomConfig = widgetConfigurations[
        Math.floor(Math.random() * widgetConfigurations.length)
      ];

      // Generate appropriate mock data based on data source
      const mockData = mockDataGenerators[randomConfig.dataSource][
        Object.keys(mockDataGenerators[randomConfig.dataSource])[0]
      ]();

      // Create a new widget using mock API
      const newWidget = await widgetMockApi.createWidget({
        title: randomConfig.title,
        category: randomConfig.category,
        description: `Widget dinamis untuk ${randomConfig.title}`,
        roles: randomConfig.roles,
        dataConfig: {
          source: randomConfig.dataSource,
          fields: randomConfig.fields
        },
        visualizationConfig: {
          type: randomConfig.visualizationType
        },
        data: mockData
      });

      // Add the new widget to the dashboard
      addWidget(newWidget);

      // Show success notification
      toast({
        title: "Widget Ditambahkan",
        description: `${randomConfig.title} berhasil dibuat.`,
        variant: "default"
      });
    } catch (error) {
      console.error('Error adding new widget:', error);
      
      // Show error notification
      toast({
        title: "Gagal Menambahkan Widget",
        description: "Terjadi kesalahan saat membuat widget baru.",
        variant: "destructive"
      });
    }
  }, [addWidget, toast]);

  const handleCreateWidget = useCallback(async (widget: CreateWidgetDTO) => {
    try {
      // Use WidgetManager static method to create a new widget
      const newWidget = await WidgetManager.createWidget(widget);
      
      // Add widget to the store
      addWidget(newWidget);
      
      // Calculate layout for the new widget
      const newLayout: WidgetLayout = {
        i: newWidget.id,
        x: 0,
        y: Infinity, // Add to bottom
        w: newWidget.size === 'LARGE' ? 4 : 2,
        h: newWidget.size === 'LARGE' ? 4 : 2
      };

      // Update grid layout
      setGridLayout(prevLayout => [...prevLayout, newLayout]);
      
      // Close the configuration dialog
      setIsWidgetConfigOpen(false);

      // Show success toast
      toast({
        title: "Widget Ditambahkan",
        description: `Widget "${newWidget.title}" berhasil dibuat.`
      });

      return newWidget;
    } catch (error) {
      console.error('Error creating widget:', error);
      
      // Show error toast
      toast({
        title: "Gagal Membuat Widget",
        description: error instanceof Error ? error.message : "Terjadi kesalahan saat membuat widget.",
        variant: "destructive"
      });

      throw error;
    }
  }, [addWidget, setGridLayout, setIsWidgetConfigOpen, toast]);

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

  const resizeHandleStyles = `
    .react-resizable-handle {
      opacity: 0;
      transition: opacity 0.3s ease-in-out;
    }
    .react-grid-item:hover .react-resizable-handle {
      opacity: 1;
    }
    .react-resizable-handle-se { cursor: se-resize; }
    .react-resizable-handle-sw { cursor: sw-resize; }
    .react-resizable-handle-ne { cursor: ne-resize; }
    .react-resizable-handle-nw { cursor: nw-resize; }
  `;

  return (
    <>
      <style>{resizeHandleStyles}</style>
      <div className="panel-page">
        <div className="panel-page-content">
          <div className="w-full h-full">
            <div className="flex flex-col h-full">
              {renderDashboardControls()}
              <div className="flex-grow w-full">
                <ResponsiveGridLayout
                  className="layout w-full"
                  layouts={{ lg: gridLayout }}
                  breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480 }}
                  cols={{ lg: 12, md: 10, sm: 6, xs: 4 }}
                  rowHeight={70}
                  onLayoutChange={(layout) => {
                    // Dynamically adjust widget sizes
                    const constrainedLayout = layout.map(item => {
                      const widget = widgets.find(w => w.id === item.i);
                      const manualSize = widgetSizes[item.i];
                      
                      // If manually sized, maintain those dimensions
                      if (manualSize) {
                        return {
                          ...item,
                          w: manualSize.w,
                          h: manualSize.h,
                          minW: 3,
                          minH: 3
                        };
                      }
                      
                      // Otherwise, use dynamic calculation
                      const { w, h } = calculateWidgetSize(widget);
                      
                      return {
                        ...item,
                        w,
                        h,
                        minW: 3,
                        minH: 3
                      };
                    });
                    
                    setGridLayout(constrainedLayout);
                  }}
                  onResizeStop={(layout, oldItem, newItem) => {
                    // Preserve manually resized dimensions
                    setWidgetSizes((prev) => ({
                      ...prev,
                      [newItem.i]: { w: newItem.w, h: newItem.h }
                    }));
                  }}
                  compactType="vertical"
                  preventCollision={false}
                  isDraggable={true}
                  isResizable={true}
                  resizeHandles={['se', 'sw', 'ne', 'nw']}
                  margin={[10, 10]}
                  containerPadding={[10, 10]}
                  style={{ width: '100%' }}
                >
                  {widgets.map(widget => (
                    <div 
                      key={widget.id} 
                      className="group"
                      data-widget-category={widget.category}
                    >
                      <div className="absolute top-2 right-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleDeleteWidget(widget.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      {renderWidget(widget)}
                    </div>
                  ))}
                </ResponsiveGridLayout>
              </div>
            </div>
          </div>
        </div>
      </div>

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

      {/* Preset Creation Dialog */}
      <Dialog 
        open={isPresetDialogOpen} 
        onOpenChange={setIsPresetDialogOpen}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Buat Preset Widget Baru</DialogTitle>
            <DialogDescription>
              Buat template widget kustom untuk digunakan di dashboard
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nama Preset
              </Label>
              <Input 
                id="name" 
                value={newPreset.name}
                onChange={(e) => setNewPreset(prev => ({
                  ...prev, 
                  name: e.target.value
                }))}
                placeholder="Contoh: Ringkasan Keuangan" 
                className="col-span-3" 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Deskripsi
              </Label>
              <Input 
                id="description" 
                value={newPreset.description}
                onChange={(e) => setNewPreset(prev => ({
                  ...prev, 
                  description: e.target.value
                }))}
                placeholder="Deskripsi singkat preset" 
                className="col-span-3" 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Kategori
              </Label>
              <Select 
                value={newPreset.category}
                onValueChange={(value) => setNewPreset(prev => ({
                  ...prev, 
                  category: value as WidgetCategory
                }))}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Pilih Kategori" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(WidgetCategory).map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button 
              type="submit" 
              onClick={handleCreatePreset}
            >
              Buat Preset
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Widget Configuration Form */}
      <WidgetConfigForm 
        isOpen={isWidgetConfigOpen}
        onClose={() => setIsWidgetConfigOpen(false)}
        onSubmit={handleCreateWidget}
      />
    </>
  );
};

export default FlexDashboardPage;
