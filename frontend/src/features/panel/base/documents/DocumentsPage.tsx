import { useState } from "react";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Select } from "@/components/ui/Select";

const documentTypes = [
  { value: "baptis", label: "Surat Baptis" },
  { value: "sidi", label: "Surat Sidi" },
  { value: "keterangan", label: "Surat Keterangan Jemaat" },
];

export default function Documents() {
  const [showForm, setShowForm] = useState(false);

  return (
    <DashboardLayout>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Dokumen</h1>
          <Button onClick={() => setShowForm(true)}>Ajukan Dokumen</Button>
        </div>

        {showForm && (
          <Card className="mt-6">
            <form className="p-6 space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="documentType">Jenis Dokumen</Label>
                  <Select>
                    <option value="">Pilih jenis dokumen</option>
                    {documentTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </Select>
                </div>

                <div>
                  <Label htmlFor="purpose">Tujuan Pengajuan</Label>
                  <Input
                    id="purpose"
                    placeholder="Contoh: Keperluan administrasi"
                  />
                </div>

                <div>
                  <Label htmlFor="notes">Catatan Tambahan</Label>
                  <textarea
                    id="notes"
                    rows={3}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowForm(false)}
                >
                  Batal
                </Button>
                <Button type="submit">Ajukan</Button>
              </div>
            </form>
          </Card>
        )}

        <div className="mt-6">
          <h2 className="text-lg font-medium text-gray-900">Riwayat Dokumen</h2>
          <div className="mt-4">
            <Card>
              <div className="divide-y divide-gray-200">
                {[
                  {
                    type: "Surat Baptis",
                    date: "2024-01-20",
                    status: "Diproses",
                  },
                  {
                    type: "Surat Keterangan Jemaat",
                    date: "2024-01-15",
                    status: "Selesai",
                  },
                ].map((doc, idx) => (
                  <div
                    key={idx}
                    className="p-4 hover:bg-gray-50"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {doc.type}
                        </p>
                        <p className="text-sm text-gray-500">
                          Diajukan: {doc.date}
                        </p>
                      </div>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          doc.status === "Selesai"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {doc.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
