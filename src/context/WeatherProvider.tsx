import {
	createContext,
	useState,
	type Dispatch,
	type ReactNode,
	type SetStateAction,
} from "react";

import {
	formatHourlyWeather,
	groupWeatherByDay,
	getDailyWeather,
	getTripSummary,
} from "../utils/WeatherFunction.ts";

import { useTripWeather } from "../hooks/useTripWeather.ts";
import type { Trip } from "../types/trip";

type WeatherQuery = ReturnType<typeof useTripWeather>;
type WeatherData = WeatherQuery["data"];

interface WeatherContextValue {
	trip: Trip;
	setTrip: Dispatch<SetStateAction<Trip>>;
	weatherData: WeatherData;
	hourlyByDay: ReturnType<typeof groupWeatherByDay>;
	daySummary: ReturnType<typeof getDailyWeather>;
	tripSummaryData: ReturnType<typeof getTripSummary> | null;
	isLoading: boolean;
	isError: boolean;
	error: Error | null;
}

interface WeatherProviderProps {
  	children: ReactNode;
}

export const WeatherContext = createContext<WeatherContextValue | undefined>(undefined);

export function WeatherProvider({ children }: WeatherProviderProps) {
	const [trip, setTrip] = useState<Trip>({
		location: {
		name: "",
		latitude: null,
		longitude: null,
		},
		start: null,
		end: null,
	});

	const {
		data: weatherData,
		isLoading,
		isError,
		error,
	} = useTripWeather(trip.location, trip.start, trip.end);

	const hourlyWeather = weatherData ? formatHourlyWeather(weatherData) : [];

	const hourlyByDay = weatherData ? groupWeatherByDay(hourlyWeather) : {};

	const daySummary = weatherData ? getDailyWeather(weatherData.daily) : [];

	const tripSummaryData = weatherData ? getTripSummary(daySummary) : null;

	return (
		<WeatherContext.Provider
		value={{
			trip,
			setTrip,
			weatherData,
			hourlyByDay,
			daySummary,
			tripSummaryData,
			isLoading,
			isError,
			error: error ?? null,
		}}
		>
		{children}
		</WeatherContext.Provider>
	);
}
