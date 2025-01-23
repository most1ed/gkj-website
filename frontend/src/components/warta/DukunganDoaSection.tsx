import { Card, CardContent } from "@/components/ui/Card";
import { DukunganDoaData } from "@/types/warta";
import { Heart } from "lucide-react";

interface DukunganDoaSectionProps {
  data: DukunganDoaData[];
}

export function DukunganDoaSection({ data }: DukunganDoaSectionProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-2">
        <Heart className="h-5 w-5 text-primary" />
        <h2 className="text-2xl font-bold">Dukungan Doa</h2>
      </div>

      {/* Main Card */}
      <Card>
        <CardContent className="p-6">
          <div className="grid gap-4 md:grid-cols-2">
            {data.map((item, index) => (
              <Card key={index} className="bg-muted">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{item.nama}</h3>
                      <p className="text-sm mt-1">{item.kondisi}</p>
                    </div>
                    {item.wilayah && (
                      <span className="text-sm text-muted-foreground">
                        Wilayah {item.wilayah}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
