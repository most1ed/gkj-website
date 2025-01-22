import { VisionMission } from '@/components/about/VisionMission';
import { History } from '@/components/about/History';
import { Leadership } from '@/components/about/Leadership';

export default function About() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
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

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="space-y-24">
          <VisionMission />
          <Leadership />
          <History />
        </div>
      </div>
    </div>
  );
}
