import { HeroSection } from '@/components/home/HeroSection';
import { QuickInfo } from '@/components/home/QuickInfo';
import { EventsHighlight } from '@/components/home/EventsHighlight';
import { ServicesOverview } from '@/components/home/ServicesOverview';
import { GallerySection } from '@/components/home/GallerySection';
import { ArticlesSection } from '@/components/home/ArticlesSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection />

      {/* Quick Info (Jadwal Ibadah) */}
      <QuickInfo />

      {/* Highlight Events & Live Stream */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <EventsHighlight />
        </div>
      </section>

      {/* Services Overview */}
      <ServicesOverview />

      {/* Gallery Section */}
      <GallerySection />

      {/* Articles Section */}
      <ArticlesSection />
    </div>
  );
}
