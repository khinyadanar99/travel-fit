import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { WeatherProvider } from "./context/WeatherProvider.jsx";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<WeatherProvider>
				<App />
			</WeatherProvider>
		</LocalizationProvider>
  	</StrictMode>,
)



