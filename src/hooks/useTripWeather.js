import { useQuery } from "@tanstack/react-query"
import { fetchWeather } from "../api/APIs";

export function useTripWeather(
    location,
    startDate,
    endDate
) {
    return useQuery({
        queryKey: [
            "tripWeather",
            location?.latitude,
            location?.longitude,
            startDate,
            endDate,
        ],
        queryFn: () =>
            fetchWeather(
                location.latitude,
                location.longitude,
                startDate,
                endDate
            ),
        enabled: Boolean(location && startDate && endDate),

        // Keep cached data fresh for the lifetime of the page
        staleTime: Infinity,

        // Keep inactive cached data until the page is refreshed
        gcTime: Infinity,
    });
}