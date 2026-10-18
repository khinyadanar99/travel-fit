
import { useQuery } from "@tanstack/react-query";
import { fetchTripImage } from "../api/APIs";

export function useTripImage(location) {
  const city = location ?? "";

  return useQuery({
    queryKey: ["tripImage", city.toLowerCase()],
    queryFn: () => fetchTripImage(city),
    enabled: Boolean(city),
    staleTime: Infinity,
    gcTime: Infinity,
  });
}
