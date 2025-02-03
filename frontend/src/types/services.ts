import { BaseEntity, Location } from './common';

export interface ServiceEvent extends BaseEntity {
  time: string;
  preacher?: string;
  theme?: string;
  liturgist?: string;
  location: Location;
  streamLink?: string;
  type: 'weekly' | 'special' | 'regular';
}

export interface WeeklyService {
  day: string;
  time: string;
  title: string;
  location: Location;
}

export interface ServiceData {
  upcomingServices: ServiceEvent[];
  weeklyServices: WeeklyService[];
  specialServices: ServiceEvent[];
}

export interface Announcement extends BaseEntity {
  content: string;
  author: string;
  category: 'general' | 'ministry' | 'event';
  priority: 'low' | 'medium' | 'high';
}

export interface Devotional extends BaseEntity {
  excerpt: string;
  content: string;
  author: string;
  biblicalReference: string;
}
