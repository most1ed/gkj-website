import React from 'react';
import { 
  Users, 
  Briefcase, 
  BookOpen, 
  Heart, 
  Megaphone, 
  Handshake 
} from 'lucide-react';

const leadershipTeam = [
  {
    title: "Majelis Jemaat",
    description: "Badan kepemimpinan tertinggi yang bertanggung jawab atas kebijakan dan arah gereja",
    members: [
      { name: "Pdt. Nama Pendeta", role: "Ketua Majelis" },
      { name: "Nama Penatua", role: "Sekretaris" },
      { name: "Nama Penatua", role: "Bendahara" }
    ]
  },
  {
    title: "Tim Pastoral",
    description: "Melayani kebutuhan rohani jemaat dan memberikan bimbingan spiritual",
    members: [
      { name: "Pdt. Nama Pendeta", role: "Pendeta Utama" },
      { name: "Nama Pendeta", role: "Pendeta Muda" },
      { name: "Nama Pembina", role: "Konselor" }
    ]
  }
];

const ministryDivisions = [
  {
    title: "Pelayanan Iman",
    icon: BookOpen,
    description: "Fokus pada pertumbuhan iman dan pendalaman Alkitab",
    responsibilities: [
      "Pembinaan Kategorial",
      "Kajian Alkitab",
      "Pendidikan Iman"
    ]
  },
  {
    title: "Pelayanan Misi",
    icon: Megaphone,
    description: "Mengembangkan misi gereja dalam konteks lokal dan global",
    responsibilities: [
      "Penginjilan",
      "Misi Sosial",
      "Kerjasama Antar Gereja"
    ]
  },
  {
    title: "Pelayanan Kasih",
    icon: Heart,
    description: "Memberikan perhatian dan bantuan kepada mereka yang membutuhkan",
    responsibilities: [
      "Kepedulian Sosial",
      "Konseling",
      "Pemberdayaan Masyarakat"
    ]
  }
];

export default function OrganizationStructurePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <header className="text-center mb-16">
        <Users className="mx-auto mb-6 text-primary" size={64} />
        <h1 className="text-4xl font-bold mb-4">Struktur Organisasi</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
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
              className="bg-card border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-2xl font-bold mb-4 text-primary">
                {team.title}
              </h3>
              <p className="text-muted-foreground mb-6">{team.description}</p>
              <ul className="space-y-4">
                {team.members.map((member, idx) => (
                  <li 
                    key={idx} 
                    className="flex justify-between border-b pb-2 last:border-b-0"
                  >
                    <span className="font-semibold">{member.name}</span>
                    <span className="text-muted-foreground">{member.role}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-secondary/10 rounded-lg p-12">
        <h2 className="text-3xl font-semibold mb-8 text-center">
          Divisi Pelayanan
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {ministryDivisions.map((division, index) => (
            <div 
              key={index} 
              className="bg-card rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <division.icon className="mx-auto mb-4 text-primary" size={48} />
              <h3 className="text-2xl font-bold mb-4">{division.title}</h3>
              <p className="text-muted-foreground mb-6">{division.description}</p>
              <ul className="list-disc list-inside text-foreground space-y-2">
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
        <p className="text-xl text-muted-foreground mb-8">
          Tertarik untuk berkontribusi? Hubungi kami untuk informasi lebih lanjut.
        </p>
        <a 
          href="mailto:pelayanan@gkjgrogoljakarta.org"
          className="btn-primary"
        >
          Hubungi Tim Pelayanan
        </a>
      </section>
    </div>
  );
}
