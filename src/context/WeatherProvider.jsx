import { createContext, useState } from "react";

import {
    formatHourlyWeather,
    getTripWeather,
    groupWeatherByDay,
    getDailyWeather,
    getTripSummary,
} from "../utils/WeatherFunction";

import { getWeather } from "../api/WeatherAPI";


export const WeatherContext = createContext();


export function WeatherProvider({ children }) {

	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

    const [trip, setTrip] = useState({
        location: {
            name: "",
            latitude: null,
            longitude: null,
        },

        start: null,
        end: null,
    });


    const [weather, setWeather] = useState(null);

    const [tripHourlyWeather, setTripHourlyWeather] =
        useState([]);

    const [hourlyWeatherByDay, setHourlyWeatherByDay] = useState({});

    const [dailyWeather, setDailyWeather] = useState([]);

    const [tripSummary, setTripSummary] = useState(null);

    async function fetchTripWeather(
        location,
        start,
        end
    ) {

		setIsLoading(true);
	
		try {
				const weatherData = await getWeather(
				location.latitude,
				location.longitude
			)

			const hourlyWeather =
				formatHourlyWeather(weatherData);


			const tripWeather =
				getTripWeather(
					hourlyWeather,
					start,
					end
				);


			const hourlyByDay =
				groupWeatherByDay(
					tripWeather
				);

			const daySummary =
				getDailyWeather(
					weatherData.daily,
					start,
					end
				);

			const tripSummaryData =
				getTripSummary(
					daySummary
				);


			setWeather(weatherData);

			setTripHourlyWeather(
				tripWeather
			);

			setHourlyWeatherByDay(
				hourlyByDay
			);

			setDailyWeather(
				daySummary
			);

			setTripSummary(
				tripSummaryData
			);

		}catch (error) {
			console.error("Failed to fetch weather:", error);
			setIsError(true);
		} finally {
			setIsLoading(false);
		}


        // console.log(
        //     "Hourly weather:",
        //     hourlyWeather
        // );

        // console.log(
        //     "Trip hourly weather:",
        //     tripWeather
        // );

        // console.log(
        //     "Hourly weather by day:",
        //     hourlyByDay
        // );

        // console.log(
        //     "Daily weather:",
        //     daySummary
        // );

        // console.log(
        //     "Trip summary:",
        //     tripSummaryData
        // );
    }


    return (
        <WeatherContext.Provider
            value={{
                trip,
                setTrip,

                weather,

                tripHourlyWeather,

                hourlyWeatherByDay,

                dailyWeather,

                tripSummary,

                fetchTripWeather,

				isLoading, 
				isError
            }}
        >
            {children}
        </WeatherContext.Provider>
    );
}