import { RegularSchedule } from '@/features/public/schedule/components/RegularSchedule';
import { UpcomingEvents } from '@/features/public/schedule/components/UpcomingEvents';
import { LiturgicalCalendar } from '@/features/public/schedule/components/LiturgicalCalendar';

export default function Schedule() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <div className="bg-primary/5 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Jadwal Ibadah & Kegiatan
          </h1>
          <p className="text-xl text-center text-muted-foreground max-w-3xl mx-auto">
            Informasi lengkap mengenai jadwal ibadah dan kegiatan di GKJ Grogol Jakarta
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="space-y-24">
          <RegularSchedule />
          <UpcomingEvents />
          <LiturgicalCalendar />
        </div>
      </div>
    </div>
  );
}
