import React, { useMemo, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  FileText, 
  Calendar, 
  DollarSign, 
  Users, 
  Newspaper, 
  BookOpen, 
  Shield, 
  Globe,
  AlertTriangle,
  RefreshCw 
} from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useKontenData } from "./hooks/useKontenData";
import { AboutSection } from "./components/AboutSection";
import { HistorySection } from "./components/HistorySection";
import { VisionMissionSection } from "./components/VisionMissionSection";
import { OrganizationSection } from "./components/OrganizationSection";

// Define interfaces for content management
interface ContentItem {
  id: string;
  title: string;
  description: string;
  status: 'draft' | 'published' | 'archived';
  createdAt: string;
  updatedAt: string;
}

// Initial mock data for content types
const initialContentData: {
  [key: string]: ContentItem[];
} = {
  services: [
    {
      id: 'service1',
      title: 'Ibadah Minggu Pagi',
      description: 'Ibadah rutin setiap minggu pagi',
      status: 'published',
      createdAt: '2024-01-15',
      updatedAt: '2024-02-01'
    }
  ],
  warta: [
    {
      id: 'warta1',
      title: 'Warta Gereja Januari 2024',
      description: 'Informasi dan berita gereja bulan Januari',
      status: 'published',
      createdAt: '2024-01-30',
      updatedAt: '2024-02-02'
    }
  ],
  announcements: [
    {
      id: 'announce1',
      title: 'Pengumuman Kegiatan Gereja',
      description: 'Berbagai kegiatan gereja bulan Februari',
      status: 'draft',
      createdAt: '2024-02-01',
      updatedAt: '2024-02-03'
    }
  ],
  news: [
    {
      id: 'news1',
      title: 'Liputan Kegiatan Sosial',
      description: 'Dokumentasi kegiatan sosial gereja',
      status: 'published',
      createdAt: '2024-01-20',
      updatedAt: '2024-02-01'
    }
  ],
  articles: [
    {
      id: 'article1',
      title: 'Refleksi Iman di Masa Kini',
      description: 'Artikel mendalam tentang perjalanan iman',
      status: 'published',
      createdAt: '2024-01-10',
      updatedAt: '2024-01-25'
    }
  ],
  ministries: [
    {
      id: 'ministry1',
      title: 'Komisi Pemuda',
      description: 'Pelayanan untuk generasi muda',
      status: 'published',
      createdAt: '2024-01-05',
      updatedAt: '2024-01-20'
    }
  ],
  offerings: [
    {
      id: 'offering1',
      title: 'Panduan Persembahan Online',
      description: 'Cara melakukan persembahan secara digital',
      status: 'published',
      createdAt: '2024-01-15',
      updatedAt: '2024-02-01'
    }
  ],
  schedule: [
    {
      id: 'schedule1',
      title: 'Jadwal Ibadah Februari',
      description: 'Jadwal ibadah dan kegiatan bulan Februari',
      status: 'published',
      createdAt: '2024-02-01',
      updatedAt: '2024-02-03'
    }
  ]
};

export default function KontenPage() {
  // Hooks in a consistent, predictable order
  const { data, isLoading, error, refetch } = useKontenData();
  
  // Use the first key of publicPageContents as the initial active tab
  const [activeTab, setActiveTab] = useState(Object.keys(initialContentData)[0]);
  const [publicPageContents, setPublicPageContents] = useState(initialContentData);
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Memoized icons for tab rendering
  const tabIcons = useMemo(() => ({
    services: <Calendar className="mr-2 h-4 w-4" />,
    warta: <FileText className="mr-2 h-4 w-4" />,
    announcements: <Newspaper className="mr-2 h-4 w-4" />,
    news: <Globe className="mr-2 h-4 w-4" />,
    articles: <BookOpen className="mr-2 h-4 w-4" />,
    ministries: <Users className="mr-2 h-4 w-4" />,
    offerings: <DollarSign className="mr-2 h-4 w-4" />,
    schedule: <Calendar className="mr-2 h-4 w-4" />
  }), []);

  // Ensure the active tab always has content
  const currentTabContents = publicPageContents[activeTab] || [];

  // Loading state handler
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[500px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // Error state handler
  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[500px] text-center">
        <AlertTriangle className="h-16 w-16 text-destructive mb-4" />
        <h2 className="text-2xl font-bold mb-2">Gagal Memuat Konten</h2>
        <p className="text-muted-foreground mb-4">
          {error.message || 'Terjadi kesalahan saat memuat data.'}
        </p>
        <Button onClick={() => refetch()}>
          <RefreshCw className="mr-2 h-4 w-4" /> Muat Ulang
        </Button>
      </div>
    );
  }

  // Content management handlers
  const handleEditContent = (content: ContentItem) => {
    setSelectedContent(content);
    setIsDialogOpen(true);
  };

  const handleDeleteContent = (id: string) => {
    const updatedContents = publicPageContents[activeTab].filter(
      content => content.id !== id
    );
    setPublicPageContents({
      ...publicPageContents,
      [activeTab]: updatedContents
    });
  };

  const handleAddContent = () => {
    setSelectedContent(null);
    setIsDialogOpen(true);
  };

  // Render content management table
  const renderContentManagementTable = () => (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold flex items-center">
          {tabIcons[activeTab as keyof typeof tabIcons]}
          Manajemen {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
        </h3>
        <Button onClick={handleAddContent}>
          <Plus className="mr-2 h-4 w-4" /> Tambah Konten
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Judul</TableHead>
            <TableHead>Deskripsi</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Dibuat</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentTabContents.map((content) => (
            <TableRow key={content.id}>
              <TableCell>{content.title}</TableCell>
              <TableCell>{content.description}</TableCell>
              <TableCell>
                <Badge 
                  variant={
                    content.status === 'published' ? 'default' : 
                    content.status === 'draft' ? 'secondary' : 'destructive'
                  }
                >
                  {content.status}
                </Badge>
              </TableCell>
              <TableCell>{content.createdAt}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleEditContent(content)}
                  >
                    <Edit className="mr-2 h-4 w-4" /> Edit
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={() => handleDeleteContent(content.id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" /> Hapus
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <div className="p-6">
      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab} 
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-8">
          {Object.keys(publicPageContents).map((tab) => (
            <TabsTrigger key={tab} value={tab}>
              {tabIcons[tab as keyof typeof tabIcons]}
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {Object.keys(publicPageContents).map((tab) => (
          <TabsContent key={tab} value={tab}>
            {renderContentManagementTable()}
          </TabsContent>
        ))}
      </Tabs>

      {/* Dialog for adding/editing content */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedContent ? 'Edit Konten' : 'Tambah Konten Baru'}
            </DialogTitle>
          </DialogHeader>
          {/* Add form for content management */}
        </DialogContent>
      </Dialog>
    </div>
  );
}
