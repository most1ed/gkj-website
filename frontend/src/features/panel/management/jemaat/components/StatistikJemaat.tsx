import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Users, UserPlus, UserMinus, Map } from "lucide-react";

interface JemaatStats {
  totalJemaat: number;
  totalKK: number;
  totalWilayah: number;
  newMembers: number;
  demographics: {
    gender: {
      male: number;
      female: number;
    };
    age: {
      children: number;
      youth: number;
      adult: number;
      elderly: number;
    };
    status: {
      active: number;
      inactive: number;
      moved: number;
    };
  };
}

export function StatistikJemaat() {
  const [period, setPeriod] = useState("2024");
  const [stats, setStats] = useState<JemaatStats>({
    totalJemaat: 500,
    totalKK: 150,
    totalWilayah: 5,
    newMembers: 25,
    demographics: {
      gender: {
        male: 240,
        female: 260,
      },
      age: {
        children: 100,
        youth: 150,
        adult: 200,
        elderly: 50,
      },
      status: {
        active: 450,
        inactive: 30,
        moved: 20,
      },
    },
  });

  const calculatePercentage = (value: number, total: number) => {
    return Math.round((value / total) * 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Statistik Jemaat</h3>
        <Select
          value={period}
          onValueChange={setPeriod}
        >
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2024">2024</SelectItem>
            <SelectItem value="2023">2023</SelectItem>
            <SelectItem value="2022">2022</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Jemaat
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.totalJemaat}
              <span className="text-sm font-normal text-muted-foreground ml-2">
                orang
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total KK
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.totalKK}
              <span className="text-sm font-normal text-muted-foreground ml-2">
                KK
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Jemaat Baru
            </CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.newMembers}
              <span className="text-sm font-normal text-muted-foreground ml-2">
                tahun ini
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Wilayah Pelayanan
            </CardTitle>
            <Map className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.totalWilayah}
              <span className="text-sm font-normal text-muted-foreground ml-2">
                wilayah
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Jenis Kelamin</CardTitle>
            <CardDescription>
              Distribusi jemaat berdasarkan jenis kelamin
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Laki-laki</span>
                <span>{calculatePercentage(stats.demographics.gender.male, stats.totalJemaat)}%</span>
              </div>
              <Progress value={calculatePercentage(stats.demographics.gender.male, stats.totalJemaat)} />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Perempuan</span>
                <span>{calculatePercentage(stats.demographics.gender.female, stats.totalJemaat)}%</span>
              </div>
              <Progress value={calculatePercentage(stats.demographics.gender.female, stats.totalJemaat)} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Usia</CardTitle>
            <CardDescription>
              Distribusi jemaat berdasarkan kelompok usia
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Anak-anak (0-12)</span>
                <span>{calculatePercentage(stats.demographics.age.children, stats.totalJemaat)}%</span>
              </div>
              <Progress value={calculatePercentage(stats.demographics.age.children, stats.totalJemaat)} />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Pemuda (13-25)</span>
                <span>{calculatePercentage(stats.demographics.age.youth, stats.totalJemaat)}%</span>
              </div>
              <Progress value={calculatePercentage(stats.demographics.age.youth, stats.totalJemaat)} />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Dewasa (26-60)</span>
                <span>{calculatePercentage(stats.demographics.age.adult, stats.totalJemaat)}%</span>
              </div>
              <Progress value={calculatePercentage(stats.demographics.age.adult, stats.totalJemaat)} />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Lansia (&gt;60)</span>
                <span>{calculatePercentage(stats.demographics.age.elderly, stats.totalJemaat)}%</span>
              </div>
              <Progress value={calculatePercentage(stats.demographics.age.elderly, stats.totalJemaat)} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
