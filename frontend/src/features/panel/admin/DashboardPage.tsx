import { Card } from '@/components/ui/card';
import {
  UsersIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline';

const stats = [
  {
    name: 'Total Jemaat',
    value: '2,500',
    change: '+3.2%',
    changeType: 'positive',
    icon: UsersIcon,
  },
  {
    name: 'Dokumen Pending',
    value: '15',
    change: '-2.1%',
    changeType: 'negative',
    icon: DocumentTextIcon,
  },
  {
    name: 'Persembahan Bulan Ini',
    value: 'Rp 25.5M',
    change: '+12.5%',
    changeType: 'positive',
    icon: CurrencyDollarIcon,
  },
  {
    name: 'Kegiatan Aktif',
    value: '8',
    change: '+5.5%',
    changeType: 'positive',
    icon: CalendarIcon,
  },
];

const recentActivities = [
  {
    user: 'John Doe',
    action: 'mengajukan surat baptis',
    time: '5 menit yang lalu',
  },
  {
    user: 'Jane Smith',
    action: 'mendaftar kegiatan retreat',
    time: '10 menit yang lalu',
  },
  {
    user: 'Admin',
    action: 'memperbarui data jemaat',
    time: '15 menit yang lalu',
  },
  {
    user: 'Majelis',
    action: 'menyetujui permohonan dokumen',
    time: '30 menit yang lalu',
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon
                    className="h-6 w-6 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.name}
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {stat.value}
                      </div>
                      <div
                        className={`inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium ${
                          stat.changeType === 'positive'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {stat.change}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <div className="p-5">
            <h2 className="text-lg font-medium text-gray-900">
              Aktivitas Terkini
            </h2>
            <div className="mt-5 flow-root">
              <ul className="-mb-8">
                {recentActivities.map((activity, activityIdx) => (
                  <li key={activityIdx}>
                    <div className="relative pb-8">
                      {activityIdx !== recentActivities.length - 1 ? (
                        <span
                          className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                          aria-hidden="true"
                        />
                      ) : null}
                      <div className="relative flex space-x-3">
                        <div>
                          <span className="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white">
                            <UsersIcon
                              className="h-5 w-5 text-white"
                              aria-hidden="true"
                            />
                          </span>
                        </div>
                        <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                          <div>
                            <p className="text-sm text-gray-500">
                              <span className="font-medium text-gray-900">
                                {activity.user}
                              </span>{' '}
                              {activity.action}
                            </p>
                          </div>
                          <div className="whitespace-nowrap text-right text-sm text-gray-500">
                            {activity.time}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <Card>
          <div className="p-5">
            <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
            <div className="mt-5 grid grid-cols-1 gap-4">
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                Input Data Jemaat Baru
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                Input Persembahan
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                Buat Pengumuman
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                Review Dokumen
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
