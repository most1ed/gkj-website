# Mock API Documentation

## Overview
The Mock API provides a flexible and type-safe way to generate mock data for development and testing purposes.

## Structure

### Directories
- `@/lib/mock/`: Contains modular mock data generators
- `@/types/`: Provides type definitions for mock data

### Key Modules
- `services.ts`: Generates mock data for services, announcements
- `home.ts`: Generates mock data for home page content
- `index.ts`: Centralizes and exports mock data generators

## Usage

### Basic Import
```typescript
import { mockApi } from '@/lib/mock';

// Generate services
const upcomingServices = mockApi.services.generateUpcomingServices(3);

// Generate home news
const newsItems = mockApi.home.generateNews(2);
```

### Type Safety
All mock data generators are strongly typed:

```typescript
import { ServiceEvent } from '@/types/services';

const services: ServiceEvent[] = mockApi.services.generateUpcomingServices(3);
```

## New Features

### Error Handling
The mock API now includes advanced error handling capabilities:

```typescript
import { mockApi } from '@/lib/mock';

// Simulate API errors
const error = mockApi.errors.createMockApiError(
  mockApi.errors.MockApiErrorType.NETWORK_ERROR
);

// Log errors
mockApi.errors.MockApiErrorLogger.log(error);
```

### API Call Simulation
Simulate realistic API behaviors:

```typescript
import { mockApi } from '@/lib/mock';

// Simulate an API call with potential errors
const result = await mockApi.utils.simulateApiCall(
  () => mockApi.services.generateUpcomingServices(),
  { 
    delay: true, 
    errorProbability: 0.1 
  }
);

// Retry mechanism for resilient calls
const resilientResult = await mockApi.utils.retryApiCall(
  () => fetchData(),
  { 
    maxRetries: 3, 
    baseDelay: 1000 
  }
);
```

### Testing Utilities
Comprehensive testing scenarios:

```typescript
import { mockApi } from '@/lib/mock';

// Generate test scenarios
const successScenario = mockApi.testing.scenarios.successScenario(
  () => mockApi.mockGenerators.user()
);

const errorScenario = mockApi.testing.scenarios.errorScenario(
  mockApi.errors.MockApiErrorType.UNAUTHORIZED
);

// Generate mock data
const users = mockApi.testing.mockGenerators.collection(
  mockApi.testing.mockGenerators.user, 
  10
);

// Simulate API responses
const paginatedUsers = mockApi.testing.responseSimulator.paginate(
  users, 
  2, 
  5
);
```

## Widget Mock API

### Features
- Generate dummy widgets
- Create, update, and delete widgets
- Manage custom widgets
- Create and manage dashboard presets

### Example Usage
```typescript
import { mockApi } from '@/lib/mock';

// Generate dummy widgets
const dummyWidgets = mockApi.widget.generateDummyWidgets();

// Create a custom widget
const customWidget = await mockApi.widget.createCustomWidget({
  title: 'Custom Attendance Tracker',
  category: WidgetCategory.ATTENDANCE_TREND
});

// Get widgets for a specific role
const adminWidgets = await mockApi.widget.getWidgetsByRole(UserRole.ADMIN);

// Create a dashboard preset
const dashboardPreset = await mockApi.widget.createDashboardPreset({
  name: 'Admin Dashboard',
  role: UserRole.ADMIN
});
```

### Deprecation Notice
The following mock API files have been deprecated in favor of the centralized mock API:
- `/src/features/panel/flexdash/api/widgetMockApi.ts`
- `/src/features/panel/flexdash/api/flexDashboardMockApi.ts`

Please update your imports to use `@/lib/mock` instead.

## Dashboard Preset System

### Available Preset Groups

1. **Administrasi**
   - Fokus: Konten, artikel, dan pengaturan gereja
   - Kategori Widget: 
     - Overview
     - Ministry
     - Settings

2. **Keuangan**
   - Fokus: Analisis dan laporan keuangan
   - Kategori Widget:
     - Financial
     - Donation Distribution
     - Budget

3. **Jemaat**
   - Fokus: Statistik dan informasi keanggotaan
   - Kategori Widget:
     - Membership
     - Age Distribution
     - Gender Distribution

4. **Pelayanan**
   - Fokus: Aktivitas dan jadwal pelayanan
   - Kategori Widget:
     - Event
     - Attendance Trend

5. **Rencana**
   - Fokus: Manajemen tugas dan proyek
   - Kategori Widget:
     - Task Management

6. **Ibadah**
   - Fokus: Liturgi dan jadwal ibadah
   - Kategori Widget:
     - Event

7. **Media**
   - Fokus: Manajemen konten multimedia
   - Kategori Widget:
     - Media Library

### Widget Categories

- `OVERVIEW`: Ringkasan dan ikhtisar
- `FINANCIAL`: Laporan dan analisis keuangan
- `MEMBERSHIP`: Statistik keanggotaan
- `EVENT`: Jadwal dan kegiatan
- `ATTENDANCE_TREND`: Tren kehadiran
- `MINISTRY`: Aktivitas pelayanan
- `DONATION_DISTRIBUTION`: Distribusi persembahan
- `AGE_DISTRIBUTION`: Demografi umur
- `GENDER_DISTRIBUTION`: Komposisi gender
- `SETTINGS`: Pengaturan sistem
- `BUDGET`: Manajemen anggaran
- `TASK_MANAGEMENT`: Pengelolaan tugas
- `MEDIA_LIBRARY`: Perpustakaan media
- `DOCUMENT_MANAGEMENT`: Manajemen dokumen
- `PROFILE_INSIGHTS`: Wawasan profil

### Example Usage

```typescript
// Retrieve presets for a specific role
const adminPresets = await mockApi.widget.getDashboardPresets(UserRole.ADMIN);

// Create a custom preset
const customPreset = await mockApi.widget.createDashboardPreset({
  name: 'Custom Dashboard',
  description: 'Kombinasi widget keuangan dan jemaat',
  role: UserRole.ADMIN,
  widgets: [
    { 
      category: WidgetCategory.FINANCIAL, 
      title: 'Ringkasan Keuangan' 
    },
    { 
      category: WidgetCategory.MEMBERSHIP, 
      title: 'Statistik Jemaat' 
    }
  ]
});
```

## Customization

### Generating Custom Mock Data
You can easily extend or modify mock data generators:

```typescript
// In your feature-specific mock file
import { faker } from '@faker-js/faker/locale/id_ID';
import { ServiceEvent } from '@/types/services';

export const customServicesMock = {
  generateSpecialServices: (count = 2): ServiceEvent[] => 
    Array.from({ length: count }, () => ({
      // Custom logic for special services
      type: 'special',
      // ... other properties
    }))
}
```

## Best Practices
- Use mock data for development and testing
- Always replace mock data with real API calls in production
- Leverage TypeScript for type safety
- Keep mock data generators simple and focused
- Use error simulation for robust error handling testing
- Leverage testing utilities for comprehensive scenarios

## Performance Considerations
- Mock data generation is synchronous
- Use `simulateDelay()` to simulate network latency if needed
- Mock API utilities add minimal overhead
- Error simulation and retry mechanisms are configurable
- Designed for development and testing environments

## Extending Mock Data
1. Create a new file in `@/lib/mock/`
2. Define your mock data generator
3. Export and add to `@/lib/mock/index.ts`

## Troubleshooting
- Ensure all required types are imported
- Check that faker is properly configured
- Verify mock data structure matches expected types

## Contributing
- Follow existing patterns in mock data generation
- Add comprehensive type definitions
- Write clear, concise mock data generators
