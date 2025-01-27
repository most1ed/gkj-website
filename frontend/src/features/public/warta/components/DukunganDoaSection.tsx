import { Card, CardContent } from "@/components/ui/Card";
import { DukunganDoaData } from "@/types/warta";
import { Heart } from "lucide-react";

export function DukunganDoaSection({ data }: { data: DukunganDoaData }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Heart className="h-5 w-5 text-primary" />
        <h2 className="text-2xl font-bold">Dukungan Doa</h2>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {data.items.map((item, index) => (
              <div 
                key={index} 
                className="border-b pb-4 last:border-b-0 last:pb-0"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">{item.nama}</h3>
                  <span className="text-sm text-muted-foreground">
                    {item.kategori}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {item.deskripsi}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
