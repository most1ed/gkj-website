import { useState } from 'react';
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { wartaGereja } from "@/data/dummyData";
import { PDFButton } from "@/components/PDFButton";

// Dummy archive data - replace with actual API call later
const archiveData = Array.from({ length: 12 }, (_, i) => {
  const date = new Date(2025, 0, 22);
  date.setMonth(date.getMonth() - i);
  return {
    id: i + 1,
    date: date,
    data: wartaGereja // Using the same data structure for demo
  };
});

export default function ArchiveWarta() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');

  // Get unique years from archive
  const years = Array.from(
    new Set(archiveData.map(item => format(item.date, 'yyyy')))
  ).sort((a, b) => b.localeCompare(a));

  // Get unique months from archive
  const months = Array.from(
    new Set(archiveData.map(item => format(item.date, 'MM')))
  ).sort((a, b) => b.localeCompare(a));

  const filteredArchive = archiveData.filter(item => {
    const matchesSearch = item.data.sambutan.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMonth = !selectedMonth || format(item.date, 'MM') === selectedMonth;
    const matchesYear = !selectedYear || format(item.date, 'yyyy') === selectedYear;
    return matchesSearch && matchesMonth && matchesYear;
  });

  return (
    <div className="container mx-auto py-6">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold tracking-tight">Arsip Warta Jemaat</h2>
          <Button variant="outline" asChild>
            <Link to="/announcements">Kembali ke Warta</Link>
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Cari warta..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Pilih bulan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Semua bulan</SelectItem>
              {months.map(month => (
                <SelectItem key={month} value={month}>
                  {format(new Date(2025, parseInt(month) - 1, 1), 'MMMM', { locale: id })}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Pilih tahun" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Semua tahun</SelectItem>
              {years.map(year => (
                <SelectItem key={year} value={year}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-4">
          {filteredArchive.map((archive) => (
            <Card key={archive.id} className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold">
                    Warta Jemaat - {format(archive.date, 'EEEE, dd MMMM yyyy', { locale: id })}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {archive.data.sambutan}
                  </p>
                </div>
                <div className="flex gap-2">
                  <PDFButton data={archive.data} />
                  <Button variant="outline" asChild>
                    <Link to={`/announcements/${archive.id}`}>Lihat Detail</Link>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
