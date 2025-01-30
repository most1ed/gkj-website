import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Wallet, Building, Plus } from "lucide-react";

interface PaymentMethod {
  id: string;
  type: "card" | "ewallet" | "bank";
  name: string;
  details: string;
  isDefault: boolean;
}

export function PaymentMethods() {
  const [methods, setMethods] = useState<PaymentMethod[]>([
    {
      id: "1",
      type: "card",
      name: "Credit Card",
      details: "**** **** **** 1234",
      isDefault: true,
    },
    {
      id: "2",
      type: "ewallet",
      name: "GoPay",
      details: "081234567890",
      isDefault: false,
    },
    {
      id: "3",
      type: "bank",
      name: "Bank Transfer",
      details: "BCA - 1234567890",
      isDefault: false,
    },
    // Add more dummy data as needed
  ]);

  const getMethodIcon = (type: PaymentMethod["type"]) => {
    switch (type) {
      case "card":
        return <CreditCard className="h-5 w-5" />;
      case "ewallet":
        return <Wallet className="h-5 w-5" />;
      case "bank":
        return <Building className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Metode Pembayaran</CardTitle>
          <CardDescription>
            Kelola metode pembayaran Anda
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {methods.map((method) => (
              <div
                key={method.id}
                className={`p-4 border rounded-lg flex items-start gap-4 ${
                  method.isDefault ? "border-primary" : ""
                }`}
              >
                <div className="p-2 bg-primary/10 rounded-full text-primary">
                  {getMethodIcon(method.type)}
                </div>
                <div className="flex-grow space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{method.name}</p>
                    {method.isDefault && (
                      <Badge className="bg-primary/10 text-primary text-xs">
                        Default
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {method.details}
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                    {!method.isDefault && (
                      <Button size="sm" variant="outline">
                        Hapus
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            <Button
              variant="outline"
              className="h-[120px] border-dashed flex flex-col gap-2"
            >
              <Plus className="h-5 w-5" />
              <span>Tambah Metode</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
