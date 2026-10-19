
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { TextField } from "@mui/material";
import { useDebounce } from "use-debounce";
import { fetchLocation } from "../api/APIs.ts";
import type { TripLocation } from "../types/trip.ts";
import type { GeocodingLocation } from "../types/location.ts";

interface LocationSearchProps {
    setLocation: Dispatch<SetStateAction<TripLocation>>;
    locationError: string;
    setLocationError: Dispatch<SetStateAction<string>>;
}

export default function LocationSearch({
    setLocation,
    locationError,
    setLocationError,
    }: LocationSearchProps) {
        const [locationValue, setLocationValue] = useState("");
        const [results, setResults] = useState<GeocodingLocation[]>([]);
        const [loading, setLoading] = useState(false);
        const [showSuggestedLocation, setShowSuggestedLocation] = useState(false);

        const [debouncedValue] = useDebounce(locationValue, 500);

        async function handleSearchLocation(value: string): Promise<void> {
            setShowSuggestedLocation(true);
            setLocationError("");

            if (!value.trim()) {
                setResults([]);
                return;
            }

            try {
                setLoading(true);
                const data = await fetchLocation(value);
                setResults(data);
            } catch (error: unknown) {
                console.error(error);
                setResults([]);
            } finally {
                setLoading(false);
            }
        }

        useEffect(() => {
            if (debouncedValue) {
            void handleSearchLocation(debouncedValue);
            }
        }, [debouncedValue]);

        function handleSelectLocation(selectedLocation: GeocodingLocation): void {
            setLocation({
            name: selectedLocation.name,
            latitude: selectedLocation.latitude,
            longitude: selectedLocation.longitude,
            });
            setLocationValue(selectedLocation.name);
            setResults([]);
            setLocationError("");
            setShowSuggestedLocation(false);
        }

        return (
            <div className="relative flex flex-col flex-1">
                <TextField
                    label="I'm travelling to"
                    placeholder="Search a town or city"
                    variant="outlined"
                    value={locationValue}
                    onChange={(e) => setLocationValue(e.target.value)}
                    error={!!locationError}
                    helperText={locationError}
                />

                {showSuggestedLocation && locationValue.trim().length >= 1 && (
                    <div className="absolute left-0 top-[calc(100%+8px)] z-999 w-full rounded-2xl border border-gray-200 bg-white p-3 shadow-lg">
                        {loading && (
                            <div className="p-2 text-gray-500">Searching...</div>
                        )}

                        {!loading && results.length > 0 && results.map((location) => (
                            <button
                                key={location.id}
                                type="button"
                                onClick={() => handleSelectLocation(location)}
                                className="w-full rounded-lg p-3 text-left hover:bg-amber-100"
                            >
                                <p className="font-medium">{location.name}</p>
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
        );
    }