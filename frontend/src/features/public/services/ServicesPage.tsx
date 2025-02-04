import React from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { AnimatedPage } from '@/components/ui/AnimatedWrapper';
import { useServicesData, useAnnouncementsData } from '@/hooks';
import { Calendar, Clock, Users, BookOpen } from 'lucide-react';

// Types
interface Service {
  id: number;
  title: string;
  date?: string;
  day?: string;
  time: string;
  preacher?: string;
  theme?: string;
  location: string;
  description: string;
  streamLink?: string;
  liturgi?: string[];
  petugas?: {
    worship_leader: string;
    music_team: string;
    multimedia: string;
    usher: string;
  };
  activities?: string[];
  leader?: string;
  rundown?: string[];
  fokus_doa?: string[];
  tema_bulanan?: string[];
  materi?: string[];
  repertoar?: string[];
}

interface ServicesData {
  upcomingServices: Service[];
  weeklyServices: Service[];
}

// Mock data untuk development
const mockServices: ServicesData = {
  upcomingServices: [
    {
      id: 1,
      title: "Ibadah Minggu Pagi",
      date: "11 Februari 2025",
      time: "07:00 WIB",
      preacher: "Pdt. Samuel Widjaja",
      theme: "Hidup dalam Kasih Kristus",
      location: "Gedung Gereja Utama",
      description: "Ibadah minggu dengan tema khusus tentang kasih Kristus dalam kehidupan sehari-hari. Akan ada perjamuan kudus setelah ibadah.",
      streamLink: "https://youtube.com/live/gkj-church",
      liturgi: [
        "Votum dan Salam",
        "Nyanyian Pembuka: KJ 21 - Hari Minggu, Hari yang Mulia",
        "Pengakuan Dosa dan Pengampunan",
        "Nyanyian Syukur: KJ 246 - Yesusku, Kau yang Terindah",
        "Pemberitaan Firman",
        "Doa Syafaat",
        "Persembahan",
        "Perjamuan Kudus",
        "Pengutusan dan Berkat"
      ],
      petugas: {
        worship_leader: "Pnt. Andreas Wijaya",
        music_team: "Tim Musik 1",
        multimedia: "Tim Multimedia A",
        usher: "Tim Penyambut 2"
      }
    },
    {
      id: 2,
      title: "Ibadah Pemuda",
      date: "10 Februari 2025",
      time: "17:00 WIB",
      preacher: "Pdt. Maria Kristiani",
      theme: "Pemuda dan Tantangan Zaman Now",
      location: "Ruang Pemuda Lt. 2",
      description: "Ibadah khusus untuk pemuda dengan pujian kontemporer dan sharing session setelah ibadah. Dilanjutkan dengan fellowship dan games.",
      streamLink: "https://youtube.com/live/gkj-youth",
      liturgi: [
        "Praise and Worship",
        "Doa Pembukaan",
        "Ice Breaking",
        "Pujian",
        "Firman Tuhan",
        "Response Song",
        "Sharing Session",
        "Doa Penutup",
        "Fellowship"
      ],
      petugas: {
        worship_leader: "Sdri. Jessica",
        music_team: "Youth Worship Team",
        multimedia: "Tim Multimedia Pemuda",
        usher: "Tim Penyambut Pemuda"
      },
      activities: [
        "Games dan Ice Breaking",
        "Sharing Session",
        "Small Group Discussion",
        "Fellowship Dinner"
      ]
    },
    {
      id: 3,
      title: "Ibadah Keluarga",
      date: "9 Februari 2025",
      time: "19:00 WIB",
      preacher: "Pdt. Yohanes Susanto",
      theme: "Membangun Keluarga Kristen yang Kokoh",
      location: "Aula Serbaguna",
      description: "Ibadah khusus keluarga dengan fokus pada pembinaan keluarga Kristen. Ada sesi konseling keluarga setelah ibadah.",
      streamLink: null,
      liturgi: [
        "Praise and Worship",
        "Doa Pembukaan",
        "Family Time",
        "Pujian Keluarga",
        "Firman Tuhan",
        "Doa Syafaat untuk Keluarga",
        "Berkat"
      ],
      petugas: {
        worship_leader: "Kel. Bpk. Santoso",
        music_team: "Tim Musik Keluarga",
        multimedia: "Tim Multimedia B",
        usher: "Tim Penyambut 3"
      },
      activities: [
        "Family Games",
        "Sharing Antar Keluarga",
        "Konseling Keluarga",
        "Family Fellowship"
      ]
    }
  ],
  weeklyServices: [
    {
      id: 1,
      title: "Doa Pagi",
      day: "Senin - Jumat",
      time: "05:30 WIB",
      location: "Ruang Doa",
      description: "Persekutuan doa pagi untuk memulai hari dengan firman Tuhan dan doa syafaat.",
      leader: "Tim Doa Syafaat",
      rundown: [
        "05:30 - Pujian dan Penyembahan",
        "05:45 - Pembacaan Firman",
        "06:00 - Sharing dan Kesaksian",
        "06:15 - Doa Syafaat",
        "06:45 - Doa Penutup"
      ],
      fokus_doa: [
        "Jemaat dan Keluarga",
        "Pelayanan Gereja",
        "Bangsa dan Negara",
        "Misi dan Penginjilan"
      ]
    },
    {
      id: 2,
      title: "Persekutuan Wanita",
      day: "Rabu",
      time: "09:00 WIB",
      location: "Aula Serbaguna",
      description: "Pembinaan khusus wanita dengan sharing, doa, dan pembelajaran Alkitab.",
      leader: "Ibu Maria Kristiani",
      rundown: [
        "09:00 - Pembukaan dan Pujian",
        "09:30 - Sharing Firman",
        "10:30 - Diskusi Kelompok",
        "11:00 - Doa Syafaat",
        "11:30 - Fellowship"
      ],
      tema_bulanan: [
        "Minggu 1: Kehidupan Doa",
        "Minggu 2: Keluarga",
        "Minggu 3: Pelayanan",
        "Minggu 4: Kesaksian"
      ]
    },
    {
      id: 3,
      title: "Kelompok Tumbuh Bersama",
      day: "Kamis",
      time: "19:00 WIB",
      location: "Rumah Jemaat (Bergilir)",
      description: "Persekutuan rumah tangga untuk pertumbuhan iman dan sharing kehidupan.",
      leader: "Tim KTB",
      rundown: [
        "19:00 - Ice Breaking",
        "19:15 - Pujian",
        "19:30 - Pembacaan Firman",
        "20:00 - Diskusi dan Sharing",
        "20:45 - Doa Syafaat",
        "21:00 - Fellowship"
      ],
      materi: [
        "Pemahaman Alkitab",
        "Kehidupan Praktis",
        "Pertumbuhan Iman",
        "Kesaksian Pribadi"
      ]
    },
    {
      id: 4,
      title: "Latihan Paduan Suara",
      day: "Sabtu",
      time: "16:00 WIB",
      location: "Ruang Musik",
      description: "Persiapan pelayanan pujian untuk ibadah Minggu.",
      leader: "Bpk. Andreas Wijaya",
      rundown: [
        "16:00 - Pemanasan Vokal",
        "16:15 - Latihan Lagu Baru",
        "17:00 - Latihan Lagu Minggu",
        "17:45 - Review dan Evaluasi",
        "18:00 - Doa Penutup"
      ],
      repertoar: [
        "Lagu Pembuka: KJ 21",
        "Lagu Pujian: KJ 246",
        "Lagu Persembahan: KJ 288",
        "Lagu Penutup: KJ 426"
      ]
    }
  ]
};

function ServiceCard({ service }: { service: Service }) {
  return (
    <Card className="p-6 hover-card">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold tracking-tight">{service.title}</h3>
        <span className="text-sm text-muted-foreground">{service.date || service.day}</span>
      </div>
      <div className="space-y-4 text-muted-foreground">
        <div className="space-y-2">
          <p className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span className="font-medium text-foreground">Waktu:</span> {service.time}
          </p>
          {service.preacher && (
            <p className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="font-medium text-foreground">Pengkhotbah:</span> {service.preacher}
            </p>
          )}
          {service.theme && (
            <p className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="font-medium text-foreground">Tema:</span> {service.theme}
            </p>
          )}
          <p className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span className="font-medium text-foreground">Lokasi:</span> {service.location}
          </p>
        </div>
        
        <div className="mt-4">
          <p className="text-sm mb-2">{service.description}</p>
          
          <div className="mt-4 space-y-4">
            {service.liturgi && (
              <div>
                <h4 className="font-semibold text-foreground mb-2">Liturgi:</h4>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {service.liturgi.slice(0, 3).map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                  {service.liturgi.length > 3 && (
                    <li className="text-primary cursor-pointer">
                      {service.liturgi.length - 3} item lainnya...
                    </li>
                  )}
                </ul>
              </div>
            )}

            {service.petugas && (
              <div>
                <h4 className="font-semibold text-foreground mb-2">Petugas:</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p>WL: {service.petugas.worship_leader}</p>
                  <p>Musik: {service.petugas.music_team}</p>
                </div>
              </div>
            )}

            {service.activities && (
              <div>
                <h4 className="font-semibold text-foreground mb-2">Kegiatan:</h4>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {service.activities.slice(0, 2).map((activity, idx) => (
                    <li key={idx}>{activity}</li>
                  ))}
                  {service.activities.length > 2 && (
                    <li className="text-primary cursor-pointer">
                      {service.activities.length - 2} kegiatan lainnya...
                    </li>
                  )}
                </ul>
              </div>
            )}

            {service.rundown && (
              <div>
                <h4 className="font-semibold text-foreground mb-2">Rundown:</h4>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {service.rundown.slice(0, 3).map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                  {service.rundown.length > 3 && (
                    <li className="text-primary cursor-pointer">
                      {service.rundown.length - 3} item lainnya...
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>

        {service.streamLink && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => window.open(service.streamLink, '_blank')}
            className="mt-4 w-full"
          >
            Tonton Streaming
          </Button>
        )}
      </div>
    </Card>
  );
}

function LoadingState() {
  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <header className="text-center mb-16">
        <Calendar className="mx-auto mb-6 text-primary" size={64} />
        <h1 className="text-4xl font-bold mb-4">Jadwal Ibadah & Kegiatan</h1>
        <div className="animate-pulse">
          <div className="h-4 bg-muted rounded w-3/4 mx-auto mb-4"></div>
          <div className="h-4 bg-muted rounded w-1/2 mx-auto"></div>
        </div>
      </header>
      <div className="space-y-16">
        {[...Array(4)].map((_, i) => (
          <section key={i} className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/3 mx-auto mb-8"></div>
            <div className="grid md:grid-cols-2 gap-6">
              {[...Array(2)].map((_, j) => (
                <div key={j} className="bg-card border rounded-lg p-6">
                  <div className="h-6 bg-muted rounded w-3/4 mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded w-full"></div>
                    <div className="h-4 bg-muted rounded w-5/6"></div>
                    <div className="h-4 bg-muted rounded w-4/6"></div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function ErrorState({ error, retry }: { error: Error; retry: () => void }) {
  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <header className="text-center mb-16">
        <Calendar className="mx-auto mb-6 text-destructive" size={64} />
        <h1 className="text-4xl font-bold mb-4">Terjadi Kesalahan</h1>
        <p className="text-xl text-destructive max-w-3xl mx-auto">
          {error.message}
        </p>
        <Button 
          variant="destructive" 
          onClick={retry}
          className="mt-8"
        >
          Coba Lagi
        </Button>
      </header>
    </div>
  );
}

function ServicesPageContent() {
  const servicesQuery = useServicesData();
  const announcementsQuery = useAnnouncementsData();

  if (servicesQuery.isLoading || announcementsQuery.isLoading) {
    return <LoadingState />;
  }

  if (servicesQuery.error || announcementsQuery.error) {
    return (
      <ErrorState 
        error={servicesQuery.error || announcementsQuery.error} 
        retry={() => {
          servicesQuery.retry();
          announcementsQuery.retry();
        }}
      />
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <header className="text-center mb-16">
        <Calendar className="mx-auto mb-6 text-primary" size={64} />
        <h1 className="text-4xl font-bold mb-4">Jadwal Ibadah & Kegiatan</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Temukan jadwal ibadah, kegiatan, dan informasi terkini tentang pelayanan di Gereja Kristen Jawa.
        </p>
      </header>

      {/* Upcoming Services */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-8 text-center">Ibadah Mendatang</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {(servicesQuery.data?.upcomingServices || mockServices.upcomingServices).map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
      </section>

      {/* Weekly Services */}
      <section className="bg-secondary/10 rounded-lg p-12 mb-16">
        <h2 className="text-3xl font-semibold mb-8 text-center">Jadwal Mingguan</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {(servicesQuery.data?.weeklyServices || mockServices.weeklyServices).map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <AnimatedPage>
      <ServicesPageContent />
    </AnimatedPage>
  );
}
