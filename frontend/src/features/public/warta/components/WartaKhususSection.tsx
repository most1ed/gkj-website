import { Card, CardContent } from "@/components/ui/Card";
import { WartaKhususData } from "@/types/warta";
import { Bell } from "lucide-react";

interface WartaKhususSectionProps {
  data: WartaKhususData[];
}

export function WartaKhususSection({ data }: WartaKhususSectionProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-2">
        <Bell className="h-5 w-5 text-primary" />
        <h2 className="text-2xl font-bold">Warta Khusus</h2>
      </div>

      {/* Main Card */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-6">
            {data.map((item, index) => (
              <div key={index} className="space-y-2">
                <h3 className="text-lg font-semibold">{item.judul}</h3>
                <p className="text-sm whitespace-pre-wrap">{item.isi}</p>
                {(item.tanggal || item.tempat) && (
                  <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                    {item.tanggal && <span>Tanggal: {item.tanggal}</span>}
                    {item.tempat && <span>Tempat: {item.tempat}</span>}
                  </div>
                )}
                {index < data.length - 1 && <hr className="my-4" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
