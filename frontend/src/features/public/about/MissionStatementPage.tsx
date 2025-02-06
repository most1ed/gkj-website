import React from 'react';
import { 
  Target, 
  Globe, 
  Heart, 
  BookOpen, 
  Users 
} from 'lucide-react';

const missionValues = [
  {
    icon: Target,
    title: "Visi Rohani",
    description: "Membentuk jemaat yang bertumbuh dalam iman, pengetahuan, dan pelayanan Kristus.",
    details: [
      "Pengajaran Alkitab yang mendalam",
      "Pembinaan iman berkelanjutan",
      "Penguatan kehidupan rohani"
    ]
  },
  {
    icon: Globe,
    title: "Misi Sosial",
    description: "Menghadirkan kasih Kristus melalui pelayanan yang transformatif dalam masyarakat.",
    details: [
      "Pemberdayaan komunitas",
      "Kepedulian terhadap kaum marginal",
      "Kerjasama lintas denominasi"
    ]
  },
  {
    icon: Heart,
    title: "Pelayanan Kasih",
    description: "Menunjukkan kasih Allah melalui tindakan nyata dan empati.",
    details: [
      "Program bantuan sosial",
      "Konseling dan pendampingan",
      "Jaringan dukungan pastoral"
    ]
  }
];

const communityEngagementSteps = [
  {
    icon: BookOpen,
    title: "Edukasi",
    description: "Program pendidikan dan pengembangan iman"
  },
  {
    icon: Users,
    title: "Partisipasi",
    description: "Keterlibatan aktif dalam pelayanan gereja"
  }
];

export default function MissionStatementPage() {
  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <header className="text-center mb-16">
        <Target className="mx-auto mb-6 text-primary" size={64} />
        <h1 className="text-4xl font-bold mb-4">Misi dan Nilai Gereja</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Menghadirkan kasih Kristus melalui pelayanan yang holistik, 
          membawa transformasi spiritual dan sosial dalam masyarakat.
        </p>
      </header>

      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-8 text-center">
          Nilai-Nilai Utama
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {missionValues.map((value, index) => (
            <div 
              key={index} 
              className="bg-card border rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <value.icon className="mx-auto mb-4 text-primary" size={48} />
              <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
              <p className="text-muted-foreground mb-6">{value.description}</p>
              <ul className="list-disc list-inside text-foreground space-y-2">
                {value.details.map((detail, idx) => (
                  <li key={idx}>{detail}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-secondary/10 rounded-lg p-12 mb-16">
        <h2 className="text-3xl font-semibold mb-8 text-center">
          Langkah Keterlibatan Komunitas
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {communityEngagementSteps.map((step, index) => (
            <div 
              key={index} 
              className="bg-card border rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <step.icon className="mx-auto mb-4 text-primary" size={48} />
              <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-3xl font-bold mb-6">Bergabung dalam Misi</h2>
        <p className="text-xl text-muted-foreground mb-8">
          Tertarik untuk berkontribusi dan membuat perbedaan? 
          Hubungi kami untuk informasi lebih lanjut tentang pelayanan kami.
        </p>
        <a 
          href="mailto:misi@gkjgrogoljakarta.org"
          className="btn-primary"
        >
          Hubungi Tim Misi
        </a>
      </section>
    </div>
  );
}
