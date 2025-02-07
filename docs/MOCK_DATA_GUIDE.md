# Mock Data Management Guide

## Overview
Mock data is a crucial part of our frontend development process, providing realistic data for development, testing, and prototyping.

## Directory Structure
```
/frontend/src/lib/mock/
├── index.ts           # Centralized exports
├── offerings.ts       # Offerings-related mock data
├── keuangan-mock-data.ts  # Financial mock data
├── ibadah.ts          # Worship-related mock data
├── jemaat.ts          # Congregation-related mock data
├── services.ts        # Services mock data
└── ...
```

## Mock Data Principles
1. **Type Safety**: All mock data uses TypeScript interfaces
2. **Realistic Simulation**: Generates data close to real-world scenarios
3. **Flexibility**: Easy to modify and extend
4. **Performance**: Lightweight and quick to generate

## Key Mock Data Features
- Uses `faker.js` for realistic data generation
- Supports multiple data generation scenarios
- Provides methods for:
  - Generating random data
  - Simulating API responses
  - Creating edge case scenarios

## Usage Example
```typescript
// In your component or hook
import { mockOfferingService } from '@/lib/mock/offerings';

function MyComponent() {
  const offerings = mockOfferingService.getOfferings();
  // Use mock data for development and testing
}
```

## Best Practices
- Never use mock data in production
- Keep mock data generation logic separate from components
- Use environment variables to switch between mock and real data
- Regularly update mock data to reflect current data structures

## Mocking Strategies
1. **Simple Generation**: Random data for quick prototyping
2. **Scenario-Based**: Specific data sets for different use cases
3. **Error Simulation**: Generating error scenarios for testing

## Future Improvements
- More comprehensive mock scenarios
- Enhanced type definitions
- Better error handling simulation
- Performance optimizations

## Contribution Guidelines
- When adding new mock data:
  1. Create a new file in `/lib/mock/`
  2. Use TypeScript interfaces
  3. Provide comprehensive generation methods
  4. Update `index.ts` with exports
```

I'll also update the FRONTEND_ARCHITECTURE.md to reference this new guide:

<function_calls>
<invoke name="edit_file">
<parameter name="TargetFile">/Users/macbook/Code/GKJ/docs/FRONTEND_ARCHITECTURE.md
