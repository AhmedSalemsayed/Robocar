# RoboCar

**RoboCar** is a car maintenance tracking application built with **Next.js 15**. It allows users to manage multiple vehicles, track maintenance history for specific components (like brake pads, engine oil, etc.), and receive alerts for upcoming or missed maintenance.



## Tech Stack

-   **Framework**: Next.js 15 (App Router)
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS + Shadcn/UI (Radix UI) + Framer Motion
-   **Backend/Database**: Supabase (PostgreSQL)
-   **Authentication**: Clerk
-   **Form Handling**: React Hook Form + Zod
-   **Visualization**: Chart.js / React Chartjs 2

## Project Structure

The project follows the standard Next.js App Router structure:

-   `app/`: Contains the application routes.
    -   `(Auth)`: Authentication routes (sign-in/up).
    -   `(Root)`: Main application layout and pages.
        -   `page.tsx`: The **Dashboard**, showing upcoming/missed maintenance and charts.
        -   `cars/`:
            -   `page.tsx`: **My Cars** list.
            -   `[carId]/page.tsx`: **Car Details** view with maintenance history.
-   `components/`: Reusable UI components (e.g., `CarCard`, `BarChart`, `AddNewCar`).
-   `lib/`:
    -   `serverUtils.ts`: Crucial server-side logic for adding cars, updating maintenance logs, and handling database interactions.
    -   `zodSchemas.ts`: Validation schemas for forms.
-   `utils/`:
    -   `supabase/`: Supabase client initialization (Client and Server).
-   `middleware.ts`: Clerk authentication middleware protecting the `/` and `/cars` routes.

## Data Model

The core entity is the **Car**, stored in the `cars` table in Supabase.

**Key fields:**
-   `carId`: Unique identifier (UUID).
-   `brand`, `model`, `year`, `color`: Basic info.
-   `currentKilometrage`: Mileage tracker.
-   `carImage`: URL to the image stored in Supabase Storage.
-   `Maintenance`: A **JSON** column containing an array of maintenance items.
    -   Each item (e.g., "Brake Pads") has:
        -   `changeEvery`: Interval in km.
        -   `historyLog`: Array of past maintenance records.
        -   `currentKilometrage`: Mileage at last check.

## Key Features

1.  **Dashboard**:
    -   Calculates "Upcoming" (due in < 1000km) and "Missed" (overdue) maintenance dynamically from the car list.
    -   Visualizes data using charts.
2.  **Car Management**:
    -   Users can add cars with images (uploaded to Supabase Storage).
    -   Cars are initialized with a standard set of maintenance items (defined in `serverUtils.ts`).
3.  **Maintenance Tracking**:
    -   Users can log new maintenance events.
    -   The system updates the `historyLog` and recalculates due dates based on `kilometrageNextMaintenance`.

## Important Files

-   **`lib/serverUtils.ts`**: This file contains the "business logic". It handles complex operations like initializing the default maintenance list for a new car and updating nested JSON arrays for maintenance logs.
-   **`middleware.ts`**: Ensures that only authenticated users can access the dashboard and car data.
