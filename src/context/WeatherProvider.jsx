import { createContext, useState } from "react";

import {
    formatHourlyWeather,
    groupWeatherByDay,
    getDailyWeather,
    getTripSummary,
} from "../utils/WeatherFunction";

import { useTripWeather } from "../hooks/useTripWeather";

export const WeatherContext = createContext();

export function WeatherProvider({ children }) {

    const [trip, setTrip] = useState({
        location: {
            name: "",
            latitude: null,
            longitude: null,
        },

        start: null,
        end: null,
    });

    const { data: weatherData, isLoading, isError, error} = useTripWeather(trip.location, trip.start, trip.end);

    const hourlyWeather = weatherData
        ? formatHourlyWeather(weatherData)
        : [];

    const hourlyByDay = weatherData
        ? groupWeatherByDay(hourlyWeather)
        : {};

    const daySummary = weatherData
        ? getDailyWeather(weatherData.daily)
        : [];

    const tripSummaryData = weatherData
        ? getTripSummary(daySummary)
        : null;

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
                error
            }}
        >
            {children}

        </WeatherContext.Provider>
    );
}