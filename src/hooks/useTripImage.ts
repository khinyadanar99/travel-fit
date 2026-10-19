
import { useQuery } from "@tanstack/react-query";
import { fetchTripImage } from "../api/APIs.ts";

export function useTripImage(location: string | null | undefined) {
  const city = location ?? "";

  return useQuery({
    queryKey: ["tripImage", city.toLowerCase()],
    queryFn: () => fetchTripImage(city),
    enabled: Boolean(city),
    staleTime: Infinity,
    gcTime: Infinity,
  });
}
