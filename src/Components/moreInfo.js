import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const MoreInfoModal = ({ 
    moreInfoCard, 
    handleCard, 
    weatherInfo, 
    handleTemperatureConvert, 
    temperature, 
    handleDirection, 
    handleTimeConvertion 
}) => {
  return (
    <div ref={moreInfoCard} className="more-info-card">
      <div style={{ display: "flex", justifyContent: "end" }}>
        <button tabIndex={-1} type="button" onClick={handleCard}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>

      <div className="mt-5">
        <h1 className="text-center mb-4">Accurate Weather Info</h1>
        <div className="underscore d-flex justify-content-center gap-5">
          <div className="d-flex align-items-center fs-3">
            {weatherInfo !== null ? handleTemperatureConvert(weatherInfo.main.temp, temperature) : "Loading..."}
          </div>

          <img src={weatherInfo?.weather[0].icon} alt={`A icon shows ${weatherInfo?.weather[0].description}`} className="" />

          <div className="fs-5">
            <div>{weatherInfo !== null ? handleTemperatureConvert(weatherInfo.main.temp_min, temperature) : "Loading..."}</div>
            <div>{weatherInfo !== null ? handleTemperatureConvert(weatherInfo.main.temp_max, temperature) : "Loading..."}</div>
          </div>
        </div>

        <div className="underscore d-flex justify-content-center gap-4">
          <div className="fs-7">
            <div className="mb-3">
              {weatherInfo !== null ? `Wind: ${handleDirection(weatherInfo.wind.deg)} ${weatherInfo.wind.speed} m/s` : "Loading..."}
            </div>
            <div>{weatherInfo !== null ? `Sunrise: ${handleTimeConvertion(weatherInfo.sys.sunrise)}` : "Loading..."}</div>
          </div>

          <div className="fs-7">
            <div className="mb-3">{weatherInfo !== null ? `Humidity: ${weatherInfo.main.humidity}%` : "Loading..."}</div>
            <div>{weatherInfo !== null ? `Sunset: ${handleTimeConvertion(weatherInfo.sys.sunset)}` : "Loading..."}</div>
          </div>
        </div>
        
        <div className="underscore d-flex justify-content-center gap-4">
          <div className="fs-7">
            <div className="mb-3">{weatherInfo !== null ? `Grnd Level: ${weatherInfo.main.grnd_level} hPa` : "Loading..."}</div>
            <div>{weatherInfo !== null ? `Pressure: ${weatherInfo.main.pressure} hPa` : "Loading..."}</div>
          </div>

          <div className="fs-7">
            <div className="mb-3">{weatherInfo !== null ? `Sea Level: ${weatherInfo.main.sea_level} hPa` : "Loading..."}</div>
            <div>{weatherInfo !== null ? `Wind Gust: ${weatherInfo.wind.gust} m/s` : "Loading..."}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
//TODO: When info does not exist dont show it on screen it happens with grnd_lvl and below
export default MoreInfoModal;
