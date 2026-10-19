
import { useQuery } from "@tanstack/react-query";
import { fetchWeather } from "../api/APIs";
import type { TripLocation } from "../types/trip";
import type { Dayjs } from "dayjs";
import type { OpenMeteoResponse } from "../types/weather";

export function useTripWeather(
    location: TripLocation,
    startDate: Dayjs | null,
    endDate: Dayjs | null,
) {
    return useQuery<OpenMeteoResponse, Error>({
        queryKey: [
            "tripWeather",
            location.latitude,
            location.longitude,
            startDate?.format("YYYY-MM-DD") ?? null,
            endDate?.format("YYYY-MM-DD") ?? null,
        ],
        queryFn: () => {
            if (
                location.latitude === null ||
                location.longitude === null ||
                !startDate ||
                !endDate
            ) {
                throw new Error("Location and trip dates are required");
            }

            return fetchWeather(
                location.latitude,
                location.longitude,
                startDate,
                endDate,
            );
        },
        enabled:
            location.latitude !== null &&
            location.longitude !== null &&
            Boolean(startDate && endDate),

        staleTime: Infinity,

        gcTime: Infinity,
    });
}
