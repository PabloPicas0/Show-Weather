import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faArrowsRotate } from "@fortawesome/free-solid-svg-icons";

const Widget = ({ 
    weatherInfo,
    findMe,
    handleTime, 
    setTemperature, 
    temperature, 
    hours, 
    minutes,
    handleCard,
    handleTemperatureConvert
}) => {
  return (
    <div className="widget-container">
      <img src={weatherInfo?.weather[0].icon} alt="Weather Icon" className="weather-icon" />
      <button
        type="button"
        className="refresh"
        onClick={() => {
          findMe()
          handleTime();
        }}>
        <FontAwesomeIcon icon={faArrowsRotate} />
      </button>
      <div className="basic-info">
        <p className="clickableTemperature" onClick={() => setTemperature(!temperature)}>
          {weatherInfo !== null ? handleTemperatureConvert(weatherInfo.main.temp, temperature) : "..."}
        </p>
        <p className="fs-5">{weatherInfo !== null ? weatherInfo.name : "Loading..."}</p>
        <p>{`Updated ${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes} `}</p>
      </div>

      <div className="more-info">
        <div>
          <button type="button" onClick={handleCard}>
            <FontAwesomeIcon icon={faCaretDown} className="me-1" />
            More Info...
          </button>
        </div>
      </div>
    </div>
  );
};

export default Widget;
