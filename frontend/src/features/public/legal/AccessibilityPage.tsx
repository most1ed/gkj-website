import React from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  WheelchairIcon, 
  EyeIcon, 
  HeartHandshakeIcon, 
  UsersIcon, 
  BookOpen 
} from 'lucide-react';

const accessibilityFeatures = [
  {
    title: 'Aksesibilitas Fisik',
    icon: WheelchairIcon,
    description: 'Fasilitas ramah difabel di seluruh area gereja',
    details: [
      'Ramp dan jalur khusus untuk pengguna kursi roda',
      'Toilet aksesibel dengan desain universal',
      'Tempat duduk khusus di area ibadah',
      'Parkir prioritas untuk penyandang disabilitas'
    ]
  },
  {
    title: 'Aksesibilitas Digital',
    icon: EyeIcon,
    description: 'Pengalaman web yang inklusif untuk semua pengguna',
    details: [
      'Dukungan pembaca layar (screen reader)',
      'Kontras warna yang ramah mata',
      'Ukuran teks yang dapat disesuaikan',
      'Navigasi keyboard untuk seluruh website'
    ]
  },
  {
    title: 'Pelayanan Inklusif',
    icon: HeartHandshakeIcon,
    description: 'Pendekatan pastoral yang menghargai keberagaman',
    details: [
      'Pendampingan pastoral untuk semua kalangan',
      'Penerjemah bahasa isyarat pada ibadah tertentu',
      'Materi pelayanan dalam format mudah diakses',
      'Pelatihan berkelanjutan tentang inklusi'
    ]
  }
];

const inclusivityCommitments = [
  {
    title: 'Non-Diskriminasi',
    icon: UsersIcon,
    description: 'Komitmen kami untuk menerima setiap individu tanpa membedakan latar belakang.'
  },
  {
    title: 'Pengembangan Berkelanjutan',
    icon: BookOpen,
    description: 'Terus belajar dan meningkatkan kualitas pelayanan inklusif.'
  }
];

export default function AccessibilityPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Helmet>
        <title>Akses & Inklusi - GKJ Grogol Jakarta</title>
        <meta name="description" content="Komitmen GKJ Grogol Jakarta dalam mewujudkan gereja yang inklusif dan ramah bagi semua" />
      </Helmet>

      <div className="text-center mb-12">
        <WheelchairIcon className="mx-auto mb-4 text-primary" size={64} />
        <h1 className="text-4xl font-bold mb-4">Akses & Inklusi</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Komitmen kami untuk menciptakan lingkungan gereja yang inklusif, 
          ramah, dan memberikan akses penuh bagi seluruh jemaat tanpa terkecuali.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {accessibilityFeatures.map((feature, index) => (
          <div 
            key={index}
            className="bg-background border rounded-lg p-6"
          >
            <div className="flex items-center mb-4">
              <feature.icon className="text-primary mr-4" size={40} />
              <div>
                <h2 className="text-xl font-semibold">{feature.title}</h2>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </div>
            <ul className="list-disc pl-6 space-y-2">
              {feature.details.map((detail, idx) => (
                <li key={idx} className="text-muted-foreground">{detail}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {inclusivityCommitments.map((commitment, index) => (
          <div 
            key={index}
            className="bg-background border rounded-lg p-6 text-center"
          >
            <commitment.icon className="mx-auto mb-4 text-primary" size={48} />
            <h3 className="text-xl font-bold mb-2">{commitment.title}</h3>
            <p className="text-muted-foreground">{commitment.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-background rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Bantuan Aksesibilitas</h2>
        <p className="text-muted-foreground mb-6">
          Jika Anda membutuhkan bantuan khusus atau memiliki pertanyaan 
          seputar aksesibilitas, silakan hubungi kami.
        </p>
        <button 
          className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
        >
          Hubungi Tim Aksesibilitas
        </button>
      </div>
    </div>
  );
}
