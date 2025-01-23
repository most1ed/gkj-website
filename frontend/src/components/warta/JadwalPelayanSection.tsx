import { Card, CardContent } from "@/components/ui/Card";
import { JadwalPelayanData } from "@/types/warta";
import { CalendarDays, Music, BookOpen, Users, Clock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { cn } from "@/lib/utils";

interface InfoRowProps {
  label: string;
  value?: string;
  className?: string;
}

function InfoRow({ label, value, className }: InfoRowProps) {
  if (!value) return null;
  return (
    <div className={cn("grid grid-cols-2 gap-4 py-2 border-b last:border-0", className)}>
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
      <span className="text-sm">{value}</span>
    </div>
  );
}

interface InfoCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

function InfoCard({ title, icon, children, className }: InfoCardProps) {
  return (
    <Card className={className}>
      <CardContent className="pt-6">
        <h3 className="text-sm font-medium flex items-center gap-2 mb-4">
          {icon}
          {title}
        </h3>
        {children}
      </CardContent>
    </Card>
  );
}

export function JadwalPelayanSection({ data }: { data: JadwalPelayanData[] }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <CalendarDays className="h-5 w-5 text-primary" />
        <h2 className="text-2xl font-bold">Jadwal Pelayan</h2>
      </div>

      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue={data[0]?.tanggal}>
            <TabsList className="w-full">
              {data.map((jadwal) => (
                <TabsTrigger
                  key={jadwal.tanggal}
                  value={jadwal.tanggal}
                  className="flex-1"
                >
                  {jadwal.tanggal}
                </TabsTrigger>
              ))}
            </TabsList>

            {data.map((jadwal) => (
              <TabsContent key={jadwal.tanggal} value={jadwal.tanggal} className="space-y-6">
                {/* Top Row */}
                <div className="grid gap-4 md:grid-cols-3">
                  {/* Waktu Ibadah */}
                  <InfoCard
                    title="Waktu Ibadah"
                    icon={<Clock className="h-4 w-4" />}
                    className="md:col-span-1"
                  >
                    <div className="space-y-1">
                      <InfoRow label="Tanggal" value={jadwal.tanggal} />
                      <InfoRow label="Waktu" value={jadwal.waktu} />
                    </div>
                  </InfoCard>

                  {/* Kalender Gerejawi */}
                  <InfoCard
                    title="Kalender Gerejawi"
                    icon={<BookOpen className="h-4 w-4" />}
                    className="md:col-span-1"
                  >
                    <div className="space-y-1">
                      <InfoRow label="Minggu" value={jadwal.kalenderGerejawi} />
                      <InfoRow label="Warna Liturgis" value={jadwal.warnaLiturgis} />
                      <InfoRow label="Bacaan" value={jadwal.bacaanAlkitab} />
                    </div>
                  </InfoCard>

                  {/* Lagu-lagu */}
                  <InfoCard
                    title="Lagu-lagu Pujian"
                    icon={<Music className="h-4 w-4" />}
                    className="md:col-span-1"
                  >
                    {jadwal.lagu && (
                      <ul className="space-y-1 text-sm">
                        {jadwal.lagu.map((lagu, idx) => (
                          <li key={idx} className="py-1 border-b last:border-0">
                            {lagu}
                          </li>
                        ))}
                      </ul>
                    )}
                  </InfoCard>
                </div>

                {/* Pelayan Groups */}
                <div className="grid gap-4 md:grid-cols-3">
                  {/* Pelayan Utama */}
                  <InfoCard
                    title="Pelayan Utama"
                    icon={<Users className="h-4 w-4" />}
                    className="md:col-span-1"
                  >
                    <div className="space-y-1">
                      <InfoRow label="Koordinator" value={jadwal.koordinator} />
                      <InfoRow label="Pelayan Firman" value={jadwal.pelayanFirman} />
                      <InfoRow label="Pendamping" value={jadwal.pendamping} />
                      <InfoRow label="Liturgos" value={jadwal.liturgos} />
                    </div>
                  </InfoCard>

                  {/* Tim Musik */}
                  <InfoCard
                    title="Tim Musik & Multimedia"
                    icon={<Music className="h-4 w-4" />}
                    className="md:col-span-1"
                  >
                    <div className="space-y-1">
                      <InfoRow label="Pemusik" value={jadwal.pemusik} />
                      <InfoRow label="Pengisi Pujian" value={jadwal.pengisiPujian} />
                      <InfoRow label="Multimedia" value={jadwal.multimedia} />
                    </div>
                  </InfoCard>

                  {/* Tim Pendukung */}
                  <InfoCard
                    title="Tim Pendukung"
                    icon={<Users className="h-4 w-4" />}
                    className="md:col-span-1"
                  >
                    <div className="space-y-1">
                      <InfoRow label="Penyambut Jemaat" value={jadwal.penyambutJemaat} />
                      <InfoRow label="Pewarta" value={jadwal.pewarta} />
                      <InfoRow label="Majelis Piket" value={jadwal.majelisPiket} />
                    </div>
                  </InfoCard>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
