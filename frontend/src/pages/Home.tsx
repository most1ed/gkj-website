import React, { useRef } from 'react';
import { motion, useScroll, useInView } from 'framer-motion';
import { HeroSection } from '@/components/home/HeroSection';
import { QuickInfo } from '@/components/home/QuickInfo';
import { EventsHighlight } from '@/components/home/EventsHighlight';
import { ServicesOverview } from '@/components/home/ServicesOverview';
import { GallerySection } from '@/components/home/GallerySection';
import { ArticlesSection } from '@/components/home/ArticlesSection';

// Animated section wrapper
const AnimatedSection: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-20% 0px'
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function Home() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="min-h-screen bg-background">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Hero Section */}
      <AnimatedSection>
        <HeroSection />
      </AnimatedSection>

      {/* Quick Info (Jadwal Ibadah) */}
      <AnimatedSection>
        <QuickInfo />
      </AnimatedSection>

      {/* Highlight Events & Live Stream */}
      <AnimatedSection>
        <section className="py-12 bg-muted/50">
          <div className="container mx-auto px-4">
            <EventsHighlight />
          </div>
        </section>
      </AnimatedSection>

      {/* Services Overview */}
      <AnimatedSection>
        <ServicesOverview />
      </AnimatedSection>

      {/* Gallery Section */}
      <AnimatedSection>
        <GallerySection />
      </AnimatedSection>

      {/* Articles Section */}
      <AnimatedSection>
        <ArticlesSection />
      </AnimatedSection>
    </div>
  );
}
