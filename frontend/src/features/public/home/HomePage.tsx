import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { LatestNews } from "./components/LatestNews";
import { UpcomingEvents } from "@/features/panel/base/events/components/UpcomingEvents";
import { ArticlesSection } from "./components/ArticlesSection";
import { GallerySection } from "./components/GallerySection";
import { OfferingInfo } from "./components/OfferingInfo";
import { PrayerSupport } from "./components/PrayerSupport";
import { WeeklyService } from "./components/WeeklyService";
import { useHomeData } from "./hooks/useHomeData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Card } from "@/components/ui/Card";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const ScrollAnimatedSection = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, 0]);

  return (
    <motion.div 
      ref={ref}
      style={{ 
        opacity, 
        scale, 
        y 
      }}
      className="will-change-transform relative"
    >
      <div className="relative">
        {children}
      </div>
    </motion.div>
  );
};

export function HomePage() {
  const { data, isLoading } = useHomeData();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-16 py-8"
    >
      <ScrollAnimatedSection>
        <div className="container mx-auto px-4">
          <Hero />
        </div>
      </ScrollAnimatedSection>
      
      <ScrollAnimatedSection>
        <div className="container mx-auto px-4">
          <Features />
        </div>
      </ScrollAnimatedSection>
      
      <ScrollAnimatedSection>
        <div className="container mx-auto px-4">
          {/* Temporarily hidden: Latest News Section */}
          {/* <LatestNews news={data?.news} /> */}
        </div>
      </ScrollAnimatedSection>
      
      <ScrollAnimatedSection>
        <div className="container mx-auto px-4">
          <ArticlesSection />
        </div>
      </ScrollAnimatedSection>
      
      <ScrollAnimatedSection>
        <div className="container mx-auto px-4">
          <Card>
            <Tabs defaultValue="agenda" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="agenda">Agenda</TabsTrigger>
                <TabsTrigger value="doa">Dukungan Doa</TabsTrigger>
                <TabsTrigger value="ibadah">Ibadah Minggu Ini</TabsTrigger>
                <TabsTrigger value="persembahan">Informasi Persembahan</TabsTrigger>
              </TabsList>
              
              <TabsContent value="agenda" className="p-6">
                <UpcomingEvents events={data?.events} />
              </TabsContent>
              
              <TabsContent value="doa" className="p-6">
                <PrayerSupport />
              </TabsContent>
              
              <TabsContent value="ibadah" className="p-6">
                <WeeklyService />
              </TabsContent>
              
              <TabsContent value="persembahan" className="p-6">
                <OfferingInfo />
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </ScrollAnimatedSection>
      
      <ScrollAnimatedSection>
        <div className="container mx-auto px-4">
          <GallerySection />
        </div>
      </ScrollAnimatedSection>
    </motion.div>
  );
}
