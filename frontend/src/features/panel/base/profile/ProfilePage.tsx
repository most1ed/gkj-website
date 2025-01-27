import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

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
    <DashboardLayout>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Profil Saya</h1>
          <Button
            variant={isEditing ? "outline" : "default"}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Batal" : "Edit Profil"}
          </Button>
        </div>

        <div className="mt-6">
          <Card>
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <Label htmlFor="name">Nama Lengkap</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Nomor Telepon</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <Label htmlFor="address">Alamat</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <Label htmlFor="baptisDate">Tanggal Baptis</Label>
                  <Input
                    id="baptisDate"
                    type="date"
                    value={formData.baptisDate}
                    onChange={(e) =>
                      setFormData({ ...formData, baptisDate: e.target.value })
                    }
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <Label htmlFor="sidiDate">Tanggal Sidi</Label>
                  <Input
                    id="sidiDate"
                    type="date"
                    value={formData.sidiDate}
                    onChange={(e) =>
                      setFormData({ ...formData, sidiDate: e.target.value })
                    }
                    disabled={!isEditing}
                  />
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end">
                  <Button type="submit">Simpan Perubahan</Button>
                </div>
              )}
            </form>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
