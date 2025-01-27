import React from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { AnimatedWrapper, AnimatedPage } from '@/components/ui/AnimatedWrapper';
import { Link } from "react-router-dom";

export default function Services() {
  const upcomingServices = [
    {
      date: "Minggu, 28 Januari 2025",
      time: "07:00 WIB",
      title: "Ibadah Minggu",
      preacher: "Pdt. John Doe",
      theme: "Bertumbuh dalam Kasih Kristus",
      liturgist: "Pnt. Jane Smith",
      location: "Gedung Gereja",
      streamLink: "https://youtube.com/live/xyz",
    },
    {
      date: "Minggu, 28 Januari 2025",
      time: "09:00 WIB",
      title: "Ibadah Minggu",
      preacher: "Pdt. John Doe",
      theme: "Bertumbuh dalam Kasih Kristus",
      liturgist: "Pnt. Jane Smith",
      location: "Gedung Gereja",
      streamLink: "https://youtube.com/live/xyz",
    },
  ];

  const weeklyServices = [
    {
      day: "Rabu",
      time: "19:00 WIB",
      title: "Persekutuan Doa",
      location: "Gedung Gereja",
    },
    {
      day: "Jumat",
      time: "19:00 WIB",
      title: "Ibadah Pemuda",
      location: "Ruang Pemuda",
    },
  ];

  const specialServices = [
    {
      date: "24 Desember 2025",
      time: "19:00 WIB",
      title: "Ibadah Malam Natal",
      location: "Gedung Gereja",
    },
    {
      date: "25 Desember 2025",
      time: "09:00 WIB",
      title: "Ibadah Natal",
      location: "Gedung Gereja",
    },
  ];

  const announcements = [
    {
      date: "21 Januari 2025",
      title: "Persiapan HUT GKJ Grogol Jakarta",
      content: "Rapat panitia HUT akan diadakan pada hari Sabtu, 25 Januari 2025 pukul 10:00 WIB.",
    },
    {
      date: "20 Januari 2025",
      title: "Pembaptisan Kudus",
      content: "Pendaftaran Baptis akan dibuka mulai tanggal 1-15 Februari 2025.",
    },
  ];

  const devotionals = [
    {
      date: "22 Januari 2025",
      title: "Mengasihi seperti Kristus",
      verse: "Yohanes 13:34-35",
      content: "Seperti Aku telah mengasihi kamu demikian pula kamu harus saling mengasihi...",
      author: "Pdt. John Doe",
    },
    {
      date: "21 Januari 2025",
      title: "Hidup dalam Pengharapan",
      verse: "Roma 15:13",
      content: "Semoga Allah, sumber pengharapan, memenuhi kamu dengan segala sukacita...",
      author: "Pdt. Jane Smith",
    },
  ];

  return (
    <AnimatedPage>
      {/* Hero Section */}
      <AnimatedWrapper
        animation="scale"
        duration={1.2}
        className="relative py-20 bg-primary/5"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <AnimatedWrapper animation="slide" direction="down" delay={0.3}>
              <h1 className="text-4xl font-bold mb-6">Ibadah GKJ Grogol Jakarta</h1>
            </AnimatedWrapper>
            <AnimatedWrapper animation="slide" direction="up" delay={0.5}>
              <p className="text-xl text-muted-foreground mb-8">
                Mari beribadah dan memuliakan Tuhan bersama-sama dalam persekutuan yang penuh sukacita
              </p>
            </AnimatedWrapper>
            <div className="flex gap-4 justify-center">
              <Button size="lg">Lihat Jadwal Ibadah</Button>
              <Button size="lg" variant="outline">
                Tonton Ibadah Online
              </Button>
            </div>
          </div>
        </div>
      </AnimatedWrapper>

      {/* Upcoming Services */}
      <AnimatedWrapper animation="slide" direction="up" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Ibadah Minggu Ini</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {upcomingServices.map((service, index) => (
              <AnimatedWrapper key={index} animation="fade" delay={0.2 * index}>
                <Card className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                      <p className="text-primary font-medium">{service.date}</p>
                      <p className="text-muted-foreground">{service.time}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Daftar Hadir
                    </Button>
                  </div>
                  <div className="space-y-2 mb-4">
                    <p><span className="font-medium">Tema:</span> {service.theme}</p>
                    <p><span className="font-medium">Pengkhotbah:</span> {service.preacher}</p>
                    <p><span className="font-medium">Liturgos:</span> {service.liturgist}</p>
                    <p><span className="font-medium">Lokasi:</span> {service.location}</p>
                  </div>
                  <Button variant="secondary" className="w-full" asChild>
                    <a href={service.streamLink} target="_blank" rel="noopener noreferrer">
                      Tonton Online
                    </a>
                  </Button>
                </Card>
              </AnimatedWrapper>
            ))}
          </div>
        </div>
      </AnimatedWrapper>

      {/* Weekly Services */}
      <AnimatedWrapper animation="slide" direction="up" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Ibadah Rutin</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {weeklyServices.map((service, index) => (
              <AnimatedWrapper key={index} animation="fade" delay={0.2 * index}>
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-primary font-medium">{service.day}</p>
                  <p className="text-muted-foreground">{service.time}</p>
                  <p className="mt-2">{service.location}</p>
                </Card>
              </AnimatedWrapper>
            ))}
          </div>
        </div>
      </AnimatedWrapper>

      {/* Special Services */}
      <AnimatedWrapper animation="slide" direction="up" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Ibadah Khusus</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {specialServices.map((service, index) => (
              <AnimatedWrapper key={index} animation="fade" delay={0.2 * index}>
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-primary font-medium">{service.date}</p>
                  <p className="text-muted-foreground">{service.time}</p>
                  <p className="mt-2">{service.location}</p>
                </Card>
              </AnimatedWrapper>
            ))}
          </div>
        </div>
      </AnimatedWrapper>

      {/* Announcements */}
      <AnimatedWrapper animation="slide" direction="up" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Warta Jemaat</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {announcements.map((announcement, index) => (
              <AnimatedWrapper key={index} animation="fade" delay={0.2 * index}>
                <Card className="p-6">
                  <p className="text-sm text-muted-foreground mb-2">{announcement.date}</p>
                  <h3 className="text-xl font-semibold mb-2">{announcement.title}</h3>
                  <p>{announcement.content}</p>
                </Card>
              </AnimatedWrapper>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <Link to="/announcements">Lihat Semua Warta</Link>
            </Button>
          </div>
        </div>
      </AnimatedWrapper>

      {/* Devotionals */}
      <AnimatedWrapper animation="slide" direction="up" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Renungan Harian</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {devotionals.map((devotional, index) => (
              <AnimatedWrapper key={index} animation="fade" delay={0.2 * index}>
                <Card className="p-6">
                  <p className="text-sm text-muted-foreground mb-2">{devotional.date}</p>
                  <h3 className="text-xl font-semibold mb-2">{devotional.title}</h3>
                  <p className="text-primary font-medium mb-4">{devotional.verse}</p>
                  <p className="mb-4">{devotional.content}</p>
                  <p className="text-sm text-muted-foreground">Oleh: {devotional.author}</p>
                </Card>
              </AnimatedWrapper>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline">Baca Renungan Lainnya</Button>
          </div>
        </div>
      </AnimatedWrapper>

      {/* Live Stream Section */}
      <AnimatedWrapper animation="slide" direction="up" className="py-16 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ibadah Online</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Tidak dapat hadir secara fisik? Anda dapat mengikuti ibadah secara online melalui channel YouTube kami
          </p>
          <Button size="lg" asChild>
            <a
              href="https://youtube.com/@gkjgrogoljakarta"
              target="_blank"
              rel="noopener noreferrer"
            >
              Tonton di YouTube
            </a>
          </Button>
        </div>
      </AnimatedWrapper>
    </AnimatedPage>
  );
}
