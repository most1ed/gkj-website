import { useState } from "react";
import { motion } from "framer-motion";
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
    <motion.div 
      className="space-y-6 animate-fade-in-up"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="heading-secondary">Laporan Keuangan</h3>
          <p className="text-muted-dark text-sm">
            Ringkasan dan detail keuangan gereja
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Select
            value={period}
            onValueChange={setPeriod}
          >
            <SelectTrigger className="w-40 input-primary bg-muted dark:bg-muted-dark">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-section">
              <SelectItem value="2024-01">Januari 2024</SelectItem>
              <SelectItem value="2023-12">Desember 2023</SelectItem>
              <SelectItem value="2023-11">November 2023</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            variant="outline" 
            className="btn-secondary dark:bg-primary-dark dark:text-primary-foreground dark:border-primary-dark dark:hover:bg-primary/80"
          >
            <FileDown className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="card card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Total Pemasukan
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary-dark">
              {formatCurrency(report.summary.totalIncome)}
            </div>
          </CardContent>
        </Card>

        <Card className="card card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Total Pengeluaran
            </CardTitle>
            <TrendingDown className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary-dark">
              {formatCurrency(report.summary.totalExpense)}
            </div>
          </CardContent>
        </Card>

        <Card className="card card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Saldo Bulan Ini
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary-dark">
              {formatCurrency(report.summary.balance)}
            </div>
          </CardContent>
        </Card>

        <Card className="card card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Saldo Sebelumnya
            </CardTitle>
            <TrendingDown className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary-dark">
              {formatCurrency(report.summary.previousBalance)}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="card card-hover">
          <CardHeader>
            <CardTitle className="text-foreground">Pemasukan per Kategori</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-muted-dark">Kategori</TableHead>
                  <TableHead className="text-muted-dark text-right">Jumlah</TableHead>
                  <TableHead className="text-muted-dark text-right">Persentase</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {report.incomeByCategory.map((item) => (
                  <TableRow key={item.category}>
                    <TableCell className="text-foreground">{item.category}</TableCell>
                    <TableCell className="text-foreground text-right">
                      {formatCurrency(item.amount)}
                    </TableCell>
                    <TableCell className="text-muted-dark text-right">
                      {item.percentage}%
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="card card-hover">
          <CardHeader>
            <CardTitle className="text-foreground">Pengeluaran per Kategori</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-muted-dark">Kategori</TableHead>
                  <TableHead className="text-muted-dark text-right">Jumlah</TableHead>
                  <TableHead className="text-muted-dark text-right">Persentase</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {report.expenseByCategory.map((item) => (
                  <TableRow key={item.category}>
                    <TableCell className="text-foreground">{item.category}</TableCell>
                    <TableCell className="text-foreground text-right">
                      {formatCurrency(item.amount)}
                    </TableCell>
                    <TableCell className="text-muted-dark text-right">
                      {item.percentage}%
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Card className="card card-hover">
        <CardHeader>
          <CardTitle className="text-foreground">Riwayat Transaksi</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-muted-dark">Tanggal</TableHead>
                <TableHead className="text-muted-dark">Deskripsi</TableHead>
                <TableHead className="text-muted-dark">Kategori</TableHead>
                <TableHead className="text-muted-dark text-right">Jumlah</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {report.transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="text-foreground">
                    {format(transaction.date, 'dd MMM yyyy', { locale: id })}
                  </TableCell>
                  <TableCell className="text-foreground">{transaction.description}</TableCell>
                  <TableCell className="text-muted-dark">{transaction.category}</TableCell>
                  <TableCell 
                    className={`text-right ${
                      transaction.type === 'income' 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-red-600 dark:text-red-400'
                    }`}
                  >
                    {transaction.type === 'income' ? '+' : '-'}
                    {formatCurrency(transaction.amount)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  );
}
