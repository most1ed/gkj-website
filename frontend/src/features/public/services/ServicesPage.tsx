import React from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { AnimatedWrapper, AnimatedPage } from '@/components/ui/AnimatedWrapper';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { Skeleton, SkeletonList } from '@/components/ui/Skeleton';
import { 
  useServicesData, 
  useAnnouncementsData 
} from '@/hooks';
import { mockApi } from '@/lib/mock';

function ServicesPageContent() {
  const servicesQuery = useServicesData();
  const announcementsQuery = useAnnouncementsData();
  const devotionals = mockApi.home.generateNews(2);

  if (servicesQuery.isLoading || announcementsQuery.isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <SkeletonList count={3} />
      </div>
    );
  }

  if (servicesQuery.error || announcementsQuery.error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="bg-red-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Gagal Memuat Data
          </h2>
          <p className="text-red-500 mb-6">
            {servicesQuery.error?.message || announcementsQuery.error?.message}
          </p>
          <div className="flex justify-center space-x-4">
            <Button 
              variant="destructive" 
              onClick={() => {
                servicesQuery.retry();
                announcementsQuery.retry();
              }}
            >
              Coba Lagi
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Upcoming Services */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Ibadah Mendatang</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {servicesQuery.data?.upcomingServices.map((service, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <span className="text-muted-foreground">{service.date}</span>
              </div>
              <div className="space-y-2">
                <p><strong>Waktu:</strong> {service.time}</p>
                <p><strong>Pengkhotbah:</strong> {service.preacher}</p>
                <p><strong>Tema:</strong> {service.theme}</p>
                <p><strong>Lokasi:</strong> {service.location}</p>
                {service.streamLink && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => window.open(service.streamLink, '_blank')}
                  >
                    Streaming
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Weekly Services */}
      <section className="container mx-auto px-4 py-12 bg-muted/20">
        <h2 className="text-3xl font-bold text-center mb-8">Jadwal Mingguan</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {servicesQuery.data?.weeklyServices.map((service, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <span className="text-muted-foreground">{service.day}</span>
              </div>
              <div className="space-y-2">
                <p><strong>Waktu:</strong> {service.time}</p>
                <p><strong>Lokasi:</strong> {service.location}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Announcements */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Pengumuman</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {announcementsQuery.data?.map((announcement, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">{announcement.title}</h3>
                <span className="text-muted-foreground">{announcement.date}</span>
              </div>
              <p>{announcement.content}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Devotionals */}
      <section className="container mx-auto px-4 py-12 bg-muted/20">
        <h2 className="text-3xl font-bold text-center mb-8">Renungan</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {devotionals.map((devotional, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">{devotional.title}</h3>
                <span className="text-muted-foreground">{devotional.date}</span>
              </div>
              <div className="space-y-2">
                <p><strong>Ayat:</strong> {devotional.excerpt}</p>
                <p>{devotional.content.slice(0, 150)}...</p>
                <p className="text-right text-muted-foreground">
                  - {devotional.author}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}

export default function ServicesPage() {
  return (
    <ErrorBoundary>
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
                <h1 className="text-4xl font-bold mb-4 text-primary">
                  Jadwal Ibadah & Pelayanan
                </h1>
                <p className="text-lg text-muted-foreground">
                  Temukan informasi terkini seputar kegiatan dan pelayanan gereja kami
                </p>
              </AnimatedWrapper>
            </div>
          </div>
        </AnimatedWrapper>

        <ServicesPageContent />
      </AnimatedPage>
    </ErrorBoundary>
  );
}
