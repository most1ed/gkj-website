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
  PlusIcon,
  LayoutTemplateIcon,
  
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
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { CreateCustomWidgetDialog } from '../components/CreateCustomWidgetDialog';
import { useFlexDashboardStore } from '../store/flexDashboardStore';

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
import { useDashboardPresetStore } from '../store/dashboardPresetStore';
import { CreateDashboardPresetDTO } from '../types/preset.types';

// Centralized mock API
import { mockApi, widgetMock } from '@/lib/mock';

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
    name: 'Dashboard Administrasi',
    description: 'Ikhtisar konten, artikel, dan pengaturan gereja',
    widgets: [
      { 
        category: WidgetCategory.OVERVIEW, 
        title: 'Statistik Konten', 
        description: 'Ringkasan artikel, kategori, dan tag'
      }
    ]
  },
  [UserRole.TREASURER]: {
    name: 'Dashboard Keuangan',
    description: 'Analisis dan laporan keuangan gereja',
    widgets: [
      { 
        category: WidgetCategory.FINANCIAL, 
        title: 'Trend Keuangan', 
        description: 'Laporan pendapatan dan pengeluaran'
      },
      { 
        category: WidgetCategory.DONATION_DISTRIBUTION, 
        title: 'Distribusi Persembahan', 
        description: 'Analisis pola persembahan'
      }
    ]
  },
  [UserRole.MINISTRY_LEADER]: {
    name: 'Dashboard Jemaat',
    description: 'Statistik dan informasi keanggotaan',
    widgets: [
      { 
        category: WidgetCategory.MEMBERSHIP, 
        title: 'Komposisi Jemaat', 
        description: 'Statistik keanggotaan berdasarkan kategori'
      },
      { 
        category: WidgetCategory.AGE_DISTRIBUTION, 
        title: 'Demografi Umur', 
        description: 'Distribusi umur jemaat'
      },
      { 
        category: WidgetCategory.GENDER_DISTRIBUTION, 
        title: 'Komposisi Gender', 
        description: 'Perbandingan gender jemaat'
      }
    ]
  },
  [UserRole.SERVICE_COORDINATOR]: {
    name: 'Dashboard Pelayanan',
    description: 'Aktivitas dan jadwal pelayanan',
    widgets: [
      { 
        category: WidgetCategory.ATTENDANCE_TREND, 
        title: 'Partisipasi Pelayanan', 
        description: 'Tren kehadiran dan keterlibatan'
      }
    ]
  }
};

// Dynamic widget size calculation
import { calculateWidgetMinSize, generateDynamicWidgetLayout, sanitizeGridLayout } from '../utils/widgetSizeCalculator';
import { WidgetManager } from '../utils/widgetManager';

const FlexDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { 
    widgets, 
    addWidget, 
    removeWidget, 
    updateWidgetLayout 
  } = useFlexDashboardStore();
  const { addPreset } = useDashboardPresetStore();

  // State for dialog and widget management
  const [isAddWidgetDialogOpen, setIsAddWidgetDialogOpen] = useState(false);
  const [availableWidgets, setAvailableWidgets] = useState<WidgetTemplate[]>([]);
  const [gridLayout, setGridLayout] = useState<any[]>([]);
  const [isCreateCustomWidgetDialogOpen, setIsCreateCustomWidgetDialogOpen] = useState(false);
  const [isPresetDialogOpen, setIsPresetDialogOpen] = useState(false);

  // State for preset creation
  const [presetName, setPresetName] = useState('');
  const [selectedPresetRole, setSelectedPresetRole] = useState<UserRole | ''>('');

  // Load preset dashboard based on role
  const loadPresetDashboard = async (presetRole: UserRole) => {
    try {
      console.log(`Attempting to load preset dashboard for role: ${presetRole}`);

      // Fetch presets for the specific role
      const presets = await widgetMock.getDashboardPresets(presetRole);
      console.log('Fetched presets:', presets);
      
      if (presets.length === 0) {
        console.warn(`No presets found for role: ${presetRole}`);
        toast({
          title: 'Preset Tidak Tersedia',
          description: `Tidak ada preset dashboard untuk peran ${presetRole}`,
          variant: 'destructive'
        });
        return;
      }

      // Clear existing widgets
      widgets.forEach(widget => {
        console.log(`Removing existing widget: ${widget.id}`);
        removeWidget(widget.id);
      });
      setGridLayout([]);

      // Get widgets for the selected role from the mock API
      const roleWidgets = await widgetMock.getWidgetsByRole(presetRole);
      console.log('Fetched role widgets:', roleWidgets);

      if (roleWidgets.length === 0) {
        console.warn(`No widgets found for role: ${presetRole}`);
        toast({
          title: 'Widget Tidak Tersedia',
          description: `Tidak ada widget untuk peran ${presetRole}`,
          variant: 'destructive'
        });
        return;
      }

      // Add widgets to the dashboard
      roleWidgets.forEach((widget, index) => {
        const newWidget = {
          ...widget,
          id: WidgetManager.generateWidgetId(), // Ensure unique ID
          layout: generateDynamicWidgetLayout([...widgets], widget, index) // Generate layout
        };
        console.log(`Adding widget: ${newWidget.title}`);
        addWidget(newWidget);
      });

      toast({
        title: `Dashboard Preset Dimuat`,
        description: `Dashboard telah diperbarui dengan widget untuk peran ${presetRole}.`
      });
    } catch (error) {
      console.error('Detailed error loading preset dashboard:', error);
      toast({
        title: 'Kesalahan',
        description: `Gagal memuat preset dashboard: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: 'destructive'
      });
    }
  };

  // Handler for creating a new preset
  const handleCreatePreset = useCallback(() => {
    // Validate inputs
    if (!presetName.trim()) {
      toast({
        title: 'Validasi Gagal',
        description: 'Nama preset harus diisi',
        variant: 'destructive'
      });
      return;
    }

    if (!selectedPresetRole) {
      toast({
        title: 'Validasi Gagal',
        description: 'Pilih peran pengguna untuk preset',
        variant: 'destructive'
      });
      return;
    }

    // Prepare preset data
    const presetData: CreateDashboardPresetDTO = {
      name: presetName,
      role: selectedPresetRole as UserRole,
      layout: gridLayout,
      widgets: widgets
    };

    // Save preset
    const newPreset = addPreset(presetData);

    // Show success toast
    toast({
      title: 'Preset Berhasil Dibuat',
      description: `Preset "${presetName}" untuk peran ${selectedPresetRole} telah disimpan.`,
      variant: 'default'
    });

    // Close dialog
    setIsPresetDialogOpen(false);

    // Reset form
    setPresetName('');
    setSelectedPresetRole('');
  }, [
    presetName, 
    selectedPresetRole, 
    gridLayout, 
    widgets, 
    addPreset, 
    toast, 
    setIsPresetDialogOpen
  ]);

  // Add this method to handle widget addition
  const handleAddWidget = useCallback((category: WidgetCategory) => {
    const newWidget: CreateWidgetDTO = {
      id: WidgetManager.generateWidgetId(),
      category,
      title: `${category} Widget`,
      layout: generateDynamicWidgetLayout(widgets, { category } as BaseWidget)
    };

    addWidget(newWidget);
    setIsAddWidgetDialogOpen(false);
    toast({
      title: "Widget Ditambahkan",
      description: `${category} berhasil ditambahkan ke dashboard.`
    });
  }, [widgets, addWidget, toast]);

  const handleCreateWidget = useCallback(() => {
    toast({
      title: 'Fitur Belum Tersedia',
      description: 'Pembuatan widget akan segera hadir.',
      variant: 'default'
    });
  }, [toast]);

  const handleDeleteWidget = useCallback(async (widgetId: string) => {
    try {
      // Remove widget from the store
      removeWidget(widgetId);
      
      // Update grid layout
      setGridLayout(prevLayout => prevLayout.filter(item => item.i !== widgetId));
      
      // Show success notification
      toast({
        title: "Widget Dihapus",
        description: "Widget telah berhasil dihapus dari dashboard.",
        variant: "default"
      });
    } catch (error) {
      // Error handling
      toast({
        title: "Gagal Menghapus Widget",
        description: error instanceof Error ? error.message : "Terjadi kesalahan saat menghapus widget.",
        variant: "destructive"
      });
    }
  }, [
    removeWidget, 
    setGridLayout, 
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
      // Provide a default set of widgets for all users
      const defaultWidgets = [
        {
          id: 'user-overview',
          title: `Selamat Datang, ${user.name}`,
          description: 'Ringkasan informasi untuk semua pengguna',
          category: WidgetCategory.OVERVIEW,
          content: `Anda login sebagai ${user.role}`,
          roles: Object.values(UserRole),
          size: 'LARGE',
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
          size: 'MEDIUM',
          icon: 'user',
          isCustomizable: true
        }
      ];

      // Safely get role-specific widgets
      const roleWidgets = Array.isArray(WidgetManager.getWidgetsForRole(user.role as UserRole)) 
        ? WidgetManager.getWidgetsForRole(user.role as UserRole)
        : [];

      // Set widgets with proper array spread
      setAvailableWidgets([
        ...defaultWidgets,
        ...roleWidgets
      ]);
    }
  }, [user]);

  useEffect(() => {
    const layout = widgets.map((widget) => {
      const widgetSize = calculateWidgetMinSize(widget);
      return {
        i: widget.id,
        x: 0,
        y: 0,
        w: widgetSize.minWidth || 2,
        h: widgetSize.minHeight || 2
      };
    });

    setGridLayout(sanitizeGridLayout(layout));
  }, [widgets]);

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

  const renderWidgetManagementButtons = () => (
    <div className="flex space-x-2 mb-4">
      <Button 
        variant="outline" 
        onClick={() => setIsAddWidgetDialogOpen(true)}
      >
        <PlusIcon className="mr-2 h-4 w-4" /> Tambah Widget
      </Button>
      <Button 
        variant="secondary" 
        onClick={() => setIsPresetDialogOpen(true)}
      >
        <BookPlus className="mr-2 h-4 w-4" /> Buat Preset
      </Button>
    </div>
  );

  const gridLayoutProps = {
    className: "layout w-full",
    cols: { lg: 12, md: 10, sm: 6, xs: 4 },
    rowHeight: 70,
    breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480 },
    compactType: "vertical",
    preventCollision: false,
    isDraggable: true,
    isResizable: true,
    resizeHandles: ['se', 'sw', 'ne', 'nw'],
    margin: [10, 10],
    containerPadding: [10, 10],
    style: { width: '100%', paddingBottom: '100px' } // Add extra padding at bottom
  };

  const constrainLayout = (layout: any[]) => {
    const maxAllowedY = 14; // Corresponds to maxRows - 1
    return layout.map(item => {
      // Ensure y position and height don't exceed max allowed rows
      const constrainedY = Math.min(item.y, maxAllowedY);
      const constrainedH = Math.min(item.h, maxAllowedY - constrainedY + 1);
      
      return {
        ...item,
        y: constrainedY,
        h: constrainedH
      };
    });
  };

  const handleLayoutChange = (newLayout: any[]) => {
    const validatedLayout = sanitizeGridLayout(newLayout);
    setGridLayout(validatedLayout);
  };

  return (
    <>
      <style>{resizeHandleStyles}</style>
      <div className="panel-page">
        <div className="panel-page-content">
          <div className="w-full h-full">
            <div className="flex flex-col h-full">
              {/* Render preset dropdown and widget addition UI */}
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
                      {Object.values(UserRole)
                        .filter(role => role !== UserRole.MEMBER)
                        .map((role) => (
                          <SelectItem 
                            key={role} 
                            value={role}
                          >
                            {DASHBOARD_PRESETS[role]?.name || 'Dashboard ' + role}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {renderWidgetManagementButtons()}
              <div className="flex-grow w-full">
                <ResponsiveGridLayout
                  {...gridLayoutProps}
                  layouts={{ lg: gridLayout }}
                  onLayoutChange={handleLayoutChange}
                  style={{ minHeight: '600px', paddingBottom: '150px' }} // Ensure minimum height and bottom padding
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
            <DialogTitle>Tambah Widget Baru</DialogTitle>
            <DialogDescription>
              Pilih kategori widget yang ingin ditambahkan ke dashboard.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-3 gap-4 py-4">
            {Object.values(WidgetCategory).map((category) => (
              <Button 
                key={category}
                variant="outline"
                onClick={() => handleAddWidget(category)}
                className="flex flex-col items-center justify-center space-y-2 p-4"
              >
                {/* Add corresponding icons for each category */}
                {category === WidgetCategory.FINANCIAL && <DollarSign />}
                {category === WidgetCategory.MEMBERSHIP && <Users />}
                {category === WidgetCategory.MINISTRY && <Church />}
                {category === WidgetCategory.EVENT && <Calendar />}
                {category === WidgetCategory.OVERVIEW && <BarChart2 />}
                <span>{category}</span>
              </Button>
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
            <DialogTitle>Buat Preset Dashboard</DialogTitle>
            <DialogDescription>
              Simpan konfigurasi dashboard saat ini sebagai preset untuk peran tertentu.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Nama Preset</Label>
              <Input 
                value={presetName}
                onChange={(e) => setPresetName(e.target.value)}
                placeholder="Contoh: Dashboard Admin Utama" 
                className="col-span-3" 
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Peran Pengguna</Label>
              <Select
                value={selectedPresetRole}
                onValueChange={(value) => setSelectedPresetRole(value as UserRole)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Pilih Peran" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(UserRole).map(role => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsPresetDialogOpen(false)}
            >
              Batal
            </Button>
            <Button 
              onClick={handleCreatePreset}
              disabled={!presetName || !selectedPresetRole}
            >
              Simpan Preset
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Custom Widget Dialog */}
      <CreateCustomWidgetDialog 
        open={isCreateCustomWidgetDialogOpen}
        onOpenChange={setIsCreateCustomWidgetDialogOpen}
      />
    </>
  );
};

export default FlexDashboardPage;
