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
import { ImageUpload } from "@/components/ui/image-upload";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2 } from "lucide-react";

interface Leader {
  id: string;
  name: string;
  position: string;
  image?: string;
}

interface Division {
  id: string;
  name: string;
  description: string;
  leader: string;
}

interface OrganizationContent {
  leaders: Leader[];
  divisions: Division[];
  structureImage: string;
  lastUpdated: Date;
}

export function OrganizationSection() {
  const [content, setContent] = useState<OrganizationContent>({
    leaders: [
      {
        id: "1",
        name: "Pdt. John Doe",
        position: "Pendeta Jemaat",
        image: "/images/leaders/pendeta.jpg",
      },
      {
        id: "2",
        name: "Tn. Jane Smith",
        position: "Ketua Majelis",
        image: "/images/leaders/ketua.jpg",
      },
      // Add more dummy data as needed
    ],
    divisions: [
      {
        id: "1",
        name: "Komisi Anak",
        description: "Melayani anak-anak dalam pertumbuhan iman",
        leader: "Sdri. Maria",
      },
      {
        id: "2",
        name: "Komisi Pemuda",
        description: "Membina pemuda dalam pelayanan",
        leader: "Sdr. Peter",
      },
      // Add more dummy data as needed
    ],
    structureImage: "/images/organization/structure.png",
    lastUpdated: new Date(),
  });

  const [isEditing, setIsEditing] = useState(false);

  const addLeader = () => {
    const newLeader: Leader = {
      id: Date.now().toString(),
      name: "",
      position: "",
    };
    setContent({
      ...content,
      leaders: [...content.leaders, newLeader],
    });
  };

  const removeLeader = (id: string) => {
    setContent({
      ...content,
      leaders: content.leaders.filter((leader) => leader.id !== id),
    });
  };

  const updateLeader = (id: string, field: keyof Leader, value: string) => {
    setContent({
      ...content,
      leaders: content.leaders.map((leader) =>
        leader.id === id ? { ...leader, [field]: value } : leader
      ),
    });
  };

  const addDivision = () => {
    const newDivision: Division = {
      id: Date.now().toString(),
      name: "",
      description: "",
      leader: "",
    };
    setContent({
      ...content,
      divisions: [...content.divisions, newDivision],
    });
  };

  const removeDivision = (id: string) => {
    setContent({
      ...content,
      divisions: content.divisions.filter((division) => division.id !== id),
    });
  };

  const updateDivision = (id: string, field: keyof Division, value: string) => {
    setContent({
      ...content,
      divisions: content.divisions.map((division) =>
        division.id === id ? { ...division, [field]: value } : division
      ),
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Struktur Organisasi</CardTitle>
          <CardDescription>
            Bagan struktur organisasi gereja
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h4 className="font-medium">Bagan Struktur</h4>
            <ImageUpload
              value={content.structureImage}
              onChange={(url) =>
                setContent({ ...content, structureImage: url })
              }
              disabled={!isEditing}
              className="h-96 w-full"
            />
            <p className="text-sm text-muted-foreground">
              Unggah gambar bagan struktur organisasi (format: PNG, JPG)
            </p>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Pimpinan Gereja</h4>
              {isEditing && (
                <Button
                  onClick={addLeader}
                  variant="outline"
                  size="sm"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Tambah
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {content.leaders.map((leader) => (
                <Card key={leader.id}>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <ImageUpload
                        value={leader.image}
                        onChange={(url) =>
                          updateLeader(leader.id, "image", url)
                        }
                        disabled={!isEditing}
                        className="h-40 w-40 mx-auto rounded-full"
                      />
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Nama
                        </label>
                        <Input
                          value={leader.name}
                          onChange={(e) =>
                            updateLeader(leader.id, "name", e.target.value)
                          }
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Jabatan
                        </label>
                        <Input
                          value={leader.position}
                          onChange={(e) =>
                            updateLeader(leader.id, "position", e.target.value)
                          }
                          disabled={!isEditing}
                        />
                      </div>
                      {isEditing && (
                        <div className="flex justify-end">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => removeLeader(leader.id)}
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

          <Separator />

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Komisi-komisi</h4>
              {isEditing && (
                <Button
                  onClick={addDivision}
                  variant="outline"
                  size="sm"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Tambah
                </Button>
              )}
            </div>

            <div className="space-y-4">
              {content.divisions.map((division) => (
                <Card key={division.id}>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Nama Komisi
                        </label>
                        <Input
                          value={division.name}
                          onChange={(e) =>
                            updateDivision(division.id, "name", e.target.value)
                          }
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Deskripsi
                        </label>
                        <Input
                          value={division.description}
                          onChange={(e) =>
                            updateDivision(division.id, "description", e.target.value)
                          }
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Koordinator
                        </label>
                        <Input
                          value={division.leader}
                          onChange={(e) =>
                            updateDivision(division.id, "leader", e.target.value)
                          }
                          disabled={!isEditing}
                        />
                      </div>
                      {isEditing && (
                        <div className="flex justify-end">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => removeDivision(division.id)}
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
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-center mb-8">
                Struktur Organisasi
              </h2>
              <img
                src={content.structureImage}
                alt="Struktur Organisasi"
                className="w-full max-h-96 object-contain"
              />
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-bold text-center mb-8">
                Pimpinan Gereja
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {content.leaders.map((leader) => (
                  <div
                    key={leader.id}
                    className="text-center"
                  >
                    {leader.image && (
                      <img
                        src={leader.image}
                        alt={leader.name}
                        className="w-40 h-40 rounded-full mx-auto mb-4 object-cover"
                      />
                    )}
                    <h3 className="text-xl font-semibold mb-2">
                      {leader.name}
                    </h3>
                    <p className="text-muted-foreground">
                      {leader.position}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-center mb-8">
                Komisi-komisi
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {content.divisions.map((division) => (
                  <div
                    key={division.id}
                    className="p-6 border rounded-lg hover:shadow-lg transition-shadow"
                  >
                    <h3 className="text-xl font-semibold mb-2">
                      {division.name}
                    </h3>
                    <p className="mb-4">{division.description}</p>
                    <p className="text-sm text-muted-foreground">
                      Koordinator: {division.leader}
                    </p>
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
