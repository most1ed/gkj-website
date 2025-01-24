import { Button } from '@/components/ui/Button';
import { AnimatedWrapper } from '@/components/ui/AnimatedWrapper';

export function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <AnimatedWrapper
        animation="scale"
        duration={1.5}
        className="absolute inset-0 z-0"
      >
        <img
          src="/images/church.jpg"
          alt="GKJ Grogol"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </AnimatedWrapper>

      <div className="relative z-10 text-center text-white px-4">
        <AnimatedWrapper animation="slide" direction="down" delay={0.5}>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            GKJ Grogol Jakarta
          </h1>
        </AnimatedWrapper>

        <AnimatedWrapper animation="slide" direction="up" delay={0.7}>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            "Menjadi Gereja yang hidup dan berbuah dalam kasih Kristus"
          </p>
        </AnimatedWrapper>

        <AnimatedWrapper animation="fade" delay={0.9}>
          <Button
            size="lg"
            variant="outline"
            className="bg-white/10 backdrop-blur-sm hover:bg-white/20"
          >
            Jadwal Ibadah
          </Button>
        </AnimatedWrapper>
      </div>

      <AnimatedWrapper
        animation="slide"
        direction="down"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white"
        once={false}
      >
        <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-white rounded-full animate-bounce" />
        </div>
      </AnimatedWrapper>
    </section>
  );
}
