import React, { useState } from 'react';
import { 
  CreditCard, 
  Trash2, 
  Plus, 
  AlertCircle 
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter 
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Card } from '@/components/ui/card';

import { 
  mockOfferingService, 
  paymentMethods,
  PaymentMethod,
  PaymentMethodDetails 
} from '@/lib/mock/offerings';

export function PaymentMethods({ 
  data = mockOfferingService.getPaymentMethods() 
}: { 
  data?: PaymentMethodDetails[] 
}) {
  const { toast } = useToast();
  const [paymentMethodList, setPaymentMethodList] = useState(data);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newMethod, setNewMethod] = useState({
    type: '' as PaymentMethod,
    accountName: '',
    accountNumber: '',
    bankName: ''
  });

  const [errors, setErrors] = useState({
    type: '',
    accountName: '',
    accountNumber: '',
    bankName: ''
  });

  const validateForm = () => {
    const newErrors = {
      type: !newMethod.type ? 'Pilih metode pembayaran' : '',
      accountName: !newMethod.accountName ? 'Nama akun wajib diisi' : '',
      accountNumber: !newMethod.accountNumber ? 'Nomor akun wajib diisi' : '',
      bankName: !newMethod.bankName ? 'Nama bank wajib diisi' : ''
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleAddMethod = () => {
    if (!validateForm()) {
      toast({
        title: 'Error',
        description: 'Harap lengkapi semua field yang wajib',
        variant: 'destructive'
      });
      return;
    }

    try {
      const addedMethod = mockOfferingService.addPaymentMethod({
        type: newMethod.type,
        accountName: newMethod.accountName,
        accountNumber: newMethod.accountNumber,
        bankName: newMethod.bankName
      });

      setPaymentMethodList([...paymentMethodList, addedMethod]);
      setIsAddDialogOpen(false);
      setNewMethod({
        type: '' as PaymentMethod,
        accountName: '',
        accountNumber: '',
        bankName: ''
      });

      toast({
        title: 'Berhasil',
        description: 'Metode pembayaran berhasil ditambahkan'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Gagal menambahkan metode pembayaran',
        variant: 'destructive'
      });
    }
  };

  const handleDeleteMethod = (id: string) => {
    try {
      const success = mockOfferingService.deletePaymentMethod(id);
      
      if (success) {
        setPaymentMethodList(paymentMethodList.filter(method => method.id !== id));
        
        toast({
          title: 'Berhasil',
          description: 'Metode pembayaran berhasil dihapus'
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Gagal menghapus metode pembayaran',
        variant: 'destructive'
      });
    }
  };

  const renderAddMethodDialog = () => (
    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Tambah Metode Pembayaran</DialogTitle>
          <DialogDescription>
            Tambahkan metode pembayaran baru untuk persembahan
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <Label>Metode Pembayaran</Label>
            <Select 
              value={newMethod.type}
              onValueChange={(value) => {
                setNewMethod(prev => ({ ...prev, type: value as PaymentMethod }));
                setErrors(prev => ({ ...prev, type: '' }));
              }}
            >
              <SelectTrigger className={errors.type ? 'border-destructive' : ''}>
                <SelectValue placeholder="Pilih Metode" />
              </SelectTrigger>
              <SelectContent>
                {paymentMethods.map(method => (
                  <SelectItem key={method} value={method}>
                    {method}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.type && (
              <p className="text-destructive text-sm mt-1 flex items-center">
                <AlertCircle className="mr-2 h-4 w-4" /> {errors.type}
              </p>
            )}
          </div>

          <div>
            <Label>Nama Akun</Label>
            <Input 
              placeholder="Masukkan nama akun"
              value={newMethod.accountName}
              onChange={(e) => {
                setNewMethod(prev => ({ ...prev, accountName: e.target.value }));
                setErrors(prev => ({ ...prev, accountName: '' }));
              }}
              className={errors.accountName ? 'border-destructive' : ''}
            />
            {errors.accountName && (
              <p className="text-destructive text-sm mt-1 flex items-center">
                <AlertCircle className="mr-2 h-4 w-4" /> {errors.accountName}
              </p>
            )}
          </div>

          <div>
            <Label>Nomor Akun</Label>
            <Input 
              placeholder="Masukkan nomor akun"
              value={newMethod.accountNumber}
              onChange={(e) => {
                setNewMethod(prev => ({ ...prev, accountNumber: e.target.value }));
                setErrors(prev => ({ ...prev, accountNumber: '' }));
              }}
              className={errors.accountNumber ? 'border-destructive' : ''}
            />
            {errors.accountNumber && (
              <p className="text-destructive text-sm mt-1 flex items-center">
                <AlertCircle className="mr-2 h-4 w-4" /> {errors.accountNumber}
              </p>
            )}
          </div>

          <div>
            <Label>Nama Bank</Label>
            <Input 
              placeholder="Masukkan nama bank"
              value={newMethod.bankName}
              onChange={(e) => {
                setNewMethod(prev => ({ ...prev, bankName: e.target.value }));
                setErrors(prev => ({ ...prev, bankName: '' }));
              }}
              className={errors.bankName ? 'border-destructive' : ''}
            />
            {errors.bankName && (
              <p className="text-destructive text-sm mt-1 flex items-center">
                <AlertCircle className="mr-2 h-4 w-4" /> {errors.bankName}
              </p>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
            Batal
          </Button>
          <Button onClick={handleAddMethod}>
            Tambah Metode
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Metode Pembayaran</h3>
        <Button size="sm" onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Tambah Metode
        </Button>
      </div>

      {paymentMethodList.length === 0 ? (
        <div className="text-center text-muted-foreground py-8">
          Belum ada metode pembayaran
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paymentMethodList.map(method => (
            <Card key={method.id} className="p-4 relative">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <CreditCard className="mr-2 text-muted-foreground" />
                  <span className="font-semibold">{method.type}</span>
                </div>
                <Button 
                  variant="destructive" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={() => handleDeleteMethod(method.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  {method.accountName}
                </p>
                <p className="text-sm text-muted-foreground">
                  {method.accountNumber}
                </p>
                {method.bankName && (
                  <p className="text-sm text-muted-foreground">
                    {method.bankName}
                  </p>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      {renderAddMethodDialog()}
    </div>
  );
}
