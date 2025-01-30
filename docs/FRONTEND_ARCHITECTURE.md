# Frontend Architecture Documentation

## Project Structure Overview

### Root Directory Layout
```
/frontend
├── src/
│   ├── assets/
│   ├── components/
│   ├── config/
│   ├── constants/
│   ├── data/
│   ├── features/
│   ├── hooks/
│   ├── layouts/
│   ├── lib/
│   ├── mocks/
│   ├── providers/
│   ├── routes/
│   ├── styles/
│   ├── types/
│   ├── utils/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── node_modules/
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Detailed Directory Breakdown

### 1. `/assets/`
- Purpose: Store static resources like images, icons, and fonts
- Contents: Non-code static files used across the application
- Best Practices:
  - Organize by type (images, icons, etc.)
  - Use meaningful, descriptive filenames
  - Optimize assets for web performance

### 2. `/components/`
#### Structure
```
/components
├── common/
│   ├── Footer.tsx
│   ├── auth/
│   ├── navigation/
│   ├── pdf/
│   └── theme/
├── ui/
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Card.tsx
│   └── ... (other UI components)
├── DummyPage.tsx
└── ErrorBoundary.tsx
```

- Purpose: Store reusable UI components
- Types of Components:
  1. **Common Components**: 
     - Site-wide utility components
     - Shared across multiple features
  2. **UI Components**: 
     - Atomic design approach
     - Primitive and complex UI elements
  3. **Utility Components**: 
     - Error handling
     - Placeholder components

### 3. `/features/`
#### Feature-Based Architecture
```
/features
├── public/
│   ├── home/
│   │   ├── components/
│   │   │   ├── Hero.tsx
│   │   │   ├── LatestNews.tsx
│   │   │   ├── EventsHighlight.tsx
│   │   │   └── ... (other home page components)
│   │   ├── hooks/
│   │   │   └── useHomeData.ts
│   │   └── HomePage.tsx
│   ├── about/
│   ├── services/
│   ├── ministries/
│   └── ... (other public features)
├── auth/
├── panel/
└── dashboard/
```

- Purpose: Organize application by domain-specific features
- Principles:
  - Vertical slice architecture
  - Feature-based code organization
  - Encapsulate feature-specific logic
  - Modular and extensible design

#### Feature Component Characteristics
- Small, focused components
- Single responsibility principle
- TypeScript for type safety
- Custom hooks for data management
- Tailwind CSS for styling

#### Home Feature Example
Key Components:
- `Hero`: Landing section
- `LatestNews`: News updates
- `EventsHighlight`: Upcoming events
- `ArticlesSection`: Church articles
- `ImportantAnnouncements`: Critical announcements
- `ServicesOverview`: Church services summary
- `WeeklyService`: Specific service details
- `OfferingInfo`: Donation information
- `PrayerSupport`: Prayer request section
- `QuickInfo`: Rapid information display
- `GallerySection`: Media gallery
- `Features`: Site feature highlights

### 4. `/config/`
- Purpose: Application-wide configuration
- Contents:
  - Environment configurations
  - App-level settings
  - Route configurations
- Best Practices:
  - Use environment variables
  - Separate config for different environments

### 5. `/constants/`
- Purpose: Store constant values and enums
- Contents:
  - Route constants
  - Theme constants
  - Static configuration values
- Best Practices:
  - Use UPPER_SNAKE_CASE for constant names
  - Group related constants
  - Export as typed constants

### 6. `/hooks/`
- Purpose: Custom React hooks
- Contents:
  - Reusable logic hooks
  - State management hooks
  - Side effect management
- Examples:
  - `useAuth`
  - `useForm`
  - `useLocalStorage`

### 7. `/layouts/`
- Purpose: Provide structural layouts for different app sections
- Contents:
  - `PanelLayout.tsx`
  - `PublicLayout.tsx`
  - `AdminLayout.tsx`
- Responsibilities:
  - Define page structure
  - Manage common layout elements
  - Handle responsive design

### 8. `/lib/`
- Purpose: Shared libraries and utility functions
- Structure:
  ```
  /lib
  ├── api/
  ├── utils/
  └── helpers/
  ```
- Contents:
  - API interaction logic
  - Complex utility functions
  - Shared business logic

### 9. `/routes/`
- Purpose: Define application routing
- Contents:
  - `public.routes.tsx`
  - `auth.routes.tsx`
  - `panel.routes.tsx`
- Features:
  - Route configuration
  - Authentication guards
  - Lazy loading support

### 10. `/styles/`
- Purpose: Global styling
- Contents:
  - `global.css`
  - Global style definitions
- Integrated with TailwindCSS

### 11. `/types/`
- Purpose: TypeScript type definitions
- Contents:
  - `user.type.ts`
  - `auth.type.ts`
  - Shared type definitions
- Best Practices:
  - Use interfaces and type aliases
  - Keep types minimal and focused

### 12. `/utils/`
- Purpose: Utility functions
- Contents:
  - Formatting helpers
  - Validation functions
  - Generic utility methods

## Architectural Principles
1. Modular Design
2. Feature-Based Organization
3. Type Safety
4. Separation of Concerns
5. Reusability
6. Performance Optimization

## Recommended Workflow
- Keep components small and focused
- Use composition over inheritance
- Implement strict typing
- Follow atomic design principles
- Optimize for performance and maintainability

## Performance Considerations
- Use code splitting
- Implement lazy loading
- Minimize re-renders
- Use memoization techniques
- Optimize asset loading

## Future Improvements
- Implement more comprehensive testing
- Enhance type safety
- Continuous refactoring
- Performance audits
- Accessibility improvements
- Advanced state management
- Expand feature modularity
