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
