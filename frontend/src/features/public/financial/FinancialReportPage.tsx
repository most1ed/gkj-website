import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  TrendingUp, 
  PieChart, 
  DollarSign, 
  BookOpen, 
  FileText, 
  Download, 
  BarChart2 
} from 'lucide-react';

// Mock financial data (replace with actual data)
const financialOverview = {
  totalIncome: 1250000000, // Rp 1.25 Miliar
  totalExpenditure: 1100000000, // Rp 1.1 Miliar
  netSurplus: 150000000, // Rp 150 Juta
};

const incomeCategories = [
  { name: 'Persembahan Minggu', amount: 750000000, percentage: 60 },
  { name: 'Persembahan Khusus', amount: 250000000, percentage: 20 },
  { name: 'Donasi', amount: 150000000, percentage: 12 },
  { name: 'Lain-lain', amount: 100000000, percentage: 8 }
];

const expenditureCategories = [
  { name: 'Pelayanan & Program', amount: 450000000, percentage: 40 },
  { name: 'Operasional Gedung', amount: 300000000, percentage: 27 },
  { name: 'Gaji Staf', amount: 200000000, percentage: 18 },
  { name: 'Misi & Sosial', amount: 150000000, percentage: 14 }
];

const annualReports = [
  { year: 2023, status: 'Sudah Diaudit', link: '/reports/2023-financial-report.pdf' },
  { year: 2022, status: 'Sudah Diaudit', link: '/reports/2022-financial-report.pdf' },
  { year: 2021, status: 'Sudah Diaudit', link: '/reports/2021-financial-report.pdf' }
];

export default function FinancialReportPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const renderFinancialBreakdown = (categories, title) => (
    <div className="bg-card border border-border rounded-xl p-6 space-y-6">
      <div className="flex items-center space-x-4 mb-4">
        <PieChart className="text-primary" size={48} />
        <h2 className="text-2xl font-semibold text-foreground">{title}</h2>
      </div>
      <div className="space-y-4">
        {categories.map((category, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: `hsl(${index * 60}, 70%, 50%)` }}
              />
              <span className="text-muted-foreground">{category.name}</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="font-semibold">
                Rp {(category.amount / 1000000).toLocaleString()} Juta
              </span>
              <span className="text-muted-foreground">
                ({category.percentage}%)
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Laporan Keuangan - GKJ Grogol Jakarta</title>
        <meta 
          name="description" 
          content="Transparansi keuangan GKJ Grogol Jakarta - Laporan pendapatan, pengeluaran, dan komitmen keuangan" 
        />
      </Helmet>

      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="text-center mb-16">
          <DollarSign 
            className="mx-auto mb-6 text-primary" 
            size={64} 
          />
          <h1 className="text-4xl font-bold mb-4 text-foreground">
            Laporan Keuangan
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transparansi dan akuntabilitas dalam pengelolaan sumber daya gereja
          </p>
        </div>

        {/* Tabs Navigation */}
        <div className="flex justify-center mb-12 space-x-4">
          {[
            { id: 'overview', label: 'Ringkasan', icon: TrendingUp },
            { id: 'income', label: 'Pendapatan', icon: BarChart2 },
            { id: 'expenditure', label: 'Pengeluaran', icon: PieChart },
            { id: 'reports', label: 'Dokumen Resmi', icon: FileText }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center space-x-2 px-6 py-3 rounded-lg transition-all
                ${activeTab === tab.id 
                  ? 'bg-primary text-white' 
                  : 'bg-background border text-muted-foreground hover:bg-accent/10'
                }
              `}
            >
              <tab.icon size={20} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content Sections */}
        {activeTab === 'overview' && (
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                title: 'Total Pendapatan', 
                value: `Rp ${(financialOverview.totalIncome / 1000000).toLocaleString()} Juta`,
                icon: TrendingUp 
              },
              { 
                title: 'Total Pengeluaran', 
                value: `Rp ${(financialOverview.totalExpenditure / 1000000).toLocaleString()} Juta`,
                icon: DollarSign 
              },
              { 
                title: 'Surplus Bersih', 
                value: `Rp ${(financialOverview.netSurplus / 1000000).toLocaleString()} Juta`,
                icon: BookOpen 
              }
            ].map((card, index) => (
              <div 
                key={index} 
                className="bg-card border border-border rounded-xl p-6 text-center space-y-4 hover:shadow-lg transition-all"
              >
                <card.icon className="mx-auto text-primary" size={48} />
                <h3 className="text-xl font-semibold">{card.title}</h3>
                <p className="text-2xl font-bold text-foreground">{card.value}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'income' && renderFinancialBreakdown(incomeCategories, 'Sumber Pendapatan')}
        
        {activeTab === 'expenditure' && renderFinancialBreakdown(expenditureCategories, 'Alokasi Pengeluaran')}
        
        {activeTab === 'reports' && (
          <div className="bg-card border border-border rounded-xl p-8 space-y-6">
            <div className="flex items-center space-x-4 mb-4">
              <FileText className="text-primary" size={48} />
              <h2 className="text-2xl font-semibold text-foreground">Dokumen Laporan Keuangan</h2>
            </div>
            <div className="space-y-4">
              {annualReports.map((report, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between bg-background p-4 rounded-lg hover:bg-accent/10 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <FileText className="text-primary" size={24} />
                    <div>
                      <h3 className="font-semibold">Laporan Keuangan {report.year}</h3>
                      <p className="text-muted-foreground">{report.status}</p>
                    </div>
                  </div>
                  <a 
                    href={report.link} 
                    download
                    className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    <Download size={16} />
                    <span>Unduh</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-16 bg-primary/10 border border-primary/20 rounded-xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-6 text-foreground">
            Pertanyaan Keuangan?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Tim kami siap membantu Anda dengan pertanyaan seputar laporan keuangan.
          </p>
          <a 
            href="mailto:keuangan@gkjgrogoljakarta.org"
            className="inline-flex items-center space-x-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
          >
            <DollarSign className="mr-2" />
            Hubungi Tim Keuangan
          </a>
        </div>
      </div>
    </div>
  );
}
