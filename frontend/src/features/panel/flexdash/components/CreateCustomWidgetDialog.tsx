import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, BarChart, Table, PieChart } from 'lucide-react';

// Types for custom widget configuration
interface WidgetConfig {
  type: 'chart' | 'table' | 'statistic';
  title: string;
  dataSource?: string;
  chartType?: 'bar' | 'line' | 'pie';
}

export function CreateCustomWidgetDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [widgetConfig, setWidgetConfig] = useState<WidgetConfig>({
    type: 'chart',
    title: '',
    dataSource: '',
    chartType: 'bar'
  });

  const handleCreateWidget = () => {
    // Logic to create and add widget to dashboard
    console.log('Creating widget:', widgetConfig);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="mr-2 h-4 w-4" /> Buat Widget Kustom
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Buat Widget Kustom</DialogTitle>
          <DialogDescription>
            Rancang widget dashboard sesuai kebutuhan Anda
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="chart" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="chart">
              <BarChart className="mr-2 h-4 w-4" /> Grafik
            </TabsTrigger>
            <TabsTrigger value="table">
              <Table className="mr-2 h-4 w-4" /> Tabel
            </TabsTrigger>
            <TabsTrigger value="statistic">
              <PieChart className="mr-2 h-4 w-4" /> Statistik
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chart">
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="chartTitle" className="text-right">
                  Judul Grafik
                </Label>
                <Input 
                  id="chartTitle" 
                  value={widgetConfig.title}
                  onChange={(e) => setWidgetConfig({
                    ...widgetConfig, 
                    title: e.target.value
                  })}
                  className="col-span-3" 
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="chartType" className="text-right">
                  Jenis Grafik
                </Label>
                <Select 
                  value={widgetConfig.chartType}
                  onValueChange={(value: 'bar' | 'line' | 'pie') => 
                    setWidgetConfig({
                      ...widgetConfig, 
                      chartType: value
                    })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Pilih Jenis Grafik" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bar">Batang</SelectItem>
                    <SelectItem value="line">Garis</SelectItem>
                    <SelectItem value="pie">Lingkaran</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="dataSource" className="text-right">
                  Sumber Data
                </Label>
                <Input 
                  id="dataSource" 
                  value={widgetConfig.dataSource}
                  onChange={(e) => setWidgetConfig({
                    ...widgetConfig, 
                    dataSource: e.target.value
                  })}
                  className="col-span-3" 
                  placeholder="Masukkan sumber data atau URL API"
                />
              </div>
            </div>
          </TabsContent>

          {/* Similar content for Table and Statistic tabs */}
        </Tabs>

        <DialogFooter>
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => setIsOpen(false)}
          >
            Batal
          </Button>
          <Button 
            type="submit" 
            onClick={handleCreateWidget}
          >
            Buat Widget
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
