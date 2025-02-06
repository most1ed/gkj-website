import { faker } from '@faker-js/faker/locale/id_ID';
import { http, HttpResponse } from 'msw';

export interface IbadahEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'sunday' | 'wednesday' | 'special' | 'youth' | 'children';
  liturgy: string;
  pelayans: string[];
  attendees: number;
}

export const generateIbadahEvents = (count: number = 30): IbadahEvent[] => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    title: faker.lorem.words(3),
    date: faker.date.recent({ days: 90 }).toISOString(),
    time: faker.date.recent().toLocaleTimeString('id-ID', { 
      hour: '2-digit', 
      minute: '2-digit' 
    }),
    type: faker.helpers.arrayElement([
      'sunday', 
      'wednesday', 
      'special', 
      'youth', 
      'children'
    ]),
    liturgy: faker.lorem.sentence(),
    pelayans: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, 
      () => faker.person.fullName()
    ),
    attendees: faker.number.int({ min: 50, max: 300 })
  }));
};

export const mockIbadahService = {
  events: generateIbadahEvents(),
  
  statistics: {
    totalAttendees: 0,
    totalServices: 0,
    uniqueLiturgi: 0,
    activePelayans: 0,
    averageAttendance: {
      sunday: 0,
      wednesday: 0,
      special: 0
    }
  },

  calculateStatistics() {
    const events = this.events;
    
    this.statistics = {
      totalAttendees: events.reduce((sum, event) => sum + event.attendees, 0),
      totalServices: events.length,
      uniqueLiturgi: new Set(events.map(e => e.liturgy)).size,
      activePelayans: new Set(events.flatMap(e => e.pelayans)).size,
      averageAttendance: {
        sunday: Math.round(
          events
            .filter(e => e.type === 'sunday')
            .reduce((sum, event) => sum + event.attendees, 0) / 
          events.filter(e => e.type === 'sunday').length
        ),
        wednesday: Math.round(
          events
            .filter(e => e.type === 'wednesday')
            .reduce((sum, event) => sum + event.attendees, 0) / 
          events.filter(e => e.type === 'wednesday').length
        ),
        special: Math.round(
          events
            .filter(e => e.type === 'special')
            .reduce((sum, event) => sum + event.attendees, 0) / 
          events.filter(e => e.type === 'special').length
        )
      }
    };

    return this.statistics;
  },

  getEvents: () => {
    const events = mockIbadahService.events;
    const statistics = mockIbadahService.calculateStatistics();
    
    return Promise.resolve({
      jadwal: events,
      statistik: statistics
    });
  },

  createEvent: (eventData: Partial<IbadahEvent>) => {
    const newEvent: IbadahEvent = {
      id: faker.string.uuid(),
      title: eventData.title || faker.lorem.words(3),
      date: eventData.date || new Date().toISOString(),
      time: eventData.time || new Date().toLocaleTimeString('id-ID', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      type: eventData.type || 'sunday',
      liturgy: eventData.liturgy || faker.lorem.sentence(),
      pelayans: eventData.pelayans || [faker.person.fullName()],
      attendees: eventData.attendees || faker.number.int({ min: 50, max: 300 })
    };

    mockIbadahService.events.push(newEvent);
    return Promise.resolve(newEvent);
  }
};

// Initialize statistics
mockIbadahService.calculateStatistics();

// MSW Handlers
export const ibadahHandlers = [
  // Get all ibadah events
  http.get('/api/ibadah', () => {
    return HttpResponse.json(mockIbadahService.events);
  }),

  // Get ibadah statistics
  http.get('/api/ibadah/statistics', () => {
    return HttpResponse.json(mockIbadahService.statistics);
  }),

  // Create new ibadah event
  http.post('/api/ibadah', async ({ request }) => {
    const newEventData = await request.json() as Partial<IbadahEvent>;
    const createdEvent = await mockIbadahService.createEvent(newEventData);
    return HttpResponse.json(createdEvent, { status: 201 });
  })
];
