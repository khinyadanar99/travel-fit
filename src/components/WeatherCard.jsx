


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { getWeatherIcon } from "../utils/WeatherFunction";
import dayjs from 'dayjs'


function WeatherCard({hour}) {

  return (

    <div className="flex w-25 flex-col items-center text-center border-r border-[#151515]/10">
    
      	{/* Time */}
      	<p className="mb-5 text-base font-medium text-[#151515]/60">
          	{dayjs(hour.time).format("ha")}
      	</p>


      	{/* Weather icon */}
		<div className="mb-5 flex justify-center">
			<FontAwesomeIcon icon={getWeatherIcon(hour.weatherCode, hour.time, hour.sunrise, hour.sunset)} className="text-3xl"/>
		</div>


      	{/* Temperature */}
      	<p className="font-semibold text-[#151515]">
          	{Math.round(hour.temperature)}°
      	</p>

  	</div>
  )
}

export default WeatherCard