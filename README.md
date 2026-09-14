# 🚗 Rental Car App

A modern car rental web application built with **Next.js**, **TypeScript**, and **TanStack Query**.

The project was developed as a frontend test task for a car rental service. It provides users with the ability to browse available vehicles, filter the catalog, load additional cars, view detailed vehicle information, and submit a rental request.

## 🔗 Links

* **Live Demo:** [Rental Car App](https://rental-car-app-lts9.vercel.app/)
* **Backend API:** [Car Rental API Documentation](https://car-rental-api.goit.study/api-docs/)
* **Design:** [Figma](https://www.figma.com/design/A25LdVK3gZOPJaedrkTwWQ/Rental-Car)

## ✨ Features

* 🏠 Landing page with a hero section and call-to-action
* 🚘 Car catalog with data fetched from the backend API
* 🔎 Server-side filtering by:

  * car brand
  * rental price
  * mileage range
* ➕ `Load More` pagination using `useInfiniteQuery`
* 📄 Dedicated car details page
* 🔗 Car details open in a new browser tab
* 📸 Car images and detailed vehicle information
* 📝 Rental request form
* ✅ Successful rental notification
* ⏳ Loading states for asynchronous operations
* ❌ Error and empty states
* 📱 Responsive layout
* 🎨 UI implemented according to the provided Figma design

## 🛠️ Tech Stack

### Core

* **Next.js**
* **React**
* **TypeScript**
* **Next.js App Router**

### Data Fetching & State Management

* **TanStack Query**
* **Axios**

### Styling

* **CSS Modules**
* **React Icons**

### Development Tools

* **ESLint**
* **Prettier**
* **npm**

## 📋 Requirements

Before running the project locally, make sure you have:

* **Node.js** 18+ recommended
* **npm**

Check your installed versions:

```bash
node -v
npm -v
```

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/TetiCaceres/rental-car-app.git
cd RENTAL-CAR-APP
```

### 2. Install dependencies

```bash
npm install
```


### 3. Start the development server

```bash
npm run dev
```

Open the application in your browser:

```text
http://localhost:3000
```

## 🏭 Production Build

Create an optimized production build:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

## 📄 Application Pages

The application consists of three main pages.

### 🏠 Home — `/`

The landing page contains a hero section with the main call-to-action.

The **View Catalog** button navigates the user to the car catalog.

### 🚘 Catalog — `/catalog`

The catalog page displays available vehicles retrieved from the backend API.

Users can filter cars by:

* **Brand** — single selection
* **Price** — single selection
* **Mileage** — minimum and maximum values

Filtering is performed on the **backend**, as required by the task specification.

#### Load More Pagination

The catalog uses TanStack Query's `useInfiniteQuery` for pagination.

When the user clicks **Load More**, the next page of cars is fetched while preserving the currently selected filters.

```text
Filters
   │
   ▼
Backend API
   │
   ▼
useInfiniteQuery
   │
   ▼
Cars List
   │
   └── Load More → next page
```

### 🚗 Car Details — `/catalog/[carId]`

The dynamic route displays detailed information about the selected vehicle.

Each car can be opened using the **Read more** button, which opens the details page in a new browser tab.

The page includes:

* car image
* vehicle information
* technical details
* rental price
* rental form

After successfully submitting the rental form, the user receives a success notification.

## 🔄 API Integration

Communication with the backend API is separated from UI components.

```text
components
     │
     ▼
TanStack Query
     │
     ▼
lib/api
     │
     ▼
Axios
     │
     ▼
Car Rental API
```

### API Layer

API-related functionality is located in:

```text
lib/
└── api/
    ├── axiosInstance.ts
    ├── cars.ts
    └── rental.ts
```

* `axiosInstance.ts` — shared Axios configuration
* `cars.ts` — requests related to car catalog and car details
* `rental.ts` — rental request API functionality

This separation keeps HTTP communication independent from presentation components.

## 🧩 Project Structure

```text
RENTAL-CAR-APP/
│
├── app/
│   ├── catalog/
│   │   ├── [carId]/
│   │   │   ├── CarDetails.client.tsx
│   │   │   ├── CarDetails.module.css
│   │   │   ├── error.tsx
│   │   │   └── page.tsx
│   │   │
│   │   ├── Catalog.client.tsx
│   │   ├── catalog.module.css
│   │   └── page.tsx
│   │
│   ├── globals.css
│   ├── layout.tsx
│   ├── loading.tsx
│   ├── not-found.tsx
│   └── page.tsx
│
├── components/
│   ├── CarsList/
│   ├── CatalogLoadingOverlay/
│   ├── CustomSelect/
│   ├── Filters/
│   ├── Header/
│   ├── NotFoundCars/
│   ├── RentalForm/
│   └── TanStackProvider/
│
├── lib/
│   ├── api/
│   │   ├── axiosInstance.ts
│   │   ├── cars.ts
│   │   └── rental.ts
│   │
│   └── constans.ts
│
├── public/
│   ├── images/
│   │   ├── hero/
│   │   └── not-found-car.svg
│   └── logo.svg
│
├── types/
│   └── car.ts
│
├── .gitignore
├── .prettierrc
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── package-lock.json
└── tsconfig.json
```

## 🏗️ Architecture

The application uses the **Next.js App Router** and separates routing, UI components, API communication, and TypeScript types.

### App Router

Routes are organized inside the `app` directory:

```text
app/
├── page.tsx
├── catalog/
│   ├── page.tsx
│   └── [carId]/
│       └── page.tsx
```

This results in the following routes:

```text
/
/catalog
/catalog/[carId]
```

### Components

Reusable UI elements are extracted into the `components` directory.

For example:

```text
components/
├── CarsList/
├── Filters/
├── RentalForm/
├── Header/
└── CustomSelect/
```

This keeps page-level components focused on application logic while reusable UI functionality remains isolated.

### Server & Client Components

The project takes advantage of the Next.js App Router architecture and uses Client Components only where client-side interaction or state management is required.

Examples include:

* catalog filtering
* TanStack Query
* rental form interactions
* interactive UI components

## ⏳ Loading & Error States

The application provides dedicated states for asynchronous operations and invalid routes.

### Global loading state

```text
app/loading.tsx
```

### Catalog loading state

```text
components/CatalogLoadingOverlay/
```

### Car details error state

```text
app/catalog/[carId]/error.tsx
```

### Not found state

```text
app/not-found.tsx
components/NotFoundCars/
```

These states provide visual feedback while data is being loaded or when requested content is unavailable.

## 🎨 Design

The UI was implemented according to the provided Figma design.

The project uses **CSS Modules** to keep component styles isolated:

```text
Component/
├── Component.tsx
└── Component.module.css
```

This approach prevents style collisions and keeps component-specific styles close to the component itself.

## 🧪 Code Quality

The project uses ESLint and Prettier to maintain code quality and consistent formatting.

Run ESLint:

```bash
npm run lint
```

Format the code:

```bash
npm run format
```

> The exact formatting command depends on the scripts configured in `package.json`.

## 🌐 Deployment

The application is designed to be deployed on **Vercel** or **Netlify**.

For Next.js projects, Vercel provides a straightforward deployment workflow.

### Deployment steps

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Configure required environment variables.
4. Deploy the application.

After deployment, verify that all application routes work correctly:

```text
/
/catalog
/catalog/[carId]
```

## 📌 Requirements Checklist

The project implements the main requirements of the test task:

* [x] Next.js
* [x] TypeScript
* [x] Next.js App Router
* [x] Home page
* [x] Car catalog
* [x] Backend filtering
* [x] Brand filtering
* [x] Price filtering
* [x] Mileage filtering
* [x] `Load More` pagination
* [x] TanStack Query `useInfiniteQuery`
* [x] Car details page
* [x] Opening car details in a new tab
* [x] Rental form
* [x] Rental API integration
* [x] Successful rental notification
* [x] Loading states
* [x] Error states
* [x] Figma-based UI
* [x] Deployment-ready Next.js application


