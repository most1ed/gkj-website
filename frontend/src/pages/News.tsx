import { WeeklyAnnouncements } from '@/components/news/WeeklyAnnouncements';
import { BirthdayList } from '@/components/news/BirthdayList';
import { Devotional } from '@/components/news/Devotional';
import { PrayerRequests } from '@/components/news/PrayerRequests';
import { ChurchFinance } from '@/components/news/ChurchFinance';
import { ArchiveDownload } from '@/components/news/ArchiveDownload';

export default function News() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <div className="bg-primary/5 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Warta Jemaat
          </h1>
          <p className="text-xl text-center text-muted-foreground max-w-3xl mx-auto">
            Informasi terkini seputar kegiatan dan kehidupan bergereja GKJ Grogol Jakarta
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-12">
            <WeeklyAnnouncements />
            <ChurchFinance />
            <BirthdayList />
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <Devotional />
            <PrayerRequests />
            <ArchiveDownload />
          </div>
        </div>
      </div>
    </div>
  );
}
