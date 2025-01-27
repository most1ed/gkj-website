import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export function GallerySection() {
  const recentPhotos = [
    {
      title: "Ibadah Natal 2024",
      date: "25 Des 2024",
      imageUrl: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=800&auto=format&fit=crop"
    },
    {
      title: "Perayaan HUT ke-50",
      date: "10 Des 2024",
      imageUrl: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=800&auto=format&fit=crop"
    },
    {
      title: "Retreat Pemuda",
      date: "5 Des 2024",
      imageUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&auto=format&fit=crop"
    }
  ];

  return (
    <section className="py-12 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold">Galeri Kegiatan</h2>
            <p className="text-muted-foreground">Momen-momen berharga dalam pelayanan</p>
          </div>
          <Button variant="outline">Lihat Semua</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentPhotos.map((photo, index) => (
            <Card key={index} className="overflow-hidden group cursor-pointer">
              <CardContent className="p-0 relative">
                <div className="aspect-video bg-muted relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="font-medium">{photo.title}</h3>
                    <p className="text-sm text-white/80">{photo.date}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
