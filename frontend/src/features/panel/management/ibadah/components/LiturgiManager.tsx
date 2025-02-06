import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { FileUpload } from "@/components/ui/file-upload";
import { toast } from "@/components/ui/use-toast";
import { Download, Edit, Trash2 } from "lucide-react";

interface LiturgiItem {
  id: string;
  title: string;
  date: Date;
  description: string;
  fileUrl: string;
  downloads: number;
}

export function LiturgiManager() {
  const [liturgies, setLiturgies] = useState<LiturgiItem[]>([
    {
      id: "1",
      title: "Liturgi Ibadah Minggu",
      date: new Date(),
      description: "Liturgi ibadah minggu pagi",
      fileUrl: "/files/liturgi/1.pdf",
      downloads: 25,
    },
  ]);

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentLiturgi, setCurrentLiturgi] = useState<Partial<LiturgiItem>>({});
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleAddLiturgi = () => {
    if (!uploadedFile) {
      toast({
        title: "Error",
        description: "Silakan upload file liturgi terlebih dahulu",
        variant: "destructive"
      });
      return;
    }

    const newLiturgi: LiturgiItem = {
      id: `${liturgies.length + 1}`,
      title: currentLiturgi.title || "Liturgi Baru",
      date: selectedDate,
      description: currentLiturgi.description || "",
      fileUrl: URL.createObjectURL(uploadedFile),
      downloads: 0
    };

    setLiturgies([...liturgies, newLiturgi]);
    toast({
      title: "Liturgi Ditambahkan",
      description: `${newLiturgi.title} berhasil ditambahkan.`
    });

    // Reset states
    setIsAddModalOpen(false);
    setCurrentLiturgi({});
    setUploadedFile(null);
  };

  const handleEditLiturgi = () => {
    const updatedLiturgies = liturgies.map(liturgi => 
      liturgi.id === currentLiturgi.id 
        ? { 
            ...liturgi, 
            ...currentLiturgi,
            fileUrl: uploadedFile 
              ? URL.createObjectURL(uploadedFile) 
              : liturgi.fileUrl 
          } as LiturgiItem 
        : liturgi
    );

    setLiturgies(updatedLiturgies);
    toast({
      title: "Liturgi Diperbarui",
      description: `${currentLiturgi.title} berhasil diperbarui.`
    });

    // Reset states
    setIsEditModalOpen(false);
    setCurrentLiturgi({});
    setUploadedFile(null);
  };

  const handleDeleteLiturgi = (liturgiId: string) => {
    const updatedLiturgies = liturgies.filter(liturgi => liturgi.id !== liturgiId);
    setLiturgies(updatedLiturgies);
    
    toast({
      title: "Liturgi Dihapus",
      description: "Liturgi telah dihapus dari daftar.",
      variant: "destructive"
    });
  };

  const handleDownloadLiturgi = (liturgi: LiturgiItem) => {
    const link = document.createElement('a');
    link.href = liturgi.fileUrl;
    link.download = `${liturgi.title}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Update download count
    const updatedLiturgies = liturgies.map(item => 
      item.id === liturgi.id 
        ? { ...item, downloads: item.downloads + 1 } 
        : item
    );
    setLiturgies(updatedLiturgies);

    toast({
      title: "Download Liturgi",
      description: `Mengunduh ${liturgi.title}`
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Liturgi</h3>
          <p className="text-sm text-muted-foreground">
            Kelola liturgi ibadah
          </p>
        </div>

        <Button onClick={() => {
          setCurrentLiturgi({});
          setIsAddModalOpen(true);
        }}>
          Tambah Liturgi
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tanggal</TableHead>
              <TableHead>Judul</TableHead>
              <TableHead>Keterangan</TableHead>
              <TableHead>File</TableHead>
              <TableHead>Downloads</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {liturgies.map((liturgi) => (
              <TableRow key={liturgi.id}>
                <TableCell>
                  {format(liturgi.date, "dd MMMM yyyy", { locale: id })}
                </TableCell>
                <TableCell>{liturgi.title}</TableCell>
                <TableCell className="max-w-md truncate">
                  {liturgi.description}
                </TableCell>
                <TableCell>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDownloadLiturgi(liturgi)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </TableCell>
                <TableCell>{liturgi.downloads}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setCurrentLiturgi(liturgi);
                      setIsEditModalOpen(true);
                    }}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleDeleteLiturgi(liturgi.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Hapus
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Add Liturgi Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Tambah Liturgi Baru</DialogTitle>
            <DialogDescription>
              Upload file liturgi ibadah
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-6 py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Tanggal</Label>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  className="border rounded-md"
                  locale={id}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Judul</Label>
                <Input 
                  id="title" 
                  placeholder="Masukkan judul liturgi"
                  value={currentLiturgi.title || ""}
                  onChange={(e) => setCurrentLiturgi(prev => ({ 
                    ...prev, 
                    title: e.target.value 
                  }))}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="description">Keterangan</Label>
                <Textarea 
                  id="description" 
                  placeholder="Keterangan liturgi"
                  className="h-32"
                  value={currentLiturgi.description || ""}
                  onChange={(e) => setCurrentLiturgi(prev => ({ 
                    ...prev, 
                    description: e.target.value 
                  }))}
                />
              </div>

              <div className="space-y-2">
                <Label>File Liturgi</Label>
                <FileUpload 
                  accept=".pdf,.doc,.docx"
                  onChange={(file) => setUploadedFile(file)}
                />
                <p className="text-sm text-muted-foreground">
                  Upload file liturgi (PDF/DOC)
                </p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button 
              type="submit"
              onClick={handleAddLiturgi}
            >
              Simpan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Liturgi Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Liturgi</DialogTitle>
            <DialogDescription>
              Perbarui detail liturgi
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-6 py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Tanggal</Label>
                <Calendar
                  mode="single"
                  selected={currentLiturgi.date || new Date()}
                  onSelect={(date) => date && setCurrentLiturgi(prev => ({ 
                    ...prev, 
                    date 
                  }))}
                  className="border rounded-md"
                  locale={id}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Judul</Label>
                <Input 
                  id="title" 
                  placeholder="Masukkan judul liturgi"
                  value={currentLiturgi.title || ""}
                  onChange={(e) => setCurrentLiturgi(prev => ({ 
                    ...prev, 
                    title: e.target.value 
                  }))}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="description">Keterangan</Label>
                <Textarea 
                  id="description" 
                  placeholder="Keterangan liturgi"
                  className="h-32"
                  value={currentLiturgi.description || ""}
                  onChange={(e) => setCurrentLiturgi(prev => ({ 
                    ...prev, 
                    description: e.target.value 
                  }))}
                />
              </div>

              <div className="space-y-2">
                <Label>File Liturgi</Label>
                <FileUpload 
                  accept=".pdf,.doc,.docx"
                  onChange={(file) => setUploadedFile(file)}
                />
                <p className="text-sm text-muted-foreground">
                  Upload file liturgi baru (PDF/DOC)
                </p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button 
              type="submit"
              onClick={handleEditLiturgi}
            >
              Simpan Perubahan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
