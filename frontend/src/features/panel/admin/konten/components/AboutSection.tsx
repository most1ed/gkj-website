import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/image-upload";
import { Separator } from "@/components/ui/separator";

interface AboutContent {
  description: string;
  image: string;
  lastUpdated: Date;
}

export function AboutSection() {
  const [content, setContent] = useState<AboutContent>({
    description: `Gereja Kristen Jawa (GKJ) adalah gereja yang berdiri di atas dasar firman Tuhan, 
    mengakar pada budaya Jawa, dan terpanggil untuk melayani semua orang. Kami adalah 
    bagian dari tubuh Kristus yang berkomitmen untuk memberitakan Injil dan melayani 
    sesama dengan kasih Kristus.`,
    image: "/images/church/about.jpg",
    lastUpdated: new Date(),
  });

  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Tentang Gereja</CardTitle>
          <CardDescription>
            Informasi dasar tentang gereja yang akan ditampilkan di website
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h4 className="font-medium">Gambar Utama</h4>
            <ImageUpload
              value={content.image}
              onChange={(url) => setContent({ ...content, image: url })}
              disabled={!isEditing}
              className="h-48 w-full"
            />
            <p className="text-sm text-muted-foreground">
              Ukuran yang disarankan: 1200x600 piksel
            </p>
          </div>

          <Separator />

          <div className="space-y-2">
            <h4 className="font-medium">Deskripsi</h4>
            <Textarea
              value={content.description}
              onChange={(e) =>
                setContent({ ...content, description: e.target.value })
              }
              disabled={!isEditing}
              className="min-h-[200px]"
            />
            <p className="text-sm text-muted-foreground">
              Terakhir diperbarui:{" "}
              {content.lastUpdated.toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          {isEditing ? (
            <>
              <Button
                variant="outline"
                onClick={() => setIsEditing(false)}
              >
                Batal
              </Button>
              <Button onClick={() => setIsEditing(false)}>
                Simpan Perubahan
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              Edit Konten
            </Button>
          )}
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pratinjau</CardTitle>
          <CardDescription>
            Tampilan konten di website
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            <img
              src={content.image}
              alt="About"
              className="w-full h-48 object-cover rounded-lg mb-6"
            />
            <div className="whitespace-pre-wrap">
              {content.description}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
