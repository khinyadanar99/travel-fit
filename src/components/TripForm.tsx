
import { useContext, useState } from "react";
import dayjs, { type Dayjs } from "dayjs";
import { WeatherContext } from "../context/WeatherProvider.tsx";
import LocationSearch from "./LocationSearch.tsx";
import DateTimeFields from "./DateTimeFields.tsx";
import {
    validateArrivalDate,
    validateDepartureDate,
    validateLocation,
} from "../utils/ValidateInput.ts";

import type { TripLocation } from "../types/trip";

export default function TripForm() {
    const [location, setLocation] = useState<TripLocation>({
        name: "",
        latitude: null,
        longitude: null,
    });

    const [arrival, setArrival] = useState<Dayjs | null>(null);
    const [departure, setDeparture] = useState<Dayjs | null>(
        dayjs().startOf("day")
    );

    const [locationError, setLocationError] = useState("");
    const [departureError, setDepartureError] = useState("");
    const [arrivalError, setArrivalError] = useState("");

    const weatherContext = useContext(WeatherContext);

    if (!weatherContext) {
        throw new Error("TripForm must be used within WeatherProvider");
    }

    const { setTrip } = weatherContext;

    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        const locationE = validateLocation(location);
        const departureE = validateDepartureDate(departure);
        const arrivalE = validateArrivalDate(arrival, departure);

        setLocationError(locationE);
        setDepartureError(departureE);
        setArrivalError(arrivalE);

        if (locationE || departureE || arrivalE) return;

        setTrip((prev) => ({
            ...prev,
            location,
            start: departure,
            end: arrival,
        }));
    }

    return (
    <div className="relative z-999 glass px-5 py-8 my-5">
        <form className="flex flex-col lg:flex-row gap-3" onSubmit={handleSubmit}>
            <LocationSearch
                setLocation={setLocation}
                locationError={locationError}
                setLocationError={setLocationError}
            />

            <DateTimeFields
                departure={departure}
                setDeparture={setDeparture}
                arrival={arrival}
                setArrival={setArrival}
                arrivalError={arrivalError}
                departureError={departureError}
            />

            <button
                type="submit"
                className="w-full lg:w-auto cursor-pointer rounded-lg self-baseline py-4 bg-amber-700 px-7 text-white hover:bg-amber-800"
            >
                Search
            </button>
        </form>
    </div>
  );
}
