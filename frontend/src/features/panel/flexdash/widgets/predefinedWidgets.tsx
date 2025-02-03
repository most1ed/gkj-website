import React from 'react';
import { Card } from '@/components/ui/Card';
import { CardContent } from '@/components/ui/Card';
import { CardHeader } from '@/components/ui/Card';
import { CardTitle } from '@/components/ui/Card';
import { 
  FlexWidget, 
  WidgetCategory 
} from '../types/dashboard.types';
import { UserRole } from '@/types/user.types';

// Financial Overview Widget
export const FinancialOverviewWidget: FlexWidget = {
  id: 'financial-overview',
  title: 'Financial Overview',
  category: WidgetCategory.FINANCIAL,
  component: () => (
    <Card>
      <CardHeader>
        <CardTitle>Financial Overview</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Placeholder for financial data */}
        <p>Total Contributions: Rp 500,000,000</p>
        <p>Monthly Budget: Rp 50,000,000</p>
      </CardContent>
    </Card>
  ),
  allowedRoles: [UserRole.ADMIN, UserRole.TREASURER],
  size: 'MEDIUM',
  createdAt: new Date(),
  updatedAt: new Date(),
  createdBy: 'system'
};

// Membership Statistics Widget
export const MembershipStatsWidget: FlexWidget = {
  id: 'membership-stats',
  title: 'Membership Statistics',
  category: WidgetCategory.MEMBERSHIP,
  component: () => (
    <Card>
      <CardHeader>
        <CardTitle>Membership Stats</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Placeholder for membership data */}
        <p>Total Members: 1,500</p>
        <p>New Members (This Month): 25</p>
      </CardContent>
    </Card>
  ),
  allowedRoles: [UserRole.ADMIN, UserRole.STAFF],
  size: 'MEDIUM',
  createdAt: new Date(),
  updatedAt: new Date(),
  createdBy: 'system'
};

// Event Calendar Widget
export const EventCalendarWidget: FlexWidget = {
  id: 'event-calendar',
  title: 'Upcoming Events',
  category: WidgetCategory.EVENTS,
  component: () => (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Events</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Placeholder for event data */}
        <ul>
          <li>Sunday Service - Every Sunday</li>
          <li>Youth Meeting - Next Saturday</li>
          <li>Annual Church Conference - 15 March</li>
        </ul>
      </CardContent>
    </Card>
  ),
  allowedRoles: [UserRole.ADMIN, UserRole.STAFF],
  size: 'MEDIUM',
  createdAt: new Date(),
  updatedAt: new Date(),
  createdBy: 'system'
};

// Ministry Progress Widget
export const MinistryProgressWidget: FlexWidget = {
  id: 'ministry-progress',
  title: 'Ministry Progress',
  category: WidgetCategory.MINISTRY,
  component: () => (
    <Card>
      <CardHeader>
        <CardTitle>Ministry Progress</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Placeholder for ministry data */}
        <p>Active Ministries: 5</p>
        <p>Ongoing Projects: 3</p>
      </CardContent>
    </Card>
  ),
  allowedRoles: [UserRole.ADMIN, UserRole.STAFF, UserRole.MINISTRY_LEADER],
  size: 'MEDIUM',
  createdAt: new Date(),
  updatedAt: new Date(),
  createdBy: 'system'
};
