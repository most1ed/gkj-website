import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Image,
  Video,
  FileText,
  MoreVertical,
  Upload,
  FolderPlus,
  Search,
  Filter,
  Trash2,
  Download,
  Edit,
  Eye,
} from "lucide-react";
import { GoogleDriveSync } from "./components/GoogleDriveSync";

interface MediaItem {
  id: string;
  name: string;
  type: "image" | "video" | "document";
  size: number;
  uploadedBy: string;
  uploadDate: string;
  url: string;
  category: string;
}

export default function MediaPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([
    {
      id: "1",
      name: "Ibadah Minggu.jpg",
      type: "image",
      size: 2500000,
      uploadedBy: "Admin",
      uploadDate: "2024-01-30",
      url: "/images/ibadah-minggu.jpg",
      category: "Ibadah",
    },
    {
      id: "2",
      name: "Paduan Suara.mp4",
      type: "video",
      size: 15000000,
      uploadedBy: "Admin",
      uploadDate: "2024-01-29",
      url: "/videos/paduan-suara.mp4",
      category: "Musik",
    },
    {
      id: "3",
      name: "Tata Ibadah.pdf",
      type: "document",
      size: 500000,
      uploadedBy: "Admin",
      uploadDate: "2024-01-28",
      url: "/documents/tata-ibadah.pdf",
      category: "Dokumen",
    },
  ]);

  const categories = ["Ibadah", "Musik", "Dokumen", "Kegiatan", "Pengumuman"];

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFileIcon = (type: MediaItem["type"]) => {
    switch (type) {
      case "image":
        return <Image className="h-4 w-4" />;
      case "video":
        return <Video className="h-4 w-4" />;
      case "document":
        return <FileText className="h-4 w-4" />;
    }
  };

  const filteredMedia = mediaItems.filter((item) => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSelectAll = (checked: boolean | "indeterminate") => {
    if (checked === true) {
      setSelectedFiles(filteredMedia.map((item) => item.id));
    } else if (checked === false) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles([]);
    }
  };

  const handleSelectFile = (fileId: string, checked: boolean | "indeterminate") => {
    if (checked === true) {
      setSelectedFiles([...selectedFiles, fileId]);
    } else if (checked === false) {
      setSelectedFiles(selectedFiles.filter((id) => id !== fileId));
    } else {
      setSelectedFiles([]);
    }
  };

  return (
    <div className="space-y-6 p-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Media</h2>
          <p className="text-muted-foreground">
            Kelola dan organisasi konten media gereja
          </p>
        </div>
        <div className="flex items-center gap-4">
          <GoogleDriveSync
            selectedFiles={selectedFiles}
            onSync={() => setSelectedFiles([])}
          />
          <Button>
            <FolderPlus className="mr-2 h-4 w-4" />
            Folder Baru
          </Button>
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Unggah Media
          </Button>
        </div>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          {/* Search and Filter */}
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cari media..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kategori</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Media List */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <Checkbox
                    checked={
                      selectedFiles.length > 0 &&
                      selectedFiles.length < filteredMedia.length
                        ? "indeterminate"
                        : selectedFiles.length === filteredMedia.length
                    }
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Ukuran</TableHead>
                <TableHead>Pengunggah</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMedia.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedFiles.includes(item.id)}
                      onCheckedChange={(checked) => handleSelectFile(item.id, checked)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {getFileIcon(item.type)}
                      {item.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.category}</Badge>
                  </TableCell>
                  <TableCell>{formatFileSize(item.size)}</TableCell>
                  <TableCell>{item.uploadedBy}</TableCell>
                  <TableCell>{item.uploadDate}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          Lihat
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          Unduh
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Hapus
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
