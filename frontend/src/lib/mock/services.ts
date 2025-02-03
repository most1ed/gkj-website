import { faker } from '@faker-js/faker/locale/id_ID';
import { ServiceEvent, WeeklyService, Announcement, Devotional } from '@/types/services';
import { BaseEntity } from '@/types/common';

export const servicesMock = {
  generateLocation: () => ({
    id: faker.string.uuid(),
    name: faker.location.streetAddress(),
    address: faker.location.streetAddress(),
    coordinates: {
      latitude: parseFloat(faker.location.latitude()),
      longitude: parseFloat(faker.location.longitude())
    }
  }),

  generateUpcomingServices: (count = 2): ServiceEvent[] => 
    Array.from({ length: count }, () => ({
      id: faker.string.uuid(),
      title: `Ibadah ${faker.lorem.words(3)}`,
      date: faker.date.future().toLocaleDateString('id-ID'),
      time: faker.date.future().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      preacher: faker.person.fullName(),
      theme: faker.lorem.sentence(),
      location: servicesMock.generateLocation(),
      type: faker.helpers.arrayElement(['weekly', 'special', 'regular']),
      streamLink: faker.internet.url()
    })),

  generateWeeklyServices: (count = 2): WeeklyService[] => 
    Array.from({ length: count }, () => ({
      day: faker.date.weekday(),
      time: faker.date.future().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      title: `Ibadah ${faker.lorem.words(2)}`,
      location: servicesMock.generateLocation()
    })),

  generateAnnouncements: (count = 5): Announcement[] => 
    Array.from({ length: count }, () => ({
      id: faker.string.uuid(),
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(2),
      date: faker.date.recent().toLocaleDateString('id-ID'),
      author: faker.person.fullName(),
      category: faker.helpers.arrayElement(['general', 'ministry', 'event']),
      priority: faker.helpers.arrayElement(['low', 'medium', 'high'])
    })),

  generateDevotionals: (count = 2): Devotional[] => 
    Array.from({ length: count }, () => ({
      id: faker.string.uuid(),
      title: `Renungan: ${faker.lorem.words(3)}`,
      excerpt: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(3),
      date: faker.date.recent().toLocaleDateString('id-ID'),
      author: faker.person.fullName(),
      biblicalReference: `${faker.helpers.arrayElement(['John', 'Psalm', 'Proverbs'])} ${faker.number.int({ min: 1, max: 150 })}:${faker.number.int({ min: 1, max: 30 })}`
    }))
};
