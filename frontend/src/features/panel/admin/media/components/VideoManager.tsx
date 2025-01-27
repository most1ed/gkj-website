import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import { id } from "date-fns/locale";

interface Video {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnailUrl: string;
  date: Date;
  views: number;
}

export function VideoManager() {
  const [videos, setVideos] = useState<Video[]>([
    {
      id: "1",
      title: "Ibadah Minggu - 21 Januari 2024",
      description: "Rekaman ibadah minggu",
      url: "https://youtube.com/watch?v=xxx",
      thumbnailUrl: "/images/videos/1.jpg",
      date: new Date(),
      views: 120,
    },
    // Add more dummy data as needed
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Video</h3>
          <p className="text-sm text-muted-foreground">
            Kelola video ibadah dan kegiatan
          </p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button>Tambah Video</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tambah Video Baru</DialogTitle>
              <DialogDescription>
                Tambahkan video dari YouTube atau platform lain
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Judul</Label>
                <Input id="title" placeholder="Masukkan judul video" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea 
                  id="description" 
                  placeholder="Masukkan deskripsi video"
                  className="h-20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="url">URL Video</Label>
                <Input 
                  id="url" 
                  placeholder="https://youtube.com/watch?v=xxx" 
                />
                <p className="text-sm text-muted-foreground">
                  Masukkan URL video dari YouTube
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="thumbnail">Thumbnail</Label>
                <Input 
                  id="thumbnail" 
                  placeholder="URL thumbnail atau upload gambar" 
                />
                <p className="text-sm text-muted-foreground">
                  Thumbnail akan diambil otomatis dari YouTube
                </p>
              </div>
            </div>

            <DialogFooter>
              <Button type="submit">Simpan</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <Card key={video.id}>
            <CardHeader className="p-0">
              <div className="aspect-video relative rounded-t-lg overflow-hidden">
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button variant="secondary">
                    Putar Video
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="text-lg">{video.title}</CardTitle>
              <CardDescription className="line-clamp-2 mt-1">
                {video.description}
              </CardDescription>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                {format(video.date, "dd MMMM yyyy", { locale: id })} • {video.views} views
              </div>
              <div className="space-x-2">
                <Button size="sm" variant="outline">Edit</Button>
                <Button size="sm" variant="destructive">Hapus</Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
