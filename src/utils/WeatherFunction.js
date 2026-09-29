import dayjs from "dayjs";

import {
    faSun,
    faMoon,
    faCloud,
    faSmog,
    faCloudRain,
    faSnowflake,
    faCloudBolt,
} from "@fortawesome/free-solid-svg-icons";


// ========================================
// HOURLY WEATHER
// ========================================

export function formatHourlyWeather(weather) {
    const dailySunrise = {};
    const dailySunset = {};

    // Create a lookup:
    // "2026-09-09" -> sunrise/sunset for that day

    weather.daily.time.forEach((date, index) => {
        dailySunrise[date] = weather.daily.sunrise[index];
        dailySunset[date] = weather.daily.sunset[index];
    });


    return weather.hourly.time.map((time, index) => {

        const date = dayjs(time).format("YYYY-MM-DD");

        return {
            time,

            temperature:
                weather.hourly.temperature_2m[index],

            apparentTemperature:
                weather.hourly.apparent_temperature[index],

            precipitationProbability:
                weather.hourly.precipitation_probability[index],

            precipitation:
                weather.hourly.precipitation[index],

            weatherCode:
                weather.hourly.weather_code[index],

            windSpeed:
                weather.hourly.wind_speed_10m[index],

            // Add sunrise/sunset to hourly data
            sunrise: dailySunrise[date],
            sunset: dailySunset[date],
        };
    });
}


// ========================================
// FILTER HOURLY WEATHER FOR TRIP
// ========================================

export function getTripWeather(hourlyWeather, start, end) {
    const startDate = dayjs(start).startOf("day");
    const endDate = dayjs(end).endOf("day");

    return hourlyWeather.filter((hour) => {
        const hourTime = dayjs(hour.time);

        return (
            !hourTime.isBefore(startDate) &&
            !hourTime.isAfter(endDate)
        );
    });
}


// ========================================
// GROUP HOURLY WEATHER BY DAY
// ========================================

export function groupWeatherByDay(tripWeather) {
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


// ========================================
// DAILY WEATHER
// ========================================

export function getDailyWeather(dailyWeather, start, end) {
    const startDate = dayjs(start).format("YYYY-MM-DD");
    const endDate = dayjs(end).format("YYYY-MM-DD");

    return dailyWeather.time
        .map((date, index) => ({
            date,

            maxTemperature:
                dailyWeather.temperature_2m_max[index],

            minTemperature:
                dailyWeather.temperature_2m_min[index],

            feelsLikeMin:
                dailyWeather.apparent_temperature_min[index],

            feelsLikeMax:
                dailyWeather.apparent_temperature_max[index],

            rainProbability:
                dailyWeather.precipitation_probability_max
                    ? dailyWeather.precipitation_probability_max[index]
                    : null,

            totalPrecipitation:
                dailyWeather.precipitation_sum[index],

            maxWindSpeed:
                dailyWeather.wind_speed_10m_max[index],

            weatherCode:
                dailyWeather.weather_code[index],

            sunrise:
                dailyWeather.sunrise[index],

            sunset:
                dailyWeather.sunset[index],
        }))
        .filter((day) => {
            return (
                day.date >= startDate &&
                day.date <= endDate
            );
        });
}


// ========================================
// WHOLE TRIP SUMMARY
// ========================================

export function getTripSummary(daySummary) {
    if (!daySummary.length) {
        return null;
    }

    const minTemperature = Math.round(
        Math.min(
            ...daySummary.map(
                (day) => day.minTemperature
            )
        )
    );

    const maxTemperature = Math.round(
        Math.max(
            ...daySummary.map(
                (day) => day.maxTemperature
            )
        )
    );


    // Feels like

    const feelsLikeMin = Math.round(
        Math.min(
            ...daySummary.map(
                (day) => day.feelsLikeMin
            )
        )
    );

    const feelsLikeMax = Math.round(
        Math.max(
            ...daySummary.map(
                (day) => day.feelsLikeMax
            )
        )
    );


    // Rain probability

    const rainProbabilities = daySummary
        .map((day) => day.rainProbability)
        .filter((value) => value != null);

    const rainProbability =
        rainProbabilities.length > 0
            ? Math.round(
                  Math.max(...rainProbabilities)
              )
            : null;


    // Total precipitation

    const totalPrecipitation =
        daySummary.reduce(
            (total, day) =>
                total + day.totalPrecipitation,
            0
        );


    // Maximum wind speed

    const maxWindSpeed = Math.max(
        ...daySummary.map(
            (day) => day.maxWindSpeed
        )
    );


    return {
        minTemperature,
        maxTemperature,

        feelsLikeMin,
        feelsLikeMax,

        rainProbability,
        totalPrecipitation,

        maxWindSpeed,
    };
}


// ========================================
// WEATHER ICON
// ========================================

export function getWeatherIcon(
    weatherCode,
    time,
    sunrise,
    sunset
) {
    if (weatherCode === 0) {
        const currentTime = dayjs(time);

        const isDay =
            !currentTime.isBefore(
                dayjs(sunrise)
            ) &&
            currentTime.isBefore(
                dayjs(sunset)
            );

        return isDay ? faSun : faMoon;
    }

    if ([1, 2, 3].includes(weatherCode)) {
        return faCloud;
    }

    if ([45, 48].includes(weatherCode)) {
        return faSmog;
    }

    if (
        [51, 53, 55, 56, 57].includes(
            weatherCode
        )
    ) {
        return faCloudRain;
    }

    if (
        [61, 63, 65, 66, 67, 80, 81, 82].includes(
            weatherCode
        )
    ) {
        return faCloudRain;
    }

    if (
        [71, 73, 75, 77, 85, 86].includes(
            weatherCode
        )
    ) {
        return faSnowflake;
    }

    if ([95, 96, 99].includes(weatherCode)) {
        return faCloudBolt;
    }

    return faCloud;
}