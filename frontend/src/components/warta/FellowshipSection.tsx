import { Card, CardContent } from "@/components/ui/Card";
import { FellowshipData } from "@/types/warta";
import { Heart } from "lucide-react";

interface FellowshipSectionProps {
  data: FellowshipData;
}

export function FellowshipSection({ data }: FellowshipSectionProps) {
  const sortedItems = [...data.items].sort((a, b) => {
    // Sort by jenis first
    const jenisOrder = {
      "Ulang Tahun": 1,
      "Pernikahan": 2,
      "Kelahiran": 3,
      "Baptis": 4,
      "Sidi": 5,
    };
    const jenisCompare = jenisOrder[a.jenis] - jenisOrder[b.jenis];
    if (jenisCompare !== 0) return jenisCompare;
    
    // Then by wilayah
    return parseInt(a.wilayah) - parseInt(b.wilayah);
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Heart className="h-5 w-5 text-primary" />
        <h2 className="text-2xl font-bold">Fellowship</h2>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-2">
            {sortedItems.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-2 border-b last:border-0"
              >
                <div>
                  <p className="font-medium">{item.nama}</p>
                  <p className="text-sm text-muted-foreground">
                    Wilayah {item.wilayah}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">
                    {item.jenis}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
