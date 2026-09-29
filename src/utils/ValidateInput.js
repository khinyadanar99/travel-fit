import dayjs from "dayjs";

export function validateLocation(location) {

    if (!location.name) {
        return "Please type a valid location.";
    }

    return "";

}

export function validateDepartureDate(departure) {
    const today = dayjs().startOf("day");
    const maxForecastDate = today.add(16, "day");

    if (!departure) {
        return "Please select a departure date.";
    }

    if (departure.isBefore(today)) {
        return "Departure cannot be in the past.";
    }

    if (departure.isAfter(maxForecastDate)) {
        return "Departure is too far in the future.";
    }

    return "";
}

export function validateArrivalDate(arrival, departure) {
    const today = dayjs().startOf("day");
    const maxForecastDate = today.add(16, "day");

    if (!arrival) {
        return "Please select an arrival date.";
    }

    if (arrival.isBefore(departure)) {
        return "Arrival cannot be earlier than departure.";
    }

    if (arrival.isAfter(maxForecastDate)) {
        return "Arrival is too far in the future.";
    }

    return "";
}