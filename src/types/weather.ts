import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface OpenMeteoHourlyResponse {
  time: string[];
  temperature_2m: number[];
  apparent_temperature: number[];
  precipitation_probability: (number | null)[];
  precipitation: number[];
  weather_code: number[];
  wind_speed_10m: number[];
}

export interface OpenMeteoDailyResponse {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  apparent_temperature_min: number[];
  apparent_temperature_max: number[];
  precipitation_probability_max?: (number | null)[];
  precipitation_sum: number[];
  wind_speed_10m_max: number[];
  weather_code: number[];
  sunrise: string[];
  sunset: string[];
}

export interface OpenMeteoResponse {
  hourly: OpenMeteoHourlyResponse;
  daily: OpenMeteoDailyResponse;
}

export interface HourlyWeather {
  time: string;
  temperature: number;
  apparentTemperature: number;
  precipitationProbability: number | null;
  precipitation: number;
  weatherCode: number;
  windSpeed: number;
  sunrise: string | undefined;
  sunset: string | undefined;
}

export interface DailyWeather {
  date: string;
  maxTemperature: number;
  minTemperature: number;
  feelsLikeMin: number;
  feelsLikeMax: number;
  rainProbability: number | null;
  totalPrecipitation: number;
  maxWindSpeed: number;
  weatherCode: number;
  sunrise: string;
  sunset: string;
}

export type HourlyByDay = Record<string, HourlyWeather[]>;

export interface TripSummary {
  minTemperature: number;
  maxTemperature: number;
  feelsLikeMin: number;
  feelsLikeMax: number;
  rainProbability: number | null;
  totalPrecipitation: number;
  maxWindSpeed: number;
}

export type WeatherIcon = IconDefinition;
