import { Card, CardContent } from "@/components/ui/Card";
import { IbadahData } from "@/types/warta";
import { Church, Calendar, Clock, User, Book, FileText } from "lucide-react";

interface IbadahSectionProps {
  data: IbadahData;
}

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  content: string | string[];
}

function InfoCard({ icon, title, content }: InfoCardProps) {
  return (
    <div className="flex items-start space-x-4 p-4 rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="mt-1">{icon}</div>
      <div className="flex-1">
        <h3 className="font-medium text-foreground/80 mb-1">{title}</h3>
        {Array.isArray(content) ? (
          <ul className="list-disc list-inside space-y-1">
            {content.map((item, index) => (
              <li key={index} className="text-sm text-muted-foreground">{item}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">{content}</p>
        )}
      </div>
    </div>
  );
}

export function IbadahSection({ data }: IbadahSectionProps) {
  if (!data) return null;
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-2">
        <Church className="h-5 w-5 text-primary" />
        <h2 className="text-2xl font-bold">Ibadah Minggu</h2>
      </div>

      {/* Main Content */}
      <div className="grid gap-4 md:grid-cols-2">
        <InfoCard
          icon={<Calendar className="h-4 w-4 text-primary" />}
          title="Tanggal"
          content={data.tanggal}
        />
        <InfoCard
          icon={<Clock className="h-4 w-4 text-primary" />}
          title="Waktu"
          content={data.waktu}
        />
        <InfoCard
          icon={<User className="h-4 w-4 text-primary" />}
          title="Pengkhotbah"
          content={data.pengkhotbah}
        />
        <InfoCard
          icon={<FileText className="h-4 w-4 text-primary" />}
          title="Tema"
          content={data.tema}
        />
        <InfoCard
          icon={<Book className="h-4 w-4 text-primary" />}
          title="Bacaan"
          content={data.bacaan || []}
        />
      </div>
    </div>
  );
}
