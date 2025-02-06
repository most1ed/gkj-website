import { faker } from '@faker-js/faker/locale/id_ID';
import { http, HttpResponse } from 'msw';

export const offeringTypes = [
  { value: 'cash', label: 'Tunai' },
  { value: 'transfer', label: 'Transfer Bank' },
  { value: 'other', label: 'Lainnya' }
];

export const offeringCategories = [
  { value: 'regular', label: 'Persembahan Reguler' },
  { value: 'special', label: 'Persembahan Khusus' },
  { value: 'mission', label: 'Misi' },
  { value: 'building', label: 'Pembangunan' }
];

export interface Offering {
  id: string;
  date: string;
  amount: number;
  type: 'cash' | 'transfer' | 'other';
  description?: string;
  category: 'regular' | 'special' | 'mission' | 'building';
}

export const generateOfferings = (count: number = 10): Offering[] => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    date: faker.date.recent().toISOString(),
    amount: faker.number.int({ min: 50000, max: 5000000 }),
    type: faker.helpers.arrayElement(['cash', 'transfer', 'other']),
    description: faker.lorem.sentence(),
    category: faker.helpers.arrayElement(['regular', 'special', 'mission', 'building'])
  }));
};

export const mockOfferingService = {
  offerings: generateOfferings(),
  
  // Summary statistics
  summary: {
    totalAmount: 0,
    averageAmount: 0,
    categories: {
      regular: 0,
      special: 0,
      mission: 0,
      building: 0
    }
  },

  calculateSummary() {
    const offerings = this.offerings;
    
    this.summary = {
      totalAmount: offerings.reduce((sum, offering) => sum + offering.amount, 0),
      averageAmount: offerings.reduce((sum, offering) => sum + offering.amount, 0) / offerings.length,
      categories: {
        regular: offerings.filter(o => o.category === 'regular').reduce((sum, o) => sum + o.amount, 0),
        special: offerings.filter(o => o.category === 'special').reduce((sum, o) => sum + o.amount, 0),
        mission: offerings.filter(o => o.category === 'mission').reduce((sum, o) => sum + o.amount, 0),
        building: offerings.filter(o => o.category === 'building').reduce((sum, o) => sum + o.amount, 0)
      }
    };

    return this.summary;
  },

  getOfferings: () => {
    const offerings = mockOfferingService.offerings;
    const summary = mockOfferingService.calculateSummary();
    
    return Promise.resolve({
      offerings,
      summary
    });
  },

  createOffering: (offeringData: Partial<Offering>) => {
    const newOffering: Offering = {
      id: faker.string.uuid(),
      date: offeringData.date || new Date().toISOString(),
      amount: offeringData.amount || faker.number.int({ min: 50000, max: 5000000 }),
      type: offeringData.type || 'cash',
      description: offeringData.description,
      category: offeringData.category || 'regular'
    };

    mockOfferingService.offerings.push(newOffering);
    mockOfferingService.calculateSummary();
    
    return Promise.resolve(newOffering);
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
  })
];
