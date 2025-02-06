import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JadwalIbadah } from "./components/JadwalIbadah";
import { LiturgiManager } from "./components/LiturgiManager";
import { PelayananIbadah } from "./components/PelayananIbadah";
import { WartaJemaat } from "./components/WartaJemaat";
import { IbadahStatistics } from "./components/IbadahStatistics";
import { Button } from "@/components/ui/button";
import { Plus, Calendar, BarChart } from "lucide-react";
import { useIbadahData } from "./hooks/useIbadahData";
import { IbadahModal } from "./components/IbadahModal";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter 
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

export default function IbadahPage() {
  const { data, isLoading } = useIbadahData();
  const [isIbadahModalOpen, setIsIbadahModalOpen] = useState(false);
  const [isCalendarDialogOpen, setIsCalendarDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const handleOpenCalendar = () => {
    setIsCalendarDialogOpen(true);
  };

  const handleAddIbadah = () => {
    setIsIbadahModalOpen(true);
  };

  const handleCalendarSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    
    // Filter or highlight events for the selected date
    const eventsOnDate = data?.jadwal.filter(event => 
      new Date(event.date).toDateString() === date?.toDateString()
    );

    if (eventsOnDate && eventsOnDate.length > 0) {
      toast({
        title: "Jadwal Ibadah",
        description: `Ada ${eventsOnDate.length} ibadah pada tanggal ini.`
      });
    } else {
      toast({
        title: "Tidak Ada Jadwal",
        description: "Tidak ada ibadah yang dijadwalkan pada tanggal ini."
      });
    }
  };

  return (
    <div className="space-y-6 p-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Manajemen Ibadah</h2>
          <p className="text-muted-foreground">
            Kelola jadwal, liturgi, dan pelayanan ibadah
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={handleOpenCalendar}
          >
            <Calendar className="mr-2 h-4 w-4" />
            Lihat Kalender
          </Button>
          <Button onClick={handleAddIbadah}>
            <Plus className="mr-2 h-4 w-4" />
            Tambah Ibadah
          </Button>
        </div>
      </div>

      <Tabs defaultValue="statistik" className="space-y-4">
        <TabsList>
          <TabsTrigger value="statistik">
            <BarChart className="mr-2 h-4 w-4" />
            Statistik
          </TabsTrigger>
          <TabsTrigger value="jadwal">Jadwal Ibadah</TabsTrigger>
          <TabsTrigger value="liturgi">Liturgi</TabsTrigger>
          <TabsTrigger value="pelayanan">Pelayanan</TabsTrigger>
          <TabsTrigger value="warta">Warta Jemaat</TabsTrigger>
        </TabsList>
        
        <TabsContent value="statistik" className="space-y-4">
          <IbadahStatistics data={data} />
        </TabsContent>
        
        <TabsContent value="jadwal" className="space-y-4">
          <JadwalIbadah data={data?.jadwal} />
        </TabsContent>
        
        <TabsContent value="liturgi" className="space-y-4">
          <LiturgiManager data={data?.liturgi} />
        </TabsContent>
        
        <TabsContent value="pelayanan" className="space-y-4">
          <PelayananIbadah data={data?.pelayanan} />
        </TabsContent>
        
        <TabsContent value="warta" className="space-y-4">
          <WartaJemaat data={data?.warta} />
        </TabsContent>
      </Tabs>

      <IbadahModal 
        isOpen={isIbadahModalOpen}
        onClose={() => setIsIbadahModalOpen(false)}
        mode="add"
      />

      <Dialog 
        open={isCalendarDialogOpen} 
        onOpenChange={setIsCalendarDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Kalender Ibadah</DialogTitle>
            <DialogDescription>
              Lihat dan kelola jadwal ibadah
            </DialogDescription>
          </DialogHeader>
          
          <CalendarComponent
            mode="single"
            selected={selectedDate}
            onSelect={handleCalendarSelect}
          />

          <DialogFooter>
            <Button onClick={() => setIsCalendarDialogOpen(false)}>
              Tutup
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
