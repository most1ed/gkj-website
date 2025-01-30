import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const documentTypes = [
  { value: "baptis", label: "Surat Baptis" },
  { value: "sidi", label: "Surat Sidi" },
  { value: "keterangan", label: "Surat Keterangan Jemaat" },
  { value: "nikah", label: "Surat Keterangan Nikah" },
  { value: "pindah", label: "Surat Keterangan Pindah" },
];

const documentHistory = [
  {
    type: "Surat Baptis",
    date: "2024-01-20",
    status: "Diproses",
    purpose: "Keperluan administrasi",
    notes: "Dokumen sedang dalam proses verifikasi",
  },
  {
    type: "Surat Keterangan Jemaat",
    date: "2024-01-15",
    status: "Selesai",
    purpose: "Keperluan administrasi sekolah",
    notes: "Dokumen telah selesai dan dapat diambil",
  },
  {
    type: "Surat Keterangan Nikah",
    date: "2024-01-10",
    status: "Ditolak",
    purpose: "Persiapan pernikahan",
    notes: "Data tidak lengkap, mohon lengkapi data terlebih dahulu",
  },
];

export default function Documents() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    documentType: "",
    purpose: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle form submission
    setShowForm(false);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Dokumen</h1>
          <p className="mt-2 text-sm text-gray-600">
            Kelola dan ajukan dokumen gereja
          </p>
        </div>
        <Button onClick={() => setShowForm(true)}>Ajukan Dokumen</Button>
      </div>

      {showForm && (
        <Card className="mt-6">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="documentType">Jenis Dokumen</Label>
                <Select
                  id="documentType"
                  value={formData.documentType}
                  onValueChange={(value) =>
                    setFormData({ ...formData, documentType: value })
                  }
                >
                  <option value="">Pilih Jenis Dokumen</option>
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
                  value={formData.purpose}
                  onChange={(e) =>
                    setFormData({ ...formData, purpose: e.target.value })
                  }
                  placeholder="Contoh: Untuk keperluan administrasi"
                />
              </div>

              <div>
                <Label htmlFor="notes">Catatan Tambahan</Label>
                <textarea
                  id="notes"
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  placeholder="Tambahkan catatan jika diperlukan"
                />
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowForm(false)}
              >
                Batal
              </Button>
              <Button type="submit">Ajukan Dokumen</Button>
            </div>
          </form>
        </Card>
      )}

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">Semua Dokumen</TabsTrigger>
          <TabsTrigger value="pending">Dalam Proses</TabsTrigger>
          <TabsTrigger value="completed">Selesai</TabsTrigger>
          <TabsTrigger value="rejected">Ditolak</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <div className="divide-y divide-gray-200">
              {documentHistory.map((doc, idx) => (
                <div key={idx} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-gray-900">
                          {doc.type}
                        </p>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            doc.status === "Selesai"
                              ? "bg-green-100 text-green-800"
                              : doc.status === "Ditolak"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {doc.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">
                        Tujuan: {doc.purpose}
                      </p>
                      <p className="text-sm text-gray-500">
                        Catatan: {doc.notes}
                      </p>
                      <p className="text-xs text-gray-400">
                        Diajukan: {doc.date}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Detail
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="pending">
          <Card>
            <div className="divide-y divide-gray-200">
              {documentHistory
                .filter((doc) => doc.status === "Diproses")
                .map((doc, idx) => (
                  <div key={idx} className="p-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-gray-900">
                            {doc.type}
                          </p>
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800">
                            {doc.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">
                          Tujuan: {doc.purpose}
                        </p>
                        <p className="text-sm text-gray-500">
                          Catatan: {doc.notes}
                        </p>
                        <p className="text-xs text-gray-400">
                          Diajukan: {doc.date}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Detail
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="completed">
          <Card>
            <div className="divide-y divide-gray-200">
              {documentHistory
                .filter((doc) => doc.status === "Selesai")
                .map((doc, idx) => (
                  <div key={idx} className="p-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-gray-900">
                            {doc.type}
                          </p>
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                            {doc.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">
                          Tujuan: {doc.purpose}
                        </p>
                        <p className="text-sm text-gray-500">
                          Catatan: {doc.notes}
                        </p>
                        <p className="text-xs text-gray-400">
                          Diajukan: {doc.date}
                        </p>
                      </div>
                      <div className="space-x-2">
                        <Button variant="outline" size="sm">
                          Download
                        </Button>
                        <Button variant="outline" size="sm">
                          Detail
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="rejected">
          <Card>
            <div className="divide-y divide-gray-200">
              {documentHistory
                .filter((doc) => doc.status === "Ditolak")
                .map((doc, idx) => (
                  <div key={idx} className="p-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-gray-900">
                            {doc.type}
                          </p>
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-red-100 text-red-800">
                            {doc.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">
                          Tujuan: {doc.purpose}
                        </p>
                        <p className="text-sm text-gray-500">
                          Catatan: {doc.notes}
                        </p>
                        <p className="text-xs text-gray-400">
                          Diajukan: {doc.date}
                        </p>
                      </div>
                      <div className="space-x-2">
                        <Button size="sm">Ajukan Ulang</Button>
                        <Button variant="outline" size="sm">
                          Detail
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
