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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/ui/image-upload"; // Perbaiki import ImageUpload dari lokasi yang benar
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2 } from "lucide-react";

interface HistoryEvent {
  id: string;
  year: string;
  title: string;
  description: string;
  image?: string;
}

interface HistoryContent {
  introduction: string;
  events: HistoryEvent[];
  lastUpdated: Date;
}

export function HistorySection() {
  const [content, setContent] = useState<HistoryContent>({
    introduction: `Gereja Kristen Jawa memiliki sejarah panjang dalam melayani 
    dan memberitakan Injil di tanah Jawa. Berikut adalah tonggak-tonggak 
    penting dalam perjalanan pelayanan kami:`,
    events: [
      {
        id: "1",
        year: "1950",
        title: "Pendirian Gereja",
        description: "Gereja didirikan oleh sekelompok jemaat yang rindu beribadah.",
        image: "/images/history/founding.jpg",
      },
      {
        id: "2",
        year: "1975",
        title: "Pembangunan Gedung Baru",
        description: "Pembangunan gedung gereja yang lebih besar untuk menampung jemaat yang bertumbuh.",
        image: "/images/history/building.jpg",
      },
      // Add more dummy data as needed
    ],
    lastUpdated: new Date(),
  });

  const [isEditing, setIsEditing] = useState(false);

  const addEvent = () => {
    const newEvent: HistoryEvent = {
      id: Date.now().toString(),
      year: "",
      title: "",
      description: "",
    };
    setContent({
      ...content,
      events: [...content.events, newEvent],
    });
  };

  const removeEvent = (id: string) => {
    setContent({
      ...content,
      events: content.events.filter((event) => event.id !== id),
    });
  };

  const updateEvent = (id: string, field: keyof HistoryEvent, value: string) => {
    setContent({
      ...content,
      events: content.events.map((event) =>
        event.id === id ? { ...event, [field]: value } : event
      ),
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Sejarah Gereja</CardTitle>
          <CardDescription>
            Sejarah dan perkembangan gereja dari waktu ke waktu
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h4 className="font-medium">Pengantar</h4>
            <Textarea
              value={content.introduction}
              onChange={(e) =>
                setContent({ ...content, introduction: e.target.value })
              }
              disabled={!isEditing}
              className="min-h-[100px]"
            />
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Tonggak Sejarah</h4>
              {isEditing && (
                <Button
                  onClick={addEvent}
                  variant="outline"
                  size="sm"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Tambah
                </Button>
              )}
            </div>

            <div className="space-y-4">
              {content.events.map((event) => (
                <Card key={event.id}>
                  <CardContent className="pt-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">
                              Tahun
                            </label>
                            <Input
                              value={event.year}
                              onChange={(e) =>
                                updateEvent(event.id, "year", e.target.value)
                              }
                              disabled={!isEditing}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">
                              Judul
                            </label>
                            <Input
                              value={event.title}
                              onChange={(e) =>
                                updateEvent(event.id, "title", e.target.value)
                              }
                              disabled={!isEditing}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Deskripsi
                          </label>
                          <Textarea
                            value={event.description}
                            onChange={(e) =>
                              updateEvent(event.id, "description", e.target.value)
                            }
                            disabled={!isEditing}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Gambar (Opsional)
                        </label>
                        <ImageUpload
                          value={event.image}
                          onChange={(url) =>
                            updateEvent(event.id, "image", url)
                          }
                          disabled={!isEditing}
                          className="h-40"
                        />
                      </div>
                    </div>

                    {isEditing && (
                      <div className="flex justify-end">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => removeEvent(event.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Hapus
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
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
            <p className="lead">{content.introduction}</p>
            <div className="space-y-12 mt-8">
              {content.events.map((event) => (
                <div key={event.id} className="flex gap-6">
                  <div className="flex-shrink-0 w-24 text-2xl font-bold">
                    {event.year}
                  </div>
                  <div className="flex-grow space-y-4">
                    <h3 className="text-xl font-semibold">{event.title}</h3>
                    {event.image && (
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-40 object-cover rounded-lg"
                      />
                    )}
                    <p>{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
