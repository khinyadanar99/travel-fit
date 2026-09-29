import { useState } from "react";

const GEOCODING_API =
    "https://geocoding-api.open-meteo.com/v1/search";


export async function searchLocation(query) {
    const params = new URLSearchParams({
        name: query,
        count: "5",
        language: "en",
        format: "json"
    });

    const response = await fetch(
        `${GEOCODING_API}?${params}`
    );

    if (!response.ok) {
        throw new Error(
            "Unable to search for location"
        );
    }

    const data = await response.json();

    return data.results || [];
}


const WEATHER_API =
    "https://api.open-meteo.com/v1/forecast";


export async function getWeather(
    latitude,
    longitude
) {
    const params = new URLSearchParams({
        latitude: latitude.toString(),
        longitude: longitude.toString(),

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

        forecast_days: "16",
    });


    const response = await fetch(
        `${WEATHER_API}?${params}`
    );


    if (!response.ok) {
        throw new Error(
            "Unable to fetch weather data"
        );
    }


    const data = await response.json();

    return data;
}