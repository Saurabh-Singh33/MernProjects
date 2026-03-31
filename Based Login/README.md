# Type-Safe React Module

A React module demonstrating type-safe component behavior using TypeScript interfaces and generics. This project includes a user profile component and a dashboard component with full type safety.

## Features

- **Type-Safe Components**: All components use TypeScript interfaces and generics for reliable type checking
- **User Profile Component**: Displays user information with editing capabilities
- **Dashboard Component**: Flexible dashboard with different item types (metrics, charts, lists, cards)
- **Generic Utilities**: Reusable generic components for data display
- **Modern React**: Built with React 18, TypeScript, and Vite

## Project Structure

```
src/
├── components/
│   ├── common/
│   │   └── DataDisplay.tsx    # Generic data display components
│   ├── Dashboard.tsx          # Dashboard component with generics
│   ├── Profile.tsx            # User profile component
│   └── index.ts               # Module exports
├── types/
│   └── user.ts                # TypeScript interfaces and types
├── App.tsx                    # Main application demo
└── main.tsx                   # Application entry point
```

## Key TypeScript Features Demonstrated

### Interfaces

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  preferences: UserPreferences;
  // ...
}
```

### Generics

```typescript
interface ProfileProps<T extends User> {
  user: T;
  onUpdate: (user: T) => void;
  isEditing?: boolean;
}

function Profile<T extends User>({
  user,
  onUpdate,
  isEditing,
}: ProfileProps<T>) {
  // Type-safe component logic
}
```

### Generic Components

```typescript
function DataList<T>({ items, renderItem, keyExtractor }: DataListProps<T>) {
  // Reusable list component for any data type
}
```

## Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start development server:**

   ```bash
   npm run dev
   ```

3. **Build for production:**

   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

## Usage Examples

### Using the Profile Component

```typescript
import { Profile } from './components';
import { User } from './types/user';

const user: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  // ... other properties
};

function App() {
  return (
    <Profile
      user={user}
      onUpdate={(updatedUser) => console.log('User updated:', updatedUser)}
      isEditing={false}
    />
  );
}
```

### Using the Dashboard Component

```typescript
import { Dashboard } from './components';
import { DashboardItem } from './types/user';

const items: DashboardItem[] = [
  {
    id: '1',
    title: 'Total Users',
    type: 'metric',
    data: { value: 1234 }
  },
  // ... more items
];

function App() {
  return (
    <Dashboard
      items={items}
      onItemClick={(item) => console.log('Clicked:', item)}
      layout="grid"
    />
  );
}
```

### Using Generic Data Display

```typescript
import { DataList, KeyValueDisplay } from './components';

const users = [
  { id: 1, name: 'Alice', role: 'Admin' },
  { id: 2, name: 'Bob', role: 'User' }
];

function UserList() {
  return (
    <DataList
      items={users}
      renderItem={(user) => <div>{user.name} - {user.role}</div>}
      keyExtractor={(user) => user.id}
    />
  );
}
```

## Type Safety Benefits

- **Compile-time Error Detection**: Catch type mismatches during development
- **IntelliSense Support**: Better IDE autocompletion and refactoring
- **Runtime Safety**: Reduced bugs from type-related issues
- **Maintainability**: Easier to refactor and extend code
- **Documentation**: Types serve as living documentation

## Development

This project uses:

- **React 18** with hooks
- **TypeScript** for type safety
- **Vite** for fast development and building
- **ESLint** for code quality

## Troubleshooting

### Type Errors

If you encounter TypeScript errors:

1. Check that all required properties are provided
2. Ensure generic type constraints are satisfied
3. Verify interface implementations match expected shapes

### Build Issues

- Run `npm run build` to check for compilation errors
- Ensure all dependencies are installed with `npm install`
- Check TypeScript configuration in `tsconfig.json`

### Development Server

- The dev server runs on `http://localhost:5182` by default
- Hot module replacement is enabled for fast development
- Check the console for any runtime errors

## Contributing

When adding new components:

1. Define proper TypeScript interfaces in `src/types/`
2. Use generics where appropriate for reusability
3. Include proper prop types and default values
4. Add JSDoc comments for complex logic
5. Update the main export file `src/components/index.ts`
