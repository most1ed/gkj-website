import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { FileUpload } from "@/components/ui/file-upload";
import { toast } from "@/components/ui/use-toast";
import { Plus, Download, Eye, Pencil, Trash } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

interface WartaItem {
  id: string;
  title: string;
  date: Date;
  status: "draft" | "published";
  author: string;
  description?: string;
  downloadUrl?: string;
  fileUrl?: string;
}

interface WartaJemaatProps {
  data?: {
    warta: WartaItem[];
  };
}

export function WartaJemaat({ data }: WartaJemaatProps) {
  const [wartas, setWartas] = useState<WartaItem[]>(data?.warta || []);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentWarta, setCurrentWarta] = useState<Partial<WartaItem>>({});
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const formatDate = (date: Date) => {
    return format(date, "dd MMMM yyyy", { locale: id });
  };

  const getStatusBadgeClass = (status: WartaItem["status"]) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100";
      case "draft":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-700 dark:text-yellow-100";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-100";
    }
  };

  const getStatusText = (status: WartaItem["status"]) => {
    switch (status) {
      case "published":
        return "Dipublikasi";
      case "draft":
        return "Draft";
      default:
        return "-";
    }
  };

  const handleAddWarta = () => {
    if (!uploadedFile) {
      toast({
        title: "Error",
        description: "Silakan upload file warta terlebih dahulu",
        variant: "destructive"
      });
      return;
    }

    const newWarta: WartaItem = {
      id: `${wartas.length + 1}`,
      title: currentWarta.title || "Warta Baru",
      date: currentWarta.date || new Date(),
      status: "draft",
      author: currentWarta.author || "Admin",
      description: currentWarta.description,
      downloadUrl: URL.createObjectURL(uploadedFile),
      fileUrl: URL.createObjectURL(uploadedFile)
    };

    setWartas([...wartas, newWarta]);
    toast({
      title: "Warta Ditambahkan",
      description: `${newWarta.title} berhasil ditambahkan.`
    });

    // Reset states
    setIsAddModalOpen(false);
    setCurrentWarta({});
    setUploadedFile(null);
  };

  const handleEditWarta = () => {
    const updatedWartas = wartas.map(warta => 
      warta.id === currentWarta.id 
        ? { 
            ...warta, 
            ...currentWarta,
            fileUrl: uploadedFile 
              ? URL.createObjectURL(uploadedFile) 
              : warta.fileUrl 
          } as WartaItem 
        : warta
    );

    setWartas(updatedWartas);
    toast({
      title: "Warta Diperbarui",
      description: `${currentWarta.title} berhasil diperbarui.`
    });

    // Reset states
    setIsEditModalOpen(false);
    setCurrentWarta({});
    setUploadedFile(null);
  };

  const handleDeleteWarta = (wartaId: string) => {
    const updatedWartas = wartas.filter(warta => warta.id !== wartaId);
    setWartas(updatedWartas);
    
    toast({
      title: "Warta Dihapus",
      description: "Warta telah dihapus dari daftar.",
      variant: "destructive"
    });
  };

  const handleDownloadWarta = (warta: WartaItem) => {
    if (!warta.downloadUrl) {
      toast({
        title: "Error",
        description: "File tidak tersedia untuk download",
        variant: "destructive"
      });
      return;
    }

    const link = document.createElement('a');
    link.href = warta.downloadUrl;
    link.download = `${warta.title}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Download Warta",
      description: `Mengunduh ${warta.title}`
    });
  };

  const handleViewWarta = (warta: WartaItem) => {
    if (!warta.fileUrl) {
      toast({
        title: "Error",
        description: "File tidak tersedia untuk ditampilkan",
        variant: "destructive"
      });
      return;
    }

    window.open(warta.fileUrl, '_blank');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <div>
              <CardTitle>Warta Jemaat</CardTitle>
              <CardDescription>
                Kelola warta jemaat mingguan
              </CardDescription>
            </div>
            <Button onClick={() => {
              setCurrentWarta({});
              setIsAddModalOpen(true);
            }}>
              <Plus className="mr-2 h-4 w-4" />
              Tambah Warta
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tanggal</TableHead>
                <TableHead>Judul</TableHead>
                <TableHead>Pembuat</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {wartas.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{formatDate(item.date)}</TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.author}</TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeClass(item.status)}>
                      {getStatusText(item.status)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => handleViewWarta(item)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => {
                        setCurrentWarta(item);
                        setIsEditModalOpen(true);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    {item.downloadUrl && (
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => handleDownloadWarta(item)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    )}
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => handleDeleteWarta(item.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Warta Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Tambah Warta Jemaat</DialogTitle>
            <DialogDescription>
              Masukkan detail warta jemaat baru
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-6 py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Tanggal</Label>
                <Calendar
                  mode="single"
                  selected={currentWarta.date || new Date()}
                  onSelect={(date) => setCurrentWarta(prev => ({ 
                    ...prev, 
                    date: date || new Date() 
                  }))}
                  className="border rounded-md"
                  locale={id}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Judul</Label>
                <Input 
                  id="title" 
                  placeholder="Masukkan judul warta"
                  value={currentWarta.title || ""}
                  onChange={(e) => setCurrentWarta(prev => ({ 
                    ...prev, 
                    title: e.target.value 
                  }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="author">Pembuat</Label>
                <Input 
                  id="author" 
                  placeholder="Nama pembuat warta"
                  value={currentWarta.author || ""}
                  onChange={(e) => setCurrentWarta(prev => ({ 
                    ...prev, 
                    author: e.target.value 
                  }))}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea 
                  id="description" 
                  placeholder="Keterangan warta"
                  className="h-32"
                  value={currentWarta.description || ""}
                  onChange={(e) => setCurrentWarta(prev => ({ 
                    ...prev, 
                    description: e.target.value 
                  }))}
                />
              </div>

              <div className="space-y-2">
                <Label>File Warta</Label>
                <FileUpload 
                  accept=".pdf,.doc,.docx"
                  onChange={(file) => setUploadedFile(file)}
                />
                <p className="text-sm text-muted-foreground">
                  Upload file warta (PDF/DOC)
                </p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button 
              type="submit"
              onClick={handleAddWarta}
            >
              Simpan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Warta Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Warta Jemaat</DialogTitle>
            <DialogDescription>
              Perbarui detail warta jemaat
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-6 py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Tanggal</Label>
                <Calendar
                  mode="single"
                  selected={currentWarta.date || new Date()}
                  onSelect={(date) => setCurrentWarta(prev => ({ 
                    ...prev, 
                    date: date || new Date() 
                  }))}
                  className="border rounded-md"
                  locale={id}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Judul</Label>
                <Input 
                  id="title" 
                  placeholder="Masukkan judul warta"
                  value={currentWarta.title || ""}
                  onChange={(e) => setCurrentWarta(prev => ({ 
                    ...prev, 
                    title: e.target.value 
                  }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="author">Pembuat</Label>
                <Input 
                  id="author" 
                  placeholder="Nama pembuat warta"
                  value={currentWarta.author || ""}
                  onChange={(e) => setCurrentWarta(prev => ({ 
                    ...prev, 
                    author: e.target.value 
                  }))}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea 
                  id="description" 
                  placeholder="Keterangan warta"
                  className="h-32"
                  value={currentWarta.description || ""}
                  onChange={(e) => setCurrentWarta(prev => ({ 
                    ...prev, 
                    description: e.target.value 
                  }))}
                />
              </div>

              <div className="space-y-2">
                <Label>File Warta</Label>
                <FileUpload 
                  accept=".pdf,.doc,.docx"
                  onChange={(file) => setUploadedFile(file)}
                />
                <p className="text-sm text-muted-foreground">
                  Upload file warta baru (PDF/DOC)
                </p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button 
              type="submit"
              onClick={handleEditWarta}
            >
              Simpan Perubahan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
