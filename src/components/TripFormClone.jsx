import { useContext, useState } from "react";
import { getWeather, searchLocation } from "../api/WeatherAPI";
import { DesktopDateTimePicker } from "@mui/x-date-pickers/DesktopDateTimePicker";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { TextField } from "@mui/material";
import { WeatherContext } from "../context/WeatherProvider";

export default function TripForm() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showSuggestedLocation, setShowSuggestedLocation] = useState(false);

    const [arrival, setArrival] = useState(null);
    const [departure, setDeparture] = useState(dayjs());

    const [locationError, setLocationError] = useState("");
    const [departureError, setDepartureError] = useState("");
    const [arrivalError, setArrivalError] = useState("");

    const {trip, setTrip, setWeather} = useContext(WeatherContext)


    async function handleSearchLocation(value) {
        setQuery(value);
        setShowSuggestedLocation(true);

        setTrip((prev) => ({
            ...prev,
            location: {
                name: "",
                latitude: null,
                longitude: null,
            },
        }));

        if (!value.trim()) {
            setResults([]);
            return;
        }

        try {
            setLoading(true);
            const data = await searchLocation(value);
            setResults(data);
        } catch (error) {
            console.error(error);
            setResults([]);
        } finally {
            setLoading(false);
        }
    }

    function handleSelectLocation(location) {
        setQuery(location.name);
        setResults([]);
        setLocationError("");
        setShowSuggestedLocation(false);

        setTrip((prev) => ({
            ...prev,
            location: {
                name: location.name,
                latitude: location.latitude,
                longitude: location.longitude,
            },
        }));
    }

    function formatHourlyWeather(weather) {
        return weather.hourly.time.map((time, index) => ({
            time,
            temperature: weather.hourly.temperature_2m[index],
            apparentTemperature: weather.hourly.apparent_temperature[index],
            precipitationProbability:
                weather.hourly.precipitation_probability[index],
            precipitation: weather.hourly.precipitation[index],
            weatherCode: weather.hourly.weather_code[index],
            windSpeed: weather.hourly.wind_speed_10m[index],
        }));
    }

    function getTripWeather(hourlyWeather, start, end) {
        return hourlyWeather.filter((hour) => {
            const hourTime = dayjs(hour.time);

            return (
                !hourTime.isBefore(start) &&
                !hourTime.isAfter(end)
            );
        });
    }

    function groupWeatherByDay(tripWeather) {
        const days = {};

        tripWeather.forEach((hour) => {
            const date = dayjs(hour.time).format("YYYY-MM-DD");

            if (!days[date]) {
                days[date] = [];
            }

            days[date].push(hour);
        });

        return days;
    }

    function getDailyWeather(dailyWeather) {
        return Object.entries(dailyWeather).map(([date, hours]) => {
            const temperatures = hours.map((hour) => hour.temperature);

            const apparentTemperatures = hours.map(
                (hour) => hour.apparentTemperature
            );

            const rainProbabilities = hours.map(
                (hour) => hour.precipitationProbability
            );

            const precipitation = hours.map(
                (hour) => hour.precipitation
            );

            return {
                date,
                minTemperature: Math.min(...temperatures),
                maxTemperature: Math.max(...temperatures),

                feelsLikeMin: Math.min(...apparentTemperatures),
                feelsLikeMax: Math.max(...apparentTemperatures),

                rainProbability: Math.max(...rainProbabilities),
                totalPrecipitation: precipitation.reduce(
                    (total, value) => total + value,
                    0
                ),
            };
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const today = dayjs();
        const maxForecastDate = today.add(16, "day");

        setDepartureError("");
        setArrivalError("");

        console.log("Trip Locaiton:" + trip.location.name)

        if (results.length === 0 && !trip.location.name) {
            setLocationError("Please type a valid location.");
            return;
        }

        if (!trip.location.name) {
            setLocationError("Please select a valid location from the suggestions.");
            return;
        }

        if (!departure) {
            setDepartureError("Please select a departure date.");
            return;
        }

        if (departure.isBefore(today)) {
            setDepartureError("Departure cannot be in the past.");
            return;
        }

        if (!arrival) {
            setArrivalError("Please select an arrival date.");
            return;
        }

        if (arrival.isBefore(departure)) {
            setArrivalError("Arrival cannot be earlier than departure.");
            return;
        }

        if (departure.isAfter(maxForecastDate)) {
            setDepartureError("Departure is too far in the future.");
            return;
        }

        if (arrival.isAfter(maxForecastDate)) {
            setArrivalError("Arrival is too far in the future.");
            return;
        }

        setTrip((prev) => ({
            ...prev,
            start: departure,
            end: arrival,
        }));

        const weatherData = await getWeather(
            trip.location.latitude,
            trip.location.longitude
        );

        

        const hourlyWeather = formatHourlyWeather(weatherData);

        const tripWeather = getTripWeather(
            hourlyWeather,
            departure,
            arrival
        );

        const dailyWeather = groupWeatherByDay(tripWeather);

        const dailySummary = getDailyWeather(dailyWeather);

        console.log("Hourly weather:", hourlyWeather);
        console.log("Trip weather:", tripWeather);
        console.log("Daily weather:", dailyWeather);
        console.log("Daily summary:", dailySummary);

        setWeather(weatherData);
    }

    

    // console.log(trip)


    return (
        <div className="mb-5">
            <p className="mb-2">Weather for anywhere in the UK</p>

            <form className="flex gap-3" onSubmit={handleSubmit}>
                
                <div className="relative flex flex-col flex-1">
                    

                    <TextField label="I'm travelling to"
                        placeholder="Search a town or city"
                        variant="outlined" 
                        value={query}
                        onChange={(e) => {handleSearchLocation(e.target.value)}}
                        error={!!locationError}
                        helperText={locationError}
                    />

                    {showSuggestedLocation && query.trim().length >= 1 && (
                        <div className="absolute left-0 top-[calc(100%+8px)] z-10 w-full rounded-2xl border border-gray-200 bg-white p-3 shadow-lg">

                        {loading && (
                            <div className="p-2 text-gray-500">
                                Searching...
                            </div>
                        )}

                        {!loading && results.length > 0 && 
                            results.map((location) => (
                                <button
                                    key={location.id}
                                    type="button"
                                    onClick={() =>
                                        handleSelectLocation(location)
                                    }
                                    className="w-full rounded-lg p-3 text-left hover:bg-amber-100"
                                >
                                    <p className="font-medium">
                                        {location.name}
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        {location.admin1}
                                        {location.admin1 && ", "}
                                        {location.country}
                                    </p>
                                </button>
                        ))}

                        {!loading && results.length === 0 && (
                            <div className="p-2 text-gray-500">
                                No UK locations found.
                            </div>
                        )}
                        </div>
                    )}

                </div>
                
            
                <DesktopDateTimePicker label="Departure Date/Time" value={departure}
                    onChange={setDeparture}
                    slotProps={{
                        textField: {
                            error: Boolean(departureError),
                            helperText: departureError,
                        },
                    }} 
                    minDateTime={dayjs()} />

            
                <DesktopDateTimePicker label="Arrival Date/Time" value={arrival}
                    onChange={setArrival}
                    slotProps={{
                        textField: {
                            error: Boolean(arrivalError),
                            helperText: arrivalError,
                        },
                    }} 
                    minDateTime={dayjs()}/>
                
                <button type="submit" className="rounded-lg bg-amber-700 px-7 text-white hover:bg-amber-800">
                    Search
                </button>

                
            </form>
        </div>
    );
}