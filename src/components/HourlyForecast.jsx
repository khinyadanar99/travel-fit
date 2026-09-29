import { useContext, useState } from "react";
import dayjs from "dayjs";

import { WeatherContext } from "../context/WeatherProvider";

import WeatherCard from "./WeatherCard";
import ClothingRecommendation from "./ClothingRecommendation";

import { getWeatherIcon } from "../utils/WeatherFunction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function HourlyForecast() {

    const {
        dailyWeather,
        hourlyWeatherByDay,
    } = useContext(WeatherContext);


    // ========================================
    // AVAILABLE DATES
    // ========================================

    const dates = Object.keys(
        hourlyWeatherByDay || {}
    );


    // ========================================
    // SELECTED DAY
    // ========================================

    const [selectedDate, setSelectedDate] =
        useState(null);


    // Use selected date if it exists.
    // Otherwise use the first available date.

    const activeDate =
        selectedDate &&
        dates.includes(selectedDate)
            ? selectedDate
            : dates[0];


    // ========================================
    // HOURLY WEATHER FOR SELECTED DAY
    // ========================================

    const selectedHours = activeDate
        ? hourlyWeatherByDay[activeDate] || []
        : [];


    // ========================================
    // DAILY SUMMARY FOR SELECTED DAY
    // ========================================

    const selectedDay = dailyWeather?.find(
        (day) => day.date === activeDate
    );


    // ========================================
    // NO WEATHER DATA
    // ========================================

    if (!dates.length) {
        return null;
    }


    // ========================================
    // UI
    // ========================================

    return (
        <div className="mt-8 text-[#151515]">

            {/* ========================================
                DAY SELECTOR
            ======================================== */}

            <div className="flex border-b border-[#151515]/10">

                <div className="flex flex-1 overflow-x-auto">

                    <div className="flex min-w-max gap-3">

                        {dates.map((date) => {

                            const isSelected =
                                date === activeDate;


                            // Find daily information
                            // for this date

                            const summary =
                                dailyWeather?.find(
                                    (day) =>
                                        day.date === date
                                );


                            return (

                                <button
                                    key={date}
                                    type="button"
                                    onClick={() =>
                                        setSelectedDate(date)
                                    }
                                    className={`
                                        relative
                                        gap-3
                                        min-w-25
                                        px-6
                                        py-5
                                        text-base
                                        font-medium
                                        transition

                                        ${
                                            isSelected
                                                ? "text-[#151515]"
                                                : "text-[#151515]/45 hover:text-[#151515]/75"
                                        }
                                    `}
                                >

                                    {summary && (

                                        <div className="flex items-center gap-3">

                                            {/* Weather icon */}

                                            <FontAwesomeIcon
                                                icon={getWeatherIcon(
                                                    summary.weatherCode,
                                                    summary.date,
                                                    summary.sunrise,
                                                    summary.sunset
                                                )}
                                                className="text-3xl"
                                            />


                                            <div>

                                                {/* Date */}

                                                <p className="text-sm">
                                                    {dayjs(
                                                        date
                                                    ).format(
                                                        "ddd D MMM"
                                                    )}
                                                </p>


                                                {/* Temperature */}

                                                <p className="font-bold">

                                                    {Math.round(
                                                        summary.minTemperature
                                                    )}
                                                    ° —{" "}

                                                    {Math.round(
                                                        summary.maxTemperature
                                                    )}
                                                    °

                                                </p>

                                            </div>

                                        </div>

                                    )}


                                    {/* Selected indicator */}

                                    {isSelected && (

                                        <span
                                            className="
                                                absolute
                                                bottom-0
                                                left-4
                                                right-4
                                                h-1
                                                rounded-t-full
                                                bg-[#151515]
                                            "
                                        />

                                    )}

                                </button>

                            );

                        })}

                    </div>

                </div>

            </div>


            {/* ========================================
                HOURLY FORECAST
            ======================================== */}

            <div className="glass mt-5 sm:my-5 pt-10">

                <h3 className="text-lg font-bold px-10">

                    Hourly Forecast

                    {selectedDay && (
                        <span className="ml-2 font-normal">
                            {dayjs(
                                selectedDay.date
                            ).format(
                                "ddd D MMM"
                            )}
                        </span>
                    )}

                </h3>


                <div className="overflow-x-auto">

                    <div className="flex min-w-max px-3 pt-5 pb-10">

                        {selectedHours.map(
                            (hour) => (

                                <WeatherCard
                                    key={hour.time}
                                    hour={hour}
                                />

                            )
                        )}

                    </div>

                </div>

            </div>


            {/* ========================================
                CLOTHING RECOMMENDATION
            ======================================== */}

            <ClothingRecommendation
                selectedDay={selectedDay}
            />

        </div>
    );
}