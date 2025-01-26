# Frontend - Blogify

## Overview
This is the frontend of the Blogify application, built with [Next.js 15](https://nextjs.org/). It uses modern UI styling with ShadCN and Tailwind CSS and includes efficient state management and data fetching via React Query and Zustand.

## Features
- **Modern UI Frameworks**: ShadCN and Tailwind CSS for a responsive and visually appealing interface.
- **State Management**: Zustand for lightweight and flexible global state management.
- **Data Fetching**: React Query for efficient and cache-optimized server data fetching.
- **Routing**: Dynamic and optimized routing provided by Next.js.

## Tech Stack
- **Framework**: [Next.js 15](https://nextjs.org/)
- **Styling**: [ShadCN](https://shadcn.dev/) and [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Data Fetching**: [React Query](https://react-query.tanstack.com/)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/blogify-frontend.git
   cd blogify-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy the environment file:
   ```bash
   cp .env.example .env
   ```
   Configure the `.env` file with your specific values.

## Running the Application

### Development
To start the application in development mode:
```bash
npm run dev
```

### Production
To build and start the application in production mode:
```bash
npm run build
npm start
```

## Key Scripts
- **Start Development**:
  ```bash
  npm run dev
  ```
- **Build for Production**:
  ```bash
  npm run build
  ```
- **Start Production**:
  ```bash
  npm start
  ```
- **Lint**:
  ```bash
  npm run lint
  ```

## Environment Variables
Ensure the following environment variables are set in your `.env` file:

- `NEXT_PUBLIC_BASE_API_URL` - Backend API URL

## Styling with ShadCN and Tailwind CSS
The application uses Tailwind CSS for utility-first styling. ShadCN provides pre-designed components integrated with Tailwind for rapid UI development.

### Customization
To modify styles, edit the `tailwind.config.js` file or customize individual components in the `components/` directory.

## State Management
Zustand is used for managing global state efficiently. Global state files are located in the `src/store/` directory.

## Data Fetching
React Query handles all server-side data fetching and caching. Queries and mutations are defined in the `src/hooks/` directory for modular and reusable logic.

## Deployment
1. Build the application:
   ```bash
   npm run build
   ```
2. Deploy the `.next` build output to your hosting platform (e.g., Vercel, AWS, Netlify).

