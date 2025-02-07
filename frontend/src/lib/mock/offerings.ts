import { faker } from '@faker-js/faker/locale/id_ID';
import { http, HttpResponse } from 'msw';

export const offeringTypes = ['cash', 'transfer', 'other'];

export const offeringTypesMap = {
  'cash': 'Tunai',
  'transfer': 'Transfer Bank',
  'other': 'Lainnya'
};

export const offeringCategories = ['regular', 'special', 'mission', 'building'];

export const offeringCategoriesMap = {
  'regular': 'Persembahan Reguler',
  'special': 'Persembahan Khusus',
  'mission': 'Misi',
  'building': 'Pembangunan'
};

export interface Offering {
  id: string;
  date: string;
  amount: number;
  type: 'cash' | 'transfer' | 'other';
  description?: string;
  category: 'regular' | 'special' | 'mission' | 'building';
  status?: string;
}

export interface OfferingStats {
  totalAmount: number;
  averageAmount: number;
  offeringCount: number;
  categories: {
    regular: { amount: number, count: number };
    special: { amount: number, count: number };
    mission: { amount: number, count: number };
    building: { amount: number, count: number };
  };
}

export type PaymentMethod = 'bank' | 'digital' | 'cash' | 'qris';

export interface PaymentMethodDetails {
  id: string;
  type: PaymentMethod;
  accountName: string;
  accountNumber?: string;
  bankName?: string;
  isDefault?: boolean;
}

export const paymentMethods: PaymentMethod[] = ['bank', 'digital', 'cash', 'qris'];

export const mockPaymentMethodsList: PaymentMethodDetails[] = [
  {
    id: 'bca-1',
    type: 'bank',
    accountName: 'John Doe',
    accountNumber: '1234567890',
    bankName: 'BCA',
    isDefault: true
  },
  {
    id: 'mandiri-1',
    type: 'bank',
    accountName: 'John Doe',
    accountNumber: '0987654321',
    bankName: 'Mandiri',
    isDefault: false
  },
  {
    id: 'qris-1',
    type: 'qris',
    accountName: 'Gereja HKBP',
    isDefault: false
  }
];

export const generateOfferings = (count: number = 10): Offering[] => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    date: faker.date.recent().toISOString(),
    amount: faker.number.int({ 
      min: 500000,   // Minimum 500k to ensure meaningful amounts
      max: 10000000  // Maximum 10 million 
    }),
    type: faker.helpers.arrayElement(offeringTypes),
    description: faker.lorem.sentence(),
    category: faker.helpers.arrayElement(offeringCategories)
  }));
};

export const mockOfferingService = {
  offerings: generateOfferings(),
  
  summary: {} as OfferingStats,

  calculateSummary(): OfferingStats {
    const offerings = this.offerings;
    
    this.summary = {
      totalAmount: offerings.reduce((sum, offering) => sum + offering.amount, 0),
      averageAmount: offerings.reduce((sum, offering) => sum + offering.amount, 0) / offerings.length,
      offeringCount: offerings.length,
      categories: {
        regular: {
          amount: offerings.filter(o => o.category === 'regular').reduce((sum, o) => sum + o.amount, 0),
          count: offerings.filter(o => o.category === 'regular').length
        },
        special: {
          amount: offerings.filter(o => o.category === 'special').reduce((sum, o) => sum + o.amount, 0),
          count: offerings.filter(o => o.category === 'special').length
        },
        mission: {
          amount: offerings.filter(o => o.category === 'mission').reduce((sum, o) => sum + o.amount, 0),
          count: offerings.filter(o => o.category === 'mission').length
        },
        building: {
          amount: offerings.filter(o => o.category === 'building').reduce((sum, o) => sum + o.amount, 0),
          count: offerings.filter(o => o.category === 'building').length
        }
      }
    };

    return this.summary;
  },

  validateOffering(offeringData: Partial<Offering>): string[] {
    const errors: string[] = [];

    if (!offeringData.amount || offeringData.amount < 50000) {
      errors.push('Jumlah persembahan minimal Rp 50.000');
    }

    if (!offeringData.category) {
      errors.push('Kategori persembahan harus dipilih');
    }

    if (!offeringData.type) {
      errors.push('Metode pembayaran harus dipilih');
    }

    return errors;
  },

  getOfferings: (params?: { 
    page?: number, 
    limit?: number, 
    category?: string, 
    startDate?: string, 
    endDate?: string 
  }) => {
    let filteredOfferings = [...mockOfferingService.offerings];

    if (params?.category) {
      filteredOfferings = filteredOfferings.filter(o => o.category === params.category);
    }

    if (params?.startDate) {
      filteredOfferings = filteredOfferings.filter(o => new Date(o.date) >= new Date(params.startDate!));
    }

    if (params?.endDate) {
      filteredOfferings = filteredOfferings.filter(o => new Date(o.date) <= new Date(params.endDate!));
    }

    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedOfferings = filteredOfferings.slice(startIndex, endIndex);
    const summary = mockOfferingService.calculateSummary();
    
    return Promise.resolve({
      offerings: paginatedOfferings,
      summary,
      total: filteredOfferings.length,
      page,
      limit
    });
  },

  createOffering: (offeringData: Partial<Offering>) => {
    const validationErrors = mockOfferingService.validateOffering(offeringData);
    
    if (validationErrors.length > 0) {
      return Promise.reject(new Error(validationErrors.join(', ')));
    }

    const newOffering: Offering = {
      id: faker.string.uuid(),
      date: offeringData.date || new Date().toISOString(),
      amount: Math.max(50000, offeringData.amount || faker.number.int({ 
        min: 50000, 
        max: 10000000 
      })),
      type: offeringData.type || 'cash',
      description: offeringData.description || 'Persembahan gereja',
      category: offeringData.category || 'regular',
      status: 'completed'
    };

    mockOfferingService.offerings.push(newOffering);
    mockOfferingService.calculateSummary();
    
    return Promise.resolve(newOffering);
  },

  getPaymentMethods: () => {
    return mockPaymentMethodsList;
  },

  addPaymentMethod: (newMethod: Omit<PaymentMethodDetails, 'id'>) => {
    const method: PaymentMethodDetails = {
      id: faker.string.uuid(),
      ...newMethod,
      isDefault: false
    };

    mockPaymentMethodsList.push(method);
    return method;
  },

  deletePaymentMethod: (id: string) => {
    const index = mockPaymentMethodsList.findIndex(method => method.id === id);
    if (index !== -1) {
      mockPaymentMethodsList.splice(index, 1);
      return true;
    }
    return false;
  },

  simulateNetworkError: (probability = 0.05) => {
    if (Math.random() < probability) {
      return Promise.reject(new Error('Simulasi kesalahan jaringan'));
    }
    return Promise.resolve(true);
  }
};

// MSW Handlers
export const offeringsHandlers = [
  // Get all offerings
  http.get('/api/offerings', () => {
    return HttpResponse.json(mockOfferingService.offerings);
  }),

  // Get offerings summary
  http.get('/api/offerings/summary', () => {
    return HttpResponse.json(mockOfferingService.summary);
  }),

  // Create a new offering
  http.post('/api/offerings', async ({ request }) => {
    const newOfferingData = await request.json() as Partial<Offering>;
    const createdOffering = await mockOfferingService.createOffering(newOfferingData);
    return HttpResponse.json(createdOffering, { status: 201 });
  }),

  // Get offering types
  http.get('/api/offerings/types', () => {
    return HttpResponse.json(offeringTypes);
  }),

  // Get offering categories
  http.get('/api/offerings/categories', () => {
    return HttpResponse.json(offeringCategories);
  }),

  // Get payment methods
  http.get('/api/offerings/payment-methods', () => {
    return HttpResponse.json(mockOfferingService.getPaymentMethods());
  }),

  // Add payment method
  http.post('/api/offerings/payment-methods', async ({ request }) => {
    const newMethodData = await request.json() as Omit<PaymentMethodDetails, 'id'>;
    const addedMethod = mockOfferingService.addPaymentMethod(newMethodData);
    return HttpResponse.json(addedMethod, { status: 201 });
  }),

  // Delete payment method
  http.delete('/api/offerings/payment-methods/:id', async ({ params }) => {
    const id = params.id;
    const success = mockOfferingService.deletePaymentMethod(id);
    if (success) {
      return HttpResponse.json({ message: 'Metode pembayaran berhasil dihapus' }, { status: 200 });
    } else {
      return HttpResponse.json({ message: 'Metode pembayaran tidak ditemukan' }, { status: 404 });
    }
  })
];
