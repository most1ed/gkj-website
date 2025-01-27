import React from 'react';
import { 
  Users, 
  Briefcase, 
  BookOpen, 
  Heart, 
  Shield, 
  Globe 
} from 'lucide-react';

const leadershipTeam = [
  {
    title: 'Majelis Jemaat',
    description: 'Badan Pemimpin Tertinggi',
    members: [
      { name: 'Pdt. Johanes Setiawan', role: 'Ketua Majelis' },
      { name: 'Bpk. Hendra Wijaya', role: 'Sekretaris' },
      { name: 'Ibu Maria Hartono', role: 'Bendahara' }
    ]
  },
  {
    title: 'Tim Pastoral',
    description: 'Pelayanan Rohani dan Pembinaan',
    members: [
      { name: 'Pdt. Samuel Kristanto', role: 'Kepala Pelayanan Pastoral' },
      { name: 'Ev. Daniel Pranata', role: 'Koordinator Pembinaan' },
      { name: 'Ibu Susanto', role: 'Konseling Keluarga' }
    ]
  }
];

const ministryDivisions = [
  {
    icon: Heart,
    title: 'Pelayanan Sosial',
    description: 'Fokus pada kepedulian dan pemberdayaan masyarakat',
    responsibilities: [
      'Program bantuan sosial',
      'Pendampingan komunitas',
      'Kegiatan amal dan donasi'
    ]
  },
  {
    icon: BookOpen,
    title: 'Pendidikan & Pembinaan',
    description: 'Pengembangan iman dan pengetahuan',
    responsibilities: [
      'Sekolah Minggu',
      'Kelas Katekisasi',
      'Kelompok Pemuda',
      'Pembinaan Keluarga'
    ]
  },
  {
    icon: Globe,
    title: 'Misi & Penginjilan',
    description: 'Penyebaran Injil dan pelayanan lintas batas',
    responsibilities: [
      'Misi dalam kota',
      'Program penginjilan',
      'Kerjasama lintas gereja',
      'Pelayanan masyarakat'
    ]
  }
];

export default function OrganizationStructurePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <header className="text-center mb-16">
        <Users className="mx-auto mb-6 text-primary" size={64} />
        <h1 className="text-4xl font-bold mb-4">Struktur Organisasi</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Struktur kepemimpinan dan pelayanan GKJ Grogol Jakarta yang 
          berfokus pada pengembangan iman, misi, dan pelayanan masyarakat
        </p>
      </header>

      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-8 text-center">
          Tim Kepemimpinan
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {leadershipTeam.map((team, index) => (
            <div 
              key={index} 
              className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-2xl font-bold mb-4 text-primary">
                {team.title}
              </h3>
              <p className="text-gray-600 mb-6">{team.description}</p>
              <ul className="space-y-4">
                {team.members.map((member, idx) => (
                  <li 
                    key={idx} 
                    className="flex justify-between border-b pb-2 last:border-b-0"
                  >
                    <span className="font-semibold">{member.name}</span>
                    <span className="text-gray-600">{member.role}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-100 rounded-lg p-12">
        <h2 className="text-3xl font-semibold mb-8 text-center">
          Divisi Pelayanan
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {ministryDivisions.map((division, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <division.icon className="mx-auto mb-4 text-primary" size={48} />
              <h3 className="text-2xl font-bold mb-4">{division.title}</h3>
              <p className="text-gray-600 mb-6">{division.description}</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                {division.responsibilities.map((resp, idx) => (
                  <li key={idx}>{resp}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 text-center">
        <h2 className="text-3xl font-bold mb-6">Bergabung dalam Pelayanan</h2>
        <p className="text-xl text-gray-600 mb-8">
          Tertarik untuk berkontribusi? Hubungi kami untuk informasi lebih lanjut.
        </p>
        <a 
          href="mailto:pelayanan@gkjgrogoljakarta.org"
          className="bg-primary text-white px-8 py-4 rounded-lg hover:bg-primary-dark transition-colors"
        >
          Hubungi Tim Pelayanan
        </a>
      </section>
    </div>
  );
}
