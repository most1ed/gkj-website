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
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2 } from "lucide-react";

interface Mission {
  id: string;
  title: string;
  description: string;
}

interface VisionMissionContent {
  vision: string;
  missions: Mission[];
  lastUpdated: Date;
}

export function VisionMissionSection() {
  const [content, setContent] = useState<VisionMissionContent>({
    vision: `Menjadi gereja yang bertumbuh dalam iman, mengakar dalam budaya, 
    dan berbuah dalam pelayanan untuk kemuliaan Tuhan.`,
    missions: [
      {
        id: "1",
        title: "Pembinaan Iman",
        description: "Membina jemaat untuk bertumbuh dalam pengenalan akan Kristus.",
      },
      {
        id: "2",
        title: "Pelayanan Holistik",
        description: "Melayani kebutuhan rohani dan jasmani jemaat serta masyarakat.",
      },
      {
        id: "3",
        title: "Kesaksian Kristiani",
        description: "Memberitakan Injil melalui kesaksian hidup dan perkataan.",
      },
      // Add more dummy data as needed
    ],
    lastUpdated: new Date(),
  });

  const [isEditing, setIsEditing] = useState(false);

  const addMission = () => {
    const newMission: Mission = {
      id: Date.now().toString(),
      title: "",
      description: "",
    };
    setContent({
      ...content,
      missions: [...content.missions, newMission],
    });
  };

  const removeMission = (id: string) => {
    setContent({
      ...content,
      missions: content.missions.filter((mission) => mission.id !== id),
    });
  };

  const updateMission = (id: string, field: keyof Mission, value: string) => {
    setContent({
      ...content,
      missions: content.missions.map((mission) =>
        mission.id === id ? { ...mission, [field]: value } : mission
      ),
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Visi & Misi</CardTitle>
          <CardDescription>
            Visi dan misi gereja dalam melayani
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h4 className="font-medium">Visi</h4>
            <Textarea
              value={content.vision}
              onChange={(e) =>
                setContent({ ...content, vision: e.target.value })
              }
              disabled={!isEditing}
              className="min-h-[100px]"
            />
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Misi</h4>
              {isEditing && (
                <Button
                  onClick={addMission}
                  variant="outline"
                  size="sm"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Tambah
                </Button>
              )}
            </div>

            <div className="space-y-4">
              {content.missions.map((mission) => (
                <Card key={mission.id}>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Judul
                        </label>
                        <Input
                          value={mission.title}
                          onChange={(e) =>
                            updateMission(mission.id, "title", e.target.value)
                          }
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Deskripsi
                        </label>
                        <Textarea
                          value={mission.description}
                          onChange={(e) =>
                            updateMission(mission.id, "description", e.target.value)
                          }
                          disabled={!isEditing}
                        />
                      </div>
                      {isEditing && (
                        <div className="flex justify-end">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => removeMission(mission.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Hapus
                          </Button>
                        </div>
                      )}
                    </div>
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
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-6">Visi</h2>
              <p className="text-xl">{content.vision}</p>
            </div>

            <div className="text-center">
              <h2 className="text-3xl font-bold mb-8">Misi</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {content.missions.map((mission) => (
                  <div
                    key={mission.id}
                    className="p-6 border rounded-lg hover:shadow-lg transition-shadow"
                  >
                    <h3 className="text-xl font-semibold mb-4">
                      {mission.title}
                    </h3>
                    <p>{mission.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
