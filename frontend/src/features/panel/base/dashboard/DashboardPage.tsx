import { Card } from "@/components/ui/Card";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        
        {/* Quick Stats */}
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <div className="p-5">
              <h3 className="text-lg font-medium text-gray-900">Status Keanggotaan</h3>
              <div className="mt-2">
                <p className="text-3xl font-semibold text-green-600">Aktif</p>
                <p className="mt-1 text-sm text-gray-500">Anggota sejak: 2020</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-5">
              <h3 className="text-lg font-medium text-gray-900">Dokumen</h3>
              <div className="mt-2">
                <p className="text-3xl font-semibold text-blue-600">2</p>
                <p className="mt-1 text-sm text-gray-500">Permohonan aktif</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-5">
              <h3 className="text-lg font-medium text-gray-900">Kegiatan</h3>
              <div className="mt-2">
                <p className="text-3xl font-semibold text-purple-600">3</p>
                <p className="mt-1 text-sm text-gray-500">Pendaftaran minggu ini</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Activities */}
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900">Aktivitas Terkini</h2>
          <div className="mt-4">
            <Card>
              <div className="divide-y divide-gray-200">
                {[
                  {
                    title: "Pendaftaran Ibadah Minggu",
                    date: "Hari ini",
                    status: "Terdaftar",
                  },
                  {
                    title: "Permohonan Surat Baptis",
                    date: "Kemarin",
                    status: "Diproses",
                  },
                  {
                    title: "Persembahan",
                    date: "2 hari yang lalu",
                    status: "Berhasil",
                  },
                ].map((activity, idx) => (
                  <div
                    key={idx}
                    className="p-4 hover:bg-gray-50 cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {activity.title}
                        </p>
                        <p className="text-sm text-gray-500">{activity.date}</p>
                      </div>
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                        {activity.status}
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
