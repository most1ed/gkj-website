import { Card, CardContent } from "@/components/ui/Card";
import { PersembahanData } from "@/types/warta";
import { PiggyBank } from "lucide-react";

export function PersembahanSection({ data }: { data: PersembahanData }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <PiggyBank className="h-5 w-5 text-primary" />
        <h2 className="text-2xl font-bold">Persembahan</h2>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Total Persembahan</span>
              <span className="font-semibold">{data.totalPersembahan}</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {data.rincian.map((item, index) => (
                <div 
                  key={index} 
                  className="bg-background/50 p-3 rounded-lg border"
                >
                  <div className="text-sm text-muted-foreground mb-1">
                    {item.jenis}
                  </div>
                  <div className="font-medium">{item.jumlah}</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
