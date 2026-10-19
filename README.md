# TravelFit — Weather-Based Outfit Planner

## About the Project
TravelFit is a personal project I created to solve a problem I often experience: deciding what to wear based on the weather when travelling or going out. I wanted to build an app that combines weather forecasts with practical outfit recommendations, helping people plan what to wear more easily and confidently.

TravelFit allows users to search for a location, select a date, view the weather forecast, and receive clothing recommendations based on temperature and weather conditions.

At this stage, the recommendation rules reflect my own preferences for what to wear at different temperatures. The project provides a foundation for introducing more flexible, user-specific preferences in the future.

## Live Demo
- Live Application: [https://travel-fit-two.vercel.app](https://travel-fit-two.vercel.app)
- GitHub Repository: [https://github.com/khinyadanar99/travel-fit](https://github.com/khinyadanar99/travel-fit)

## Tech Stack
- React and TypeScript — building reusable UI components and improving type safety.
- Vite — development and production builds.
- Tailwind CSS and Material UI — responsive styling and date selection.
- TanStack Query — managing API requests and caching.
- Day.js — date manipulation and formatting.
- use-debounce - Debounced location search
- Open-Meteo API — location search and weather forecasts.
- Unsplash API — destination imagery.
- Font Awesome — weather icons.
- Vercel - Hosting and automated deployments.

## Getting Started

### Prerequisites

- Node.js

- npm

- An Unsplash API access key for destination images

### 1. Clone the repository

```bash
git clone https://github.com/khinyadanar99/travel-fit.git
cd travel-fit
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a .env file in the project root:

```ini
VITE_UNSPLASH_ACCESS_KEY=your_unsplash_access_key
```

Replace the placeholder with your own Unsplash access key.

### 4. Run the development server

```bash
npm run dev
```

Open the local URL displayed in your terminal.

### 5. Run the TypeScript check

```bash
npx tsc -p tsconfig.app.json
```

### 6. Build for production

```bash
npm run build
```

### 7. Preview the production build

```bash
npm run preview
```