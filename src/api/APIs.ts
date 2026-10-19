
import type { Dayjs } from "dayjs";
import type { OpenMeteoResponse } from "../types/weather";
import type { GeocodingLocation, UnsplashSearchResponse } from "../types/location";

const GEOCODING_API = "https://geocoding-api.open-meteo.com/v1/search";

const WEATHER_API = "https://api.open-meteo.com/v1/forecast";

export async function fetchLocation(query: string): Promise<GeocodingLocation[]> {
    const params = new URLSearchParams({
        name: query,
        count: "5",
        language: "en",
        format: "json",
    });

    const response = await fetch(`${GEOCODING_API}?${params}`);

    if (!response.ok) {
        throw new Error("Unable to search for location");
    }

    const data: { results?: GeocodingLocation[] } =
        await response.json();

    return data.results ?? [];
}

export async function fetchWeather(
    latitude: number,
    longitude: number,
    startDate: Dayjs,
    endDate: Dayjs,
): Promise<OpenMeteoResponse> {
    const params = new URLSearchParams({
        latitude: latitude.toString(),
        longitude: longitude.toString(),
        start_date: startDate.format("YYYY-MM-DD"),
        end_date: endDate.format("YYYY-MM-DD"),

        hourly: [
        "temperature_2m",
        "apparent_temperature",
        "precipitation_probability",
        "precipitation",
        "weather_code",
        "wind_speed_10m",
        ].join(","),
        daily: [
        "weather_code",
        "temperature_2m_max",
        "temperature_2m_min",
        "apparent_temperature_max",
        "apparent_temperature_min",
        "precipitation_probability_max",
        "precipitation_sum",
        "wind_speed_10m_max",
        "sunrise",
        "sunset",
        ].join(","),
        timezone: "auto",
    });

    const response = await fetch(`${WEATHER_API}?${params}`);

    if (!response.ok) {
        throw new Error("Unable to fetch weather data");
    }

    const data: OpenMeteoResponse = await response.json();

    return data;
}

export async function fetchTripImage(city: string): Promise<string | null> {
    const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

    if (!accessKey) {
        throw new Error("Unsplash API key is missing");
    }

    const url =`https://api.unsplash.com/search/photos?query=${encodeURIComponent(`${city} landmark`,)}&orientation=landscape&per_page=1`;

    const response = await fetch(url, {
        headers: {
        Accept: "application/json",
        Authorization: `Client-ID ${accessKey}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch destination image");
    }

    const result: UnsplashSearchResponse = await response.json();

    return result.results?.[0]?.urls?.raw ?? null;
}
