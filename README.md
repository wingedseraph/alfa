# Alfa

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&labelColor=black&color=3178C6)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&labelColor=black&color=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&labelColor=black&color=646CFF)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwind-css&labelColor=black&color=38B2AC)
![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-EC5990?style=for-the-badge&logo=react-hook-form&labelColor=black&color=EC5990)
![Zod](https://img.shields.io/badge/Zod-3E63DD?style=for-the-badge&logo=zod&labelColor=black&color=3E63DD)
![React Router](https://img.shields.io/badge/React%20Router-CA4245?style=for-the-badge&logo=react-router&labelColor=black&color=CA4245)
![Zustand](https://img.shields.io/badge/Zustand-000000?style=for-the-badge&logo=zustand)

<img width="3770" height="2430" alt="image" src="https://github.com/user-attachments/assets/533dcca9-8b79-4855-9573-5ed41348a321" />

## Stack

- Vite
- React
- Typescript
- Zustand
- React Hook Form
- Zod

## Setup

### Prerequisites

- Node.js (>= 21.x)
- pnpm (recommended) or npm

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd alfa
```

2. Install dependencies:

```bash
pnpm install
# or
npm install
```

3. Start the development server:

```bash
pnpm dev
# or
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Build

Build for production:

```bash
pnpm build
# or
npm run build
```

Preview production build:

```bash
pnpm preview
# or
npm run preview
```

### Other Commands

```bash
pnpm lint          # Run ESLint
pnpm lint:fix      # Fix ESLint errors
pnpm typecheck     # Type check without emitting
```

## API

The application uses the [FakeStore API](https://fakestoreapi.com/) for initial product data.

### Base URL

```
https://fakestoreapi.com/products
```

### Project structure

- **components/** - Reusable UI components (buttons, cards, inputs, etc.)
- **pages/** - Route-level page components
- **store/** - Zustand store with slices for products, filters, and fetching
- **widgets/** - Feature-based composite components (layout, etc.)
- **config/** - App configuration and constants
- **schemas/** - Zod validation schemas

## Screenshots

### Product Listing

<img width="3770" height="2430" alt="image" src="https://github.com/user-attachments/assets/533dcca9-8b79-4855-9573-5ed41348a321" />

### Product Detail

<img width="3800" height="1992" alt="image" src="https://github.com/user-attachments/assets/3178cc78-4708-4af5-9000-4f2c537f4172" />

### Create/Edit Product

<img width="3770" height="2172" alt="image" src="https://github.com/user-attachments/assets/1ea95b3d-ceae-408e-bd89-f5da52058594" />

### Filter Product

<img width="3800" height="1992" alt="image" src="https://github.com/user-attachments/assets/7b131c5e-5fe0-4804-b8f7-48bd424465b1" />
<img width="3800" height="1992" alt="image" src="https://github.com/user-attachments/assets/6c3184fc-7f2c-4524-93ab-2146d85f38a5" />
<img width="3800" height="1992" alt="image" src="https://github.com/user-attachments/assets/330f77e2-be3a-4742-a266-b54dd323d514" />

### Delete Product

<img width="3770" height="2430" alt="image" src="https://github.com/user-attachments/assets/070f1f0a-9f8e-47ca-970f-7cf7a7aec83b" />
