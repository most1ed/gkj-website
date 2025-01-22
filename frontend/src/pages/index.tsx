import { HeroSection } from "@/components/home/HeroSection";
import { QuickInfo } from "@/components/home/QuickInfo";
import { UpcomingEvents } from "@/components/home/UpcomingEvents";
import { ImportantAnnouncements } from "@/components/home/ImportantAnnouncements";
import { WeeklyService } from "@/components/home/WeeklyService";
import { OfferingInfo } from "@/components/home/OfferingInfo";
import { PrayerSupport } from "@/components/home/PrayerSupport";

export default function Home() {
  return (
    <main>
      {/* Hero Section with Church Info */}
      <HeroSection />

      {/* Quick Info Cards */}
      <QuickInfo />

      {/* Main Content Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Upcoming Events - Communion, Meetings, etc */}
          <div className="lg:col-span-2">
            <UpcomingEvents />
          </div>

          {/* Important Announcements */}
          <div className="space-y-8">
            <ImportantAnnouncements />
            <PrayerSupport />
          </div>

          {/* Weekly Service Info */}
          <div>
            <WeeklyService />
          </div>

          {/* Offering Information */}
          <div>
            <OfferingInfo />
          </div>

          {/* Prayer Support Section */}
          <div>
            <PrayerSupport />
          </div>
        </div>
      </div>
    </main>
  );
}
