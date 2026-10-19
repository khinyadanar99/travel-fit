import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WeatherProvider } from './context/WeatherProvider.tsx';

const queryClient = new QueryClient();

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element #root was not found');
}

createRoot(rootElement).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <WeatherProvider>
                <App />
            </WeatherProvider>
        </QueryClientProvider>
    </StrictMode>,
)



