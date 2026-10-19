import { useContext, useState } from "react";
import dayjs from "dayjs";

import { WeatherContext } from "../context/WeatherProvider.tsx";
import WeatherCard from "./WeatherCard.tsx";
import ClothingRecommendation from "./ClothingRecommendation.tsx";

import { getWeatherIcon } from "../utils/WeatherFunction.ts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function HourlyForecast() {
	const context = useContext(WeatherContext);

	if (!context) return;

  	const { daySummary, hourlyByDay } = context;

	const dates = Object.keys(hourlyByDay || {});

	const [selectedDate, setSelectedDate] = useState<string | null>(null);

	const activeDate = selectedDate && dates.includes(selectedDate) ? selectedDate : dates[0];

	const selectedHours = activeDate ? hourlyByDay[activeDate] || [] : [];

	const selectedDay = daySummary?.find((day) => day.date === activeDate);

	if (!dates.length) {
		return null;
	}

	return (
		<div className="mt-8 text-[#151515]">
			<div className="flex border-b border-[#151515]/10">
				<div className="flex flex-1 overflow-x-auto">
					<div className="flex min-w-max gap-3">
						{dates.map((date) => {
						const isSelected = date === activeDate;

						const summary = daySummary?.find((day) => day.date === date);

						return (
							<button key={date}
								type="button"
								onClick={() => setSelectedDate(date)}
								className={`relative gap-3 min-w-25 px-6 py-5 text-base font-medium transition
											${
											isSelected
												? "text-[#151515]"
												: "text-[#151515]/45 hover:text-[#151515]/75"
											}
										`}
							>
								{summary && (
									<div className="flex items-center gap-3">
										<FontAwesomeIcon
											icon={getWeatherIcon(
												summary.weatherCode,
												summary.date,
												summary.sunrise,
												summary.sunset,
											)}
											className="text-3xl"
										/>

										<div>
											<p className="text-sm">{dayjs(date).format("ddd D MMM")}</p>
											<p className="font-bold">
												{Math.round(summary.minTemperature)}° —{" "}
												{Math.round(summary.maxTemperature)}°
											</p>
										</div>
									</div>
								)}

								{isSelected && (
									<span className="absolute bottom-0 left-4 right-4 h-1 rounded-t-full bg-[#151515]"/>
								)}
							</button>
						);
						})}
					</div>
				</div>
			</div>

			<div className="glass mt-5 sm:my-5 pt-10">
				<h3 className="text-lg font-bold px-10">
					Hourly Forecast
					{selectedDay && (
						<span className="ml-2 font-normal">
							{dayjs(selectedDay.date).format("ddd D MMM")}
						</span>
					)}
				</h3>

				<div className="overflow-x-auto">
					<div className="flex min-w-max px-3 pt-5 pb-10">
						{selectedHours.map((hour) => (
							<WeatherCard key={hour.time} hour={hour} />
						))}
					</div>
				</div>
			</div>

			<ClothingRecommendation selectedDay={selectedDay ?? null} />
    	</div>
  	);
}
