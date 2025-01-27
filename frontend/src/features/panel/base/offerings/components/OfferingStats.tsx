import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { TrendingUp, TrendingDown, CreditCard, Receipt } from "lucide-react";

interface OfferingStats {
  totalAmount: number;
  monthlyAmount: number;
  monthlyChange: number;
  lastOffering: {
    date: Date;
    amount: number;
  };
  monthlyTarget: number;
  categories: {
    name: string;
    amount: number;
    percentage: number;
  }[];
}

export function OfferingStats() {
  const [period, setPeriod] = useState("2024");
  const [stats, setStats] = useState<OfferingStats>({
    totalAmount: 5000000,
    monthlyAmount: 1000000,
    monthlyChange: 15,
    lastOffering: {
      date: new Date(),
      amount: 100000,
    },
    monthlyTarget: 1500000,
    categories: [
      {
        name: "Persembahan Minggu",
        amount: 500000,
        percentage: 50,
      },
      {
        name: "Persembahan Khusus",
        amount: 300000,
        percentage: 30,
      },
      {
        name: "Perpuluhan",
        amount: 200000,
        percentage: 20,
      },
    ],
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Statistik Persembahan</h3>
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
              Total Persembahan
            </CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(stats.totalAmount)}
            </div>
            <p className="text-xs text-muted-foreground">
              Tahun {period}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Persembahan Bulan Ini
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(stats.monthlyAmount)}
            </div>
            <div className="flex items-center gap-2">
              {stats.monthlyChange > 0 ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
              <p className={`text-xs ${
                stats.monthlyChange > 0 ? "text-green-500" : "text-red-500"
              }`}>
                {stats.monthlyChange}% dari bulan lalu
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Target Bulanan
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M2 12h20" />
            </svg>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-2xl font-bold">
              {formatCurrency(stats.monthlyTarget)}
            </div>
            <Progress
              value={(stats.monthlyAmount / stats.monthlyTarget) * 100}
              className="h-2"
            />
            <p className="text-xs text-muted-foreground">
              {Math.round((stats.monthlyAmount / stats.monthlyTarget) * 100)}%
              tercapai
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Persembahan Terakhir
            </CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(stats.lastOffering.amount)}
            </div>
            <p className="text-xs text-muted-foreground">
              {format(stats.lastOffering.date, "dd MMMM yyyy", { locale: id })}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Kategori Persembahan</CardTitle>
          <CardDescription>
            Distribusi persembahan berdasarkan kategori
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats.categories.map((category) => (
              <div key={category.name} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>{category.name}</span>
                  <span className="font-mono">
                    {formatCurrency(category.amount)}
                  </span>
                </div>
                <Progress value={category.percentage} className="h-2" />
                <p className="text-xs text-muted-foreground text-right">
                  {category.percentage}%
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
