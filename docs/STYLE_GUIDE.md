# Code Style Guide

## Table of Contents
1. [TypeScript/React Guidelines](#typescript-react-guidelines)
2. [Go Guidelines](#go-guidelines)
3. [CSS/Tailwind Guidelines](#css-tailwind-guidelines)
4. [Git Commit Guidelines](#git-commit-guidelines)

## TypeScript/React Guidelines

### File Organization

```
src/
├── components/
│   ├── ui/              # Base UI components
│   │   ├── Button.tsx
│   │   └── Input.tsx
│   ├── layout/          # Layout components
│   └── feature/         # Feature components
├── hooks/               # Custom hooks
├── utils/               # Utility functions
└── types/               # Type definitions
```

### Naming Conventions

```typescript
// Interfaces
interface IUser {
  id: string;
  name: string;
}

// Types
type ButtonVariant = 'primary' | 'secondary' | 'outline';

// Components (PascalCase)
const UserProfile: React.FC<IUser> = ({ id, name }) => {
  return <div>{name}</div>;
};

// Hooks (camelCase with use prefix)
const useAuth = () => {
  // Implementation
};

// Utils (camelCase)
const formatDate = (date: Date): string => {
  // Implementation
};
```

### Component Structure

```typescript
// components/UserProfile/UserProfile.tsx
import { useState, useEffect } from 'react';
import type { User } from '@/types';
import { formatDate } from '@/utils';
import styles from './UserProfile.module.css';

interface Props {
  user: User;
  onUpdate?: (user: User) => void;
}

export const UserProfile: React.FC<Props> = ({ 
  user, 
  onUpdate 
}) => {
  // State
  const [isEditing, setIsEditing] = useState(false);
  
  // Effects
  useEffect(() => {
    // Side effects
  }, []);
  
  // Handlers
  const handleSubmit = () => {
    // Implementation
  };
  
  // Render helpers
  const renderForm = () => {
    // Implementation
  };
  
  return (
    <div className={styles.container}>
      {isEditing ? renderForm() : renderProfile()}
    </div>
  );
};
```

### Props and State

```typescript
// Good
interface Props {
  isLoading?: boolean;
  onSubmit: (data: FormData) => Promise<void>;
  children: React.ReactNode;
}

// Bad
interface Props {
  loading?: boolean; // Inconsistent naming
  submit: (d: any) => void; // Unclear types
}
```

### Hooks Usage

```typescript
// Good
const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const { isLoading, error, data } = useQuery('users', fetchUsers);
  
  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);
  
  return (
    // JSX
  );
};

// Bad
const UserList: React.FC = () => {
  const [d, setD] = useState([]); // Unclear naming
  useEffect(() => {
    // Direct data fetching in useEffect
    fetch('/api/users').then(setD);
  }, []);
};
```

## Go Guidelines

### Project Structure

```
backend/
├── cmd/                    # Main applications
├── internal/               # Private application code
│   ├── auth/
│   ├── handler/
│   └── service/
├── pkg/                    # Public libraries
└── api/                    # OpenAPI/Swagger specs
```

### Naming Conventions

```go
// Package names
package user

// Interface names
type Service interface {
    CreateUser(ctx context.Context, user *User) error
    GetUser(ctx context.Context, id string) (*User, error)
}

// Struct names
type UserService struct {
    repo Repository
    logger *zap.Logger
}

// Function names
func (s *UserService) CreateUser(ctx context.Context, user *User) error {
    // Implementation
}
```

### Error Handling

```go
// Good
func (s *Service) GetUser(ctx context.Context, id string) (*User, error) {
    user, err := s.repo.Find(ctx, id)
    if err != nil {
        return nil, fmt.Errorf("finding user: %w", err)
    }
    return user, nil
}

// Bad
func (s *Service) GetUser(ctx context.Context, id string) (*User, error) {
    user, err := s.repo.Find(ctx, id)
    if err != nil {
        return nil, err // Error context lost
    }
    return user, nil
}
```

### Interfaces

```go
// Good
type Repository interface {
    Find(ctx context.Context, id string) (*User, error)
    Save(ctx context.Context, user *User) error
}

// Implementation
type PostgresRepository struct {
    db *sql.DB
}

func (r *PostgresRepository) Find(ctx context.Context, id string) (*User, error) {
    // Implementation
}
```

## CSS/Tailwind Guidelines

### Class Organization

```tsx
// Good
<button 
  className={clsx(
    // Layout
    "flex items-center justify-center",
    // Spacing
    "px-4 py-2",
    // Typography
    "text-sm font-medium",
    // Colors
    "bg-blue-500 text-white",
    // States
    "hover:bg-blue-600 focus:ring-2",
    // Variants
    variant === 'outline' && "border-2 border-blue-500"
  )}
>
  {children}
</button>

// Bad
<button className="flex items-center justify-center hover:bg-blue-600 text-sm px-4 py-2 bg-blue-500">
  {children}
</button>
```

### Custom CSS

```scss
// Good
.button {
  // Use CSS custom properties
  --button-bg: theme('colors.blue.500');
  
  // Logical property order
  // 1. Positioning
  position: relative;
  z-index: 1;
  
  // 2. Display & Box Model
  display: flex;
  padding: theme('spacing.4');
  
  // 3. Typography
  font-weight: 500;
  
  // 4. Visual
  background-color: var(--button-bg);
  border-radius: theme('borderRadius.md');
  
  // 5. Animation
  transition: all 200ms ease;
  
  // 6. Pseudo-classes
  &:hover {
    --button-bg: theme('colors.blue.600');
  }
}
```

## Git Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- feat: New feature
- fix: Bug fix
- docs: Documentation
- style: Formatting
- refactor: Code restructuring
- test: Adding tests
- chore: Maintenance

### Examples

```
feat(auth): add JWT authentication

- Implement JWT token generation
- Add token validation middleware
- Update user service to use JWT

Closes #123
```

```
fix(ui): correct button alignment in mobile view

The button was overlapping with other elements on mobile screens
due to incorrect flex properties.

Fixes #456
```

### Branch Naming

```
feature/auth-implementation
bugfix/button-alignment
hotfix/security-patch
release/v1.0.0
```

## Documentation

### Component Documentation

```typescript
/**
 * Button component with various styles and states.
 *
 * @example
 * ```tsx
 * <Button variant="primary" onClick={() => console.log('clicked')}>
 *   Click me
 * </Button>
 * ```
 *
 * @param {ButtonProps} props - The component props
 * @returns {JSX.Element} The Button component
 */
export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary',
  children,
  ...props 
}) => {
  // Implementation
};
```

### Function Documentation

```typescript
/**
 * Formats a date string into a localized format.
 *
 * @param {Date} date - The date to format
 * @param {string} locale - The locale to use for formatting
 * @returns {string} The formatted date string
 * @throws {Error} If the date is invalid
 *
 * @example
 * ```typescript
 * const date = new Date('2025-01-23');
 * const formatted = formatDate(date, 'id-ID');
 * console.log(formatted); // "23 Januari 2025"
 * ```
 */
export const formatDate = (date: Date, locale: string): string => {
  // Implementation
};
```

## Code Review Guidelines

### What to Look For

1. **Functionality**
   - Does the code work as intended?
   - Are edge cases handled?
   - Is error handling appropriate?

2. **Code Quality**
   - Is the code clean and readable?
   - Does it follow our style guide?
   - Are there any potential performance issues?

3. **Testing**
   - Are there sufficient tests?
   - Do the tests cover edge cases?
   - Are the tests readable?

### Review Comments

```
// Good
Consider using optional chaining here to handle potential undefined values:
user?.address?.street vs user.address.street

// Bad
This is wrong
```

## IDE Configuration

### VS Code Settings

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "non-relative"
}
```

### ESLint Configuration

```json
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended"
  ],
  "rules": {
    "@typescript-eslint/explicit-function-return-type": "error",
    "react-hooks/exhaustive-deps": "error"
  }
}
```

### Prettier Configuration

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 80,
  "tabWidth": 2
}
```
