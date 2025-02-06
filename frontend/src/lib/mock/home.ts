import { faker } from '@faker-js/faker/locale/id_ID';
import { BaseEntity } from '@/types/common';
import { http, HttpResponse } from 'msw';

const generateNews = (count = 2): (BaseEntity & { 
  excerpt: string, 
  content: string, 
  author: string 
})[] => 
  Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    title: faker.lorem.sentence(),
    date: faker.date.recent().toLocaleDateString('id-ID'),
    excerpt: faker.lorem.paragraph(),
    content: faker.lorem.paragraphs(3),
    author: faker.person.fullName()
  }));

const generateEvents = (count = 3) => 
  Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    title: faker.lorem.words(3),
    date: faker.date.future().toLocaleDateString('id-ID'),
    location: faker.location.streetAddress(),
    description: faker.lorem.paragraph()
  }));

export const homeHandlers = [
  http.get('/api/home/news', () => {
    return HttpResponse.json(generateNews(3));
  }),

  http.get('/api/home/events', () => {
    return HttpResponse.json(generateEvents(4));
  })
];

export const homeMock = {
  generateNews,
  generateEvents
};
