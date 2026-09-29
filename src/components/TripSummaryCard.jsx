import { useContext, useEffect, useState } from 'react'
import { WeatherContext } from "../context/WeatherProvider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUmbrella, faWind } from '@fortawesome/free-solid-svg-icons';

import locationImg from "../assets/location.png";

function TripSummaryCard() {
    const { trip, tripSummary} = useContext(WeatherContext);
    const [img, setImg] = useState("");

    

    useEffect(() => {
        if (!trip?.location?.name) return;

        const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

        const url = `https://api.unsplash.com/search/photos?query=${trip.location.name}+landmark&orientation=landscape&per_page=1`;

        const myHeaders = new Headers();

        myHeaders.append("Accept", "application/json");
        myHeaders.append(
            "Authorization",
            `Client-ID ${UNSPLASH_ACCESS_KEY}`
        );

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
        };

        fetch(url, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.results?.length > 0) {
                    setImg(result.results[0].urls.raw);
                }
            })
            .catch((error) => console.error(error));

    }, [trip]);

    if(!trip || !tripSummary) return;

    // console.log(tripSummaryData.minTemperature);
    // console.log(typeof tripSummaryData.minTemperature);

  return (
    <section className="relative overflow-hidden rounded-2xl bg-cover bg-center px-3 py-5 sm:p-10"
    style={{
        backgroundImage: img
    ? `url(${img})`
    : `url(${locationImg})`,
    }}
>
        <div className="absolute inset-0 bg-black/25" />
        <div className='flex flex-col item-center glass p-3 sm:p-8 text-white'>
            <div className='text-center mb-5'>
                <p>Your Trip</p>
                <p>{trip.start.format("D MMM")} —{" "} {trip.end.format("D MMM")}</p>

                <h1 className="text-5xl font-bold text-white pb-2">{trip.location.name}</h1>
            </div>
            
            

            <div className='grid grid-cols-2 lg:grid-cols-4 gap-3'>

                <div className="glass border rounded-2xl px-2 sm:px-8 py-3 flex items-center gap-3">
                    <FontAwesomeIcon icon={faWind}></FontAwesomeIcon>
                    <div>
                        <p>Temperature</p>
                        <p><strong>{tripSummary.minTemperature}{"° - "}{tripSummary.maxTemperature}{"°"}</strong></p>
                    </div>
                </div>

                <div className="glass border rounded-2xl px-2 sm:px-8 py-3 flex items-center gap-3">
                    <FontAwesomeIcon icon={faWind}></FontAwesomeIcon>
                    <div>
                        <p>Feels like</p>
                        <p><strong>{tripSummary.feelsLikeMin} {"° - "} {tripSummary.feelsLikeMax} {"°"}</strong></p>
                    </div>
                </div>

                <div className="glass border rounded-2xl px-2 sm:px-8 py-3 flex items-center gap-3">
                    <FontAwesomeIcon icon={faWind}></FontAwesomeIcon>
                    <div>
                        <p>Wind</p>
                        <p><strong>{tripSummary.maxWindSpeed} {" km/h"}</strong></p>
                    </div>
                </div>

                <div className="glass border rounded-2xl px-2 sm:px-8 py-3 flex items-center gap-3">
                    <FontAwesomeIcon icon={faUmbrella}></FontAwesomeIcon>
                    <div>
                        <p>Rain Chance</p>
                        <p><strong>{tripSummary.rainProbability} {" %"}</strong></p>
                    </div>
                    
                </div>
            </div>
        </div>
    
    </section>
  )
}

export default TripSummaryCard