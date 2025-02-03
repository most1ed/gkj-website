# Mock API Migration Guide

## Overview
This document provides guidance for migrating from the old mock API structure to the new, more modular and type-safe approach.

## Key Changes

### 1. Import Changes
#### Old Approach
```typescript
import { mockServicesData, mockAnnouncements } from '@/lib/mock-api';
```

#### New Approach
```typescript
import { mockApi } from '@/lib/mock';
// or for backward compatibility
import { mockServicesData, mockAnnouncements } from '@/lib/mock-api';
```

### 2. Mock Data Generation

#### Services
| Old Method | New Method | Example |
|-----------|------------|---------|
| `mockServicesData.generateUpcomingServices()` | `mockApi.services.generateUpcomingServices()` | Same usage |
| `mockServicesData.generateWeeklyServices()` | `mockApi.services.generateWeeklyServices()` | Same usage |

#### Announcements
| Old Method | New Method | Example |
|-----------|------------|---------|
| `mockAnnouncements.generateAnnouncements()` | `mockApi.services.generateAnnouncements()` | Same usage |

#### Home News
| Old Method | New Method | Example |
|-----------|------------|---------|
| `mockHome.generateNews()` | `mockApi.home.generateNews()` | Same usage |

## Migration Steps

1. Update import statements
2. Replace old mock API calls with new ones
3. Verify type compatibility
4. Run tests to ensure no breaking changes

## Best Practices

- Use TypeScript's strict mode
- Leverage new type definitions in `@/types`
- Prefer new mock API structure for new components

## Troubleshooting

### Type Errors
If you encounter type errors, ensure you're using the latest type definitions from `@/types`.

### Performance
The new mock API is designed to be more performant and easier to extend.

## Example Migration

```typescript
// Old code
import { mockServicesData } from '@/lib/mock-api';

function ServicesPage() {
  const services = mockServicesData.generateUpcomingServices(3);
  // ...
}

// New code
import { mockApi } from '@/lib/mock';

function ServicesPage() {
  const services = mockApi.services.generateUpcomingServices(3);
  // ...
}
```

## Future Roadmap
- Complete migration to new mock API
- Add more comprehensive mock data generators
- Improve type safety and documentation

## Contributing
If you find any issues during migration, please report them to the development team.
