import { VisionMission } from "@/features/public/about/components/VisionMission";
import { History } from "@/features/public/about/components/History";
import { Leadership } from "@/features/public/about/components/Leadership";
import React, { useRef } from 'react';
import { motion, useScroll, useInView } from 'framer-motion';

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

export default function About() {
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
        <div className="bg-primary/5 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
              Tentang GKJ Grogol Jakarta
            </h1>
            <div className="text-center text-muted-foreground space-y-2 max-w-2xl mx-auto">
              <p>
                Kompleks Rasa Sayang, Blok HH No. 1,
                <br />
                Wijaya Kusuma, Grogol, Jakarta Barat 11460
              </p>
              <p>Telepon: (021) 5659044</p>
              <p>Email: gkjgrogol@yahoo.com</p>
              <p>
                <a 
                  href="http://www.gkjgrogoljakarta.org" 
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.gkjgrogoljakarta.org
                </a>
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Main Content */}
      <AnimatedSection>
        <div className="container mx-auto px-4 py-16">
          <div className="space-y-24">
            <VisionMission />
            <Leadership />
            <History />
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
