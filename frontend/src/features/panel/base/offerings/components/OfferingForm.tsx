import React, { useState } from 'react';
import { 
  DollarSign, 
  Save, 
  AlertCircle, 
  Plus, 
  Trash2 
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
  offeringTypes, 
  paymentMethods,
  OfferingType,
  PaymentMethod 
} from '@/lib/mock/offerings';

export function OfferingForm() {
  const { toast } = useToast();
  const [isWeeklyOfferingDialogOpen, setIsWeeklyOfferingDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    amount: '',
    type: '' as OfferingType,
    method: '' as PaymentMethod,
    description: ''
  });

  const [weeklyOfferingData, setWeeklyOfferingData] = useState({
    serviceType: '',
    collector: '',
    offerings: [] as Array<{
      type: OfferingType;
      amount: number;
      method: PaymentMethod;
    }>
  });

  const [errors, setErrors] = useState({
    amount: '',
    type: '',
    method: '',
    serviceType: '',
    collector: ''
  });

  const validateForm = () => {
    const newErrors = {
      amount: !formData.amount ? 'Jumlah persembahan wajib diisi' : '',
      type: !formData.type ? 'Pilih jenis persembahan' : '',
      method: !formData.method ? 'Pilih metode pembayaran' : '',
      serviceType: '',
      collector: ''
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const validateWeeklyOfferingForm = () => {
    const newErrors = {
      amount: '',
      type: '',
      method: '',
      serviceType: !weeklyOfferingData.serviceType ? 'Pilih jenis kebaktian' : '',
      collector: !weeklyOfferingData.collector ? 'Nama petugas wajib diisi' : ''
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: 'Error',
        description: 'Harap lengkapi semua field yang wajib',
        variant: 'destructive'
      });
      return;
    }

    try {
      const numericAmount = parseFloat(formData.amount.replace(/[^0-9]/g, ''));
      
      const offering = mockOfferingService.createOffering({
        amount: numericAmount,
        type: formData.type,
        method: formData.method,
        description: formData.description
      });

      toast({
        title: 'Berhasil',
        description: `Persembahan sebesar Rp ${numericAmount.toLocaleString()} berhasil dicatat`
      });

      // Reset form
      setFormData({
        amount: '',
        type: '' as OfferingType,
        method: '' as PaymentMethod,
        description: ''
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Gagal mencatat persembahan',
        variant: 'destructive'
      });
    }
  };

  const handleWeeklyOfferingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateWeeklyOfferingForm() || weeklyOfferingData.offerings.length === 0) {
      toast({
        title: 'Error',
        description: 'Harap lengkapi semua field dan tambahkan minimal satu persembahan',
        variant: 'destructive'
      });
      return;
    }

    try {
      const result = mockOfferingService.createWeeklyOffering(weeklyOfferingData);

      toast({
        title: 'Berhasil',
        description: `Persembahan Mingguan ${result.serviceType} sebesar Rp ${result.totalAmount.toLocaleString()} berhasil dicatat`
      });

      // Reset weekly offering form
      setWeeklyOfferingData({
        serviceType: '',
        collector: '',
        offerings: []
      });
      setIsWeeklyOfferingDialogOpen(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Gagal mencatat persembahan mingguan',
        variant: 'destructive'
      });
    }
  };

  const addWeeklyOffering = () => {
    const newOffering = {
      type: '' as OfferingType,
      amount: 0,
      method: '' as PaymentMethod
    };

    setWeeklyOfferingData(prev => ({
      ...prev,
      offerings: [...prev.offerings, newOffering]
    }));
  };

  const updateWeeklyOffering = (index: number, field: keyof typeof weeklyOfferingData.offerings[0], value: any) => {
    const updatedOfferings = [...weeklyOfferingData.offerings];
    updatedOfferings[index] = {
      ...updatedOfferings[index],
      [field]: value
    };

    setWeeklyOfferingData(prev => ({
      ...prev,
      offerings: updatedOfferings
    }));
  };

  const removeWeeklyOffering = (index: number) => {
    const updatedOfferings = weeklyOfferingData.offerings.filter((_, i) => i !== index);
    setWeeklyOfferingData(prev => ({
      ...prev,
      offerings: updatedOfferings
    }));
  };

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    return numericValue ? 
      `Rp ${parseInt(numericValue).toLocaleString()}` : 
      '';
  };

  const renderWeeklyOfferingDialog = () => (
    <Dialog open={isWeeklyOfferingDialogOpen} onOpenChange={setIsWeeklyOfferingDialogOpen}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Catat Persembahan Mingguan</DialogTitle>
          <DialogDescription>
            Input persembahan dari berbagai jenis untuk satu kebaktian
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleWeeklyOfferingSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label>Jenis Kebaktian</Label>
              <Select 
                value={weeklyOfferingData.serviceType}
                onValueChange={(value) => {
                  setWeeklyOfferingData(prev => ({ ...prev, serviceType: value }));
                  setErrors(prev => ({ ...prev, serviceType: '' }));
                }}
              >
                <SelectTrigger className={errors.serviceType ? 'border-destructive' : ''}>
                  <SelectValue placeholder="Pilih Jenis Kebaktian" />
                </SelectTrigger>
                <SelectContent>
                  {[
                    'Kebaktian Minggu Pagi', 
                    'Kebaktian Remaja', 
                    'Kebaktian Anak', 
                    'Kebaktian Khusus'
                  ].map(service => (
                    <SelectItem key={service} value={service}>
                      {service}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.serviceType && (
                <p className="text-destructive text-sm mt-1 flex items-center">
                  <AlertCircle className="mr-2 h-4 w-4" /> {errors.serviceType}
                </p>
              )}
            </div>
            <div>
              <Label>Nama Petugas Pengumpul</Label>
              <Input 
                placeholder="Masukkan nama petugas"
                value={weeklyOfferingData.collector}
                onChange={(e) => {
                  setWeeklyOfferingData(prev => ({ ...prev, collector: e.target.value }));
                  setErrors(prev => ({ ...prev, collector: '' }));
                }}
                className={errors.collector ? 'border-destructive' : ''}
              />
              {errors.collector && (
                <p className="text-destructive text-sm mt-1 flex items-center">
                  <AlertCircle className="mr-2 h-4 w-4" /> {errors.collector}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-semibold">Jenis Persembahan</h4>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={addWeeklyOffering}
              >
                <Plus className="mr-2 h-4 w-4" /> Tambah Persembahan
              </Button>
            </div>

            {weeklyOfferingData.offerings.map((offering, index) => (
              <Card key={index} className="p-4 space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label>Jenis Persembahan</Label>
                    <Select 
                      value={offering.type}
                      onValueChange={(value) => 
                        updateWeeklyOffering(index, 'type', value as OfferingType)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Jenis" />
                      </SelectTrigger>
                      <SelectContent>
                        {offeringTypes.map(type => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Jumlah</Label>
                    <Input 
                      placeholder="Masukkan jumlah"
                      value={offering.amount ? `Rp ${offering.amount.toLocaleString()}` : ''}
                      onChange={(e) => {
                        const numericValue = parseFloat(e.target.value.replace(/[^0-9]/g, ''));
                        updateWeeklyOffering(index, 'amount', numericValue);
                      }}
                    />
                  </div>
                  <div>
                    <Label>Metode</Label>
                    <Select 
                      value={offering.method}
                      onValueChange={(value) => 
                        updateWeeklyOffering(index, 'method', value as PaymentMethod)
                      }
                    >
                      <SelectTrigger>
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
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button 
                    type="button" 
                    variant="destructive" 
                    size="sm" 
                    onClick={() => removeWeeklyOffering(index)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" /> Hapus
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsWeeklyOfferingDialogOpen(false)}>
              Batal
            </Button>
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" /> Simpan Persembahan
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-6 bg-muted/50 p-6 rounded-lg mb-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label>Jumlah Persembahan</Label>
            <div className="relative">
              <Input 
                placeholder="Masukkan jumlah persembahan"
                value={formData.amount}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  amount: formatCurrency(e.target.value) 
                }))}
                className={`pl-10 ${errors.amount ? 'border-destructive' : ''}`}
              />
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            </div>
            {errors.amount && (
              <p className="text-destructive text-sm mt-1 flex items-center">
                <AlertCircle className="mr-2 h-4 w-4" /> {errors.amount}
              </p>
            )}
          </div>

          <div>
            <Label>Jenis Persembahan</Label>
            <Select 
              value={formData.type}
              onValueChange={(value) => {
                setFormData(prev => ({ ...prev, type: value as OfferingType }));
                setErrors(prev => ({ ...prev, type: '' }));
              }}
            >
              <SelectTrigger className={errors.type ? 'border-destructive' : ''}>
                <SelectValue placeholder="Pilih Jenis" />
              </SelectTrigger>
              <SelectContent>
                {offeringTypes.map(type => (
                  <SelectItem key={type} value={type}>
                    {type}
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
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label>Metode Pembayaran</Label>
            <Select 
              value={formData.method}
              onValueChange={(value) => {
                setFormData(prev => ({ ...prev, method: value as PaymentMethod }));
                setErrors(prev => ({ ...prev, method: '' }));
              }}
            >
              <SelectTrigger className={errors.method ? 'border-destructive' : ''}>
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
            {errors.method && (
              <p className="text-destructive text-sm mt-1 flex items-center">
                <AlertCircle className="mr-2 h-4 w-4" /> {errors.method}
              </p>
            )}
          </div>

          <div>
            <Label>Deskripsi (Opsional)</Label>
            <Input 
              placeholder="Tambahkan catatan"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                description: e.target.value 
              }))}
            />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => setIsWeeklyOfferingDialogOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" /> Persembahan Mingguan
          </Button>
          <Button type="submit">
            <Save className="mr-2 h-4 w-4" />
            Catat Persembahan
          </Button>
        </div>
      </form>

      {renderWeeklyOfferingDialog()}
    </div>
  );
}
