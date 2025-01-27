import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GalleryManager } from "./components/GalleryManager";
import { VideoManager } from "./components/VideoManager";
import { SermonManager } from "./components/SermonManager";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useMediaData } from "./hooks/useMediaData";

export default function MediaPage() {
  const { data, isLoading } = useMediaData();

  return (
    <div className="space-y-6 p-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Media</h2>
          <p className="text-muted-foreground">
            Kelola media, video, dan khotbah
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Upload Media
        </Button>
      </div>

      <Tabs defaultValue="gallery" className="space-y-4">
        <TabsList>
          <TabsTrigger value="gallery">Galeri</TabsTrigger>
          <TabsTrigger value="videos">Video</TabsTrigger>
          <TabsTrigger value="sermons">Khotbah</TabsTrigger>
        </TabsList>
        
        <TabsContent value="gallery" className="space-y-4">
          <GalleryManager data={data?.gallery} />
        </TabsContent>
        
        <TabsContent value="videos" className="space-y-4">
          <VideoManager data={data?.videos} />
        </TabsContent>
        
        <TabsContent value="sermons" className="space-y-4">
          <SermonManager data={data?.sermons} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
