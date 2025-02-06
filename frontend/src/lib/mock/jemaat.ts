import { faker } from '@faker-js/faker/locale/id_ID';
import { http, HttpResponse } from 'msw';

// Mock service for Jemaat (Congregation) data
export interface Jemaat {
  id: string;
  nama: string;
  jenisKelamin: 'L' | 'P';
  tanggalLahir?: string;
  alamat: string;
  nomorTelepon?: string;
  statusPernikahan?: string;
  pelayanan?: string;
  wilayah?: string;
}

export const generateJemaat = (count: number = 50): Jemaat[] => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    nama: faker.person.fullName(),
    jenisKelamin: faker.helpers.arrayElement(['L', 'P']),
    tanggalLahir: faker.date.past({ min: 18, max: 80 }).toISOString(),
    alamat: faker.location.streetAddress(),
    nomorTelepon: faker.phone.number('62##########'),
    statusPernikahan: faker.helpers.arrayElement([
      'Belum Menikah', 
      'Menikah', 
      'Cerai', 
      'Janda/Duda'
    ]),
    pelayanan: faker.helpers.arrayElement([
      'Musik', 
      'Pengajaran', 
      'Doa', 
      'Pemuda', 
      'Anak'
    ]),
    wilayah: faker.location.city()
  }));
};

export const mockJemaatService = {
  jemaat: generateJemaat(),

  getJemaat: () => {
    return Promise.resolve({
      jemaat: mockJemaatService.jemaat,
      total: mockJemaatService.jemaat.length
    });
  },

  createJemaat: (data: Partial<Jemaat>) => {
    const newJemaat: Jemaat = {
      id: faker.string.uuid(),
      nama: data.nama || '',
      jenisKelamin: data.jenisKelamin as 'L' | 'P' || 'L',
      tanggalLahir: data.tanggalLahir || faker.date.past().toISOString(),
      alamat: data.alamat || '',
      nomorTelepon: data.nomorTelepon,
      statusPernikahan: data.statusPernikahan,
      pelayanan: data.pelayanan,
      wilayah: data.wilayah
    };

    mockJemaatService.jemaat.push(newJemaat);
    return Promise.resolve(newJemaat);
  }
};

// MSW handlers for Jemaat-related API calls
export const jemaatHandlers = [
  // Get all jemaat
  http.get('/api/jemaat', () => {
    return HttpResponse.json(mockJemaatService.jemaat);
  }),

  // Create new jemaat
  http.post('/api/jemaat', async ({ request }) => {
    const newJemaatData = await request.json() as Partial<Jemaat>;
    const createdJemaat = await mockJemaatService.createJemaat(newJemaatData);
    return HttpResponse.json(createdJemaat, { status: 201 });
  })
];
