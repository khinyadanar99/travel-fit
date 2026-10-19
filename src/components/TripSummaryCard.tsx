import { useContext } from "react";
import { WeatherContext } from "../context/WeatherProvider.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUmbrella, faWind } from "@fortawesome/free-solid-svg-icons";

import locationImg from "../assets/location.png";
import { useTripImage } from "../hooks/useTripImage.ts";

function TripSummaryCard() {
  const context = useContext(WeatherContext);

  if (!context) return;

  const { trip, tripSummaryData } = context;
  const { data: img } = useTripImage(trip?.location?.name);

  if (!trip || !tripSummaryData || !trip.start || !trip.end) {
    return null;
  }

  return (
    <section
        className="relative overflow-hidden rounded-2xl bg-cover bg-center px-3 py-5 sm:p-10"
        style={{backgroundImage: img ? `url(${img})` : `url(${locationImg})`}}
    >
        <div className="absolute inset-0 bg-black/25" />

        <div className="flex flex-col item-center glass p-3 sm:p-8 text-white">
            <div className="text-center mb-5">
                <p>Your Trip</p>
                <p>{trip.start.format("D MMM")} — {trip.end.format("D MMM")}</p>
                <h1 className="text-5xl font-bold text-white pb-2">{trip.location.name}</h1>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="glass border rounded-2xl px-2 sm:px-8 py-3 flex items-center gap-3">
                    <FontAwesomeIcon icon={faWind} />
                    <div>
                        <p>Temperature</p>
                        <p>
                            <strong>
                            {tripSummaryData.minTemperature}° - {tripSummaryData.maxTemperature}°
                            </strong>
                        </p>
                    </div>
                </div>

                <div className="glass border rounded-2xl px-2 sm:px-8 py-3 flex items-center gap-3">
                    <FontAwesomeIcon icon={faWind} />
                    <div>
                        <p>Feels like</p>
                        <p>
                            <strong>
                            {tripSummaryData.feelsLikeMin}° - {tripSummaryData.feelsLikeMax}°
                            </strong>
                        </p>
                    </div>
                </div>

                <div className="glass border rounded-2xl px-2 sm:px-8 py-3 flex items-center gap-3">
                    <FontAwesomeIcon icon={faWind} />
                    <div>
                        <p>Wind</p>
                        <p>
                            <strong>{tripSummaryData.maxWindSpeed} km/h</strong>
                        </p>
                    </div>
                </div>

                <div className="glass border rounded-2xl px-2 sm:px-8 py-3 flex items-center gap-3">
                    <FontAwesomeIcon icon={faUmbrella} />
                    <div>
                        <p>Rain Chance</p>
                        <p>
                            <strong>{tripSummaryData.rainProbability ?? "N/A"} %</strong>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}

export default TripSummaryCard;
