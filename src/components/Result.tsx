import { useContext } from "react";

import { WeatherContext } from "../context/WeatherProvider.tsx";
import HourlyForecast from "./HourlyForecast.tsx";
import TripSummaryCard from "./TripSummaryCard.tsx";

function Result() {

	const context = useContext(WeatherContext);

	if (!context) return;

  	const { trip, isLoading, isError } = context;

	if (!trip.location.name || !trip.start || !trip.end) {
		return (
		<div className="max-w-4xl items-center">
			<p>Enter your trip above.</p>
		</div>
		);
	}
	if (isLoading) {
		return (
			<div className="rounded-2xl bg-white p-8 text-center">
				<p className="font-semibold">
					Getting your weather forecast...
				</p>
				<p className="mt-1 text-sm text-gray-500">
					Checking the weather for your trip.
				</p>
			</div>
		);
	}

	if (isError) {
		return (
			<div className="rounded-2xl bg-white p-8 text-center">
				<p className="font-semibold">
					We couldn't get the weather forecast.
				</p>
				<p className="mt-1 text-sm text-gray-500">
					Please try again in a moment.
				</p>
			</div>
		);
	}

	return (
		<section>
		<TripSummaryCard />
		<HourlyForecast />
		</section>
	);
}

export default Result;
