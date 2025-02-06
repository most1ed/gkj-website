import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OfferingForm } from "./components/OfferingForm";
import { OfferingHistory } from "./components/OfferingHistory";
import { PaymentMethods } from "./components/PaymentMethods";
import { OfferingStats } from "./components/OfferingStats";
import { Button } from "@/components/ui/button";
import { Plus, CreditCard } from "lucide-react";
import { useUserOfferings } from "./hooks/useUserOfferings";
import { useState } from "react";

export default function UserOfferingsPage() {
  const { data, isLoading } = useUserOfferings();
  const [activeTab, setActiveTab] = useState<string>("give");

  const handleNewOffering = () => {
    setActiveTab("give");
  };

  const handleManagePaymentMethods = () => {
    setActiveTab("payment");
  };

  return (
    <div className="space-y-6 p-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Persembahan</h2>
          <p className="text-muted-foreground">
            Berikan persembahan dan lihat riwayat
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={handleManagePaymentMethods}
          >
            <CreditCard className="mr-2 h-4 w-4" />
            Kelola Metode Pembayaran
          </Button>
          <Button onClick={handleNewOffering}>
            <Plus className="mr-2 h-4 w-4" />
            Persembahan Baru
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <OfferingStats data={data?.stats} />

      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab} 
        defaultValue="give" 
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value="give">Beri Persembahan</TabsTrigger>
          <TabsTrigger value="history">Riwayat</TabsTrigger>
          <TabsTrigger value="payment">Metode Pembayaran</TabsTrigger>
        </TabsList>
        
        <TabsContent value="give" className="space-y-4">
          <OfferingForm />
        </TabsContent>
        
        <TabsContent value="history" className="space-y-4">
          <OfferingHistory data={data?.history} />
        </TabsContent>
        
        <TabsContent value="payment" className="space-y-4">
          <PaymentMethods data={data?.paymentMethods} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
