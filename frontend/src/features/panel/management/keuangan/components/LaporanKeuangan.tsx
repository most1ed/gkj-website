import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Download, FileDown, TrendingDown, TrendingUp } from "lucide-react";

interface Transaction {
  id: string;
  date: Date;
  description: string;
  type: "income" | "expense";
  category: string;
  amount: number;
  note?: string;
}

interface FinancialReport {
  period: string;
  summary: {
    totalIncome: number;
    totalExpense: number;
    balance: number;
    previousBalance: number;
  };
  incomeByCategory: {
    category: string;
    amount: number;
    percentage: number;
  }[];
  expenseByCategory: {
    category: string;
    amount: number;
    percentage: number;
  }[];
  transactions: Transaction[];
}

export function LaporanKeuangan() {
  const [period, setPeriod] = useState("2024-01");
  const [report, setReport] = useState<FinancialReport>({
    period: "Januari 2024",
    summary: {
      totalIncome: 50000000,
      totalExpense: 35000000,
      balance: 15000000,
      previousBalance: 12000000,
    },
    incomeByCategory: [
      {
        category: "Persembahan Minggu",
        amount: 30000000,
        percentage: 60,
      },
      {
        category: "Persembahan Khusus",
        amount: 15000000,
        percentage: 30,
      },
      {
        category: "Lain-lain",
        amount: 5000000,
        percentage: 10,
      },
    ],
    expenseByCategory: [
      {
        category: "Operasional",
        amount: 20000000,
        percentage: 57,
      },
      {
        category: "Diakonia",
        amount: 10000000,
        percentage: 29,
      },
      {
        category: "Lain-lain",
        amount: 5000000,
        percentage: 14,
      },
    ],
    transactions: [
      {
        id: "1",
        date: new Date("2024-01-07"),
        description: "Persembahan Minggu 1",
        type: "income",
        category: "Persembahan Minggu",
        amount: 7500000,
      },
      {
        id: "2",
        date: new Date("2024-01-10"),
        description: "Pembayaran Listrik",
        type: "expense",
        category: "Operasional",
        amount: 2500000,
      },
    ],
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Laporan Keuangan</h3>
          <p className="text-sm text-muted-foreground">
            Ringkasan dan detail keuangan gereja
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Select
            value={period}
            onValueChange={setPeriod}
          >
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024-01">Januari 2024</SelectItem>
              <SelectItem value="2023-12">Desember 2023</SelectItem>
              <SelectItem value="2023-11">November 2023</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <FileDown className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Pemasukan
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(report.summary.totalIncome)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Pengeluaran
            </CardTitle>
            <TrendingDown className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(report.summary.totalExpense)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Saldo Bulan Ini
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(report.summary.balance)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              vs bulan lalu {formatCurrency(report.summary.previousBalance)}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Pemasukan per Kategori</CardTitle>
            <CardDescription>
              Distribusi pemasukan berdasarkan kategori
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Kategori</TableHead>
                  <TableHead className="text-right">Jumlah</TableHead>
                  <TableHead className="text-right">%</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {report.incomeByCategory.map((item) => (
                  <TableRow key={item.category}>
                    <TableCell>{item.category}</TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(item.amount)}
                    </TableCell>
                    <TableCell className="text-right">
                      {item.percentage}%
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pengeluaran per Kategori</CardTitle>
            <CardDescription>
              Distribusi pengeluaran berdasarkan kategori
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Kategori</TableHead>
                  <TableHead className="text-right">Jumlah</TableHead>
                  <TableHead className="text-right">%</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {report.expenseByCategory.map((item) => (
                  <TableRow key={item.category}>
                    <TableCell>{item.category}</TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(item.amount)}
                    </TableCell>
                    <TableCell className="text-right">
                      {item.percentage}%
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Riwayat Transaksi</CardTitle>
          <CardDescription>
            Daftar transaksi pemasukan dan pengeluaran
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tanggal</TableHead>
                <TableHead>Deskripsi</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead className="text-right">Pemasukan</TableHead>
                <TableHead className="text-right">Pengeluaran</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {report.transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    {format(transaction.date, "dd MMM yyyy", { locale: id })}
                  </TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>{transaction.category}</TableCell>
                  <TableCell className="text-right">
                    {transaction.type === "income"
                      ? formatCurrency(transaction.amount)
                      : "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    {transaction.type === "expense"
                      ? formatCurrency(transaction.amount)
                      : "-"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
