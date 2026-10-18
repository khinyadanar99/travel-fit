import { useContext, useState } from "react";
import dayjs from "dayjs";
import { WeatherContext } from "../context/WeatherProvider";
import LocationSearch from "./LocationSearch";
import DateTimeFields from "./DateTimeFields";
import { validateArrivalDate, validateDepartureDate, validateLocation } from "../utils/ValidateInput";

export default function TripForm() {

    const [location, setLocation] = useState({
                name: "",
                latitude: null,
                longitude: null,
            });

    const [arrival, setArrival] = useState(null);
    const [departure, setDeparture] = useState(dayjs().startOf("day"));

    const [locationError, setLocationError] = useState("");
    const [departureError, setDepartureError] = useState("");
    const [arrivalError, setArrivalError] = useState("");

    const {setTrip} = useContext(WeatherContext);

    async function handleSubmit(e) {
        e.preventDefault();

        const locationE = validateLocation(location);
        const departureE = validateDepartureDate(departure);
        const arrivalE = validateArrivalDate(arrival, departure)

        setLocationError(locationE);
        setDepartureError(departureE);
        setArrivalError(arrivalE);

        if(locationE || departureE || arrivalE) return; 

        setTrip((prev) => ({
            ...prev,
            location: {
                name: location.name,
                latitude: location.latitude,
                longitude: location.longitude,
            },
            start: departure,
            end: arrival,
        }));

    }

    return (
        <div className="relative z-999 glass px-5 py-8 my-5">

            <form className="flex flex-col lg:flex-row gap-3" onSubmit={handleSubmit}>
                
                <LocationSearch location={location} 
                setLocation={setLocation}
                locationError={locationError} 
                setLocationError={setLocationError}/>

                <DateTimeFields 
                departure={departure}
                setDeparture={setDeparture}
                arrival={arrival}
                setArrival={setArrival}
                arrivalError={arrivalError}
                departureError={departureError} />
                
                <button type="submit" className="w-full lg:w-auto cursor-pointer rounded-lg self-baseline py-4 bg-amber-700 px-7 text-white hover:bg-amber-800">
                    Search
                </button>
                
            </form>
        </div>
    );
}