# Express API Using TypeScript

A Node.js + Express API built with TypeScript that provides type-safe endpoints for managing employees data.

## Features

- Type-safe endpoints using TypeScript
- CRUD operations for employees
- Express.js framework
- MongoDB-backed schema with Mongoose

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

Make sure MongoDB is running locally or provide `MONGODB_URI` in your environment.

### Development

```bash
npm run dev
```

### Production

```bash
npm run build
npm start
```

## API Endpoints

- `GET /employees` - Get all employees
- `GET /employees/:id` - Get employee by ID
- `POST /employees` - Create a new employee
- `PUT /employees/:id` - Update an employee
- `DELETE /employees/:id` - Delete an employee

## Employee Schema

```typescript
interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
}
```
