import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "08123456789",
    address: "Jl. Example No. 123",
    baptisDate: "2010-01-01",
    sidiDate: "2015-01-01",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle form submission
    setIsEditing(false);
  };

  return (
    <div className="panel-page">
      <div className="panel-page-content">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">Profil Saya</h1>
            <div className="mt-4 sm:mt-0">
              <Button
                onClick={() => setIsEditing(!isEditing)}
                variant={isEditing ? "outline" : "default"}
              >
                {isEditing ? "Batal" : "Edit Profil"}
              </Button>
            </div>
          </div>

          <div className="mt-6">
            <Card className="overflow-hidden">
              <form onSubmit={handleSubmit} className="divide-y divide-gray-200">
                <div className="px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <Label htmlFor="name">Nama Lengkap</Label>
                      <Input
                        type="text"
                        name="name"
                        id="name"
                        disabled={!isEditing}
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        type="email"
                        name="email"
                        id="email"
                        disabled={!isEditing}
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <Label htmlFor="phone">Nomor Telepon</Label>
                      <Input
                        type="tel"
                        name="phone"
                        id="phone"
                        disabled={!isEditing}
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                      />
                    </div>

                    <div className="col-span-6">
                      <Label htmlFor="address">Alamat</Label>
                      <Input
                        type="text"
                        name="address"
                        id="address"
                        disabled={!isEditing}
                        value={formData.address}
                        onChange={(e) =>
                          setFormData({ ...formData, address: e.target.value })
                        }
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <Label htmlFor="baptisDate">Tanggal Baptis</Label>
                      <Input
                        type="date"
                        name="baptisDate"
                        id="baptisDate"
                        disabled={!isEditing}
                        value={formData.baptisDate}
                        onChange={(e) =>
                          setFormData({ ...formData, baptisDate: e.target.value })
                        }
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <Label htmlFor="sidiDate">Tanggal Sidi</Label>
                      <Input
                        type="date"
                        name="sidiDate"
                        id="sidiDate"
                        disabled={!isEditing}
                        value={formData.sidiDate}
                        onChange={(e) =>
                          setFormData({ ...formData, sidiDate: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>

                {isEditing && (
                  <div className="px-4 py-3 text-right sm:px-6">
                    <Button type="submit">Simpan Perubahan</Button>
                  </div>
                )}
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
