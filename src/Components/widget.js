import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faArrowsRotate, faSun } from "@fortawesome/free-solid-svg-icons";

const Widget = ({
  weatherInfo,
  findMe,
  handleTime,
  setTemperature,
  temperature,
  hours,
  minutes,
  handleCard,
  handleTemperatureConvert,
}) => {
  return (
    <div className="widget-container">
      <div className="d-flex justify-content-between">
        <h2>Sample Text</h2>

        <div>
          <p className="mb-0">Pace</p>
          <p className="mb-0">{hours}</p>
        </div>
      </div>

      <div className="d-flex justify-content-center">
        <img src={weatherInfo?.weather[0].icon} alt="Weather Icon" className="weather-icon" />
      </div>

      <div>
        <FontAwesomeIcon icon={faSun} fontSize={19} className="me-2" />
        <span className="text-uppercase fs-5">weather</span>
      </div>

      <div className="mt-4 d-flex gap-5">
        <div className="d-flex flex-column justify-content-end">
          <div className="d-flex justify-content-center">
            <h2>33</h2>
            <span className="fs-5">°</span>
          </div>

          <div>Monday 16th</div>
        </div>

        <div className="d-flex flex-column">
          <div className="d-flex justify-content-center">
            <img src={weatherInfo?.weather[0].icon} alt="Weather Icon" className="weather-icon" />
          </div>

          <div>Monday 16th</div>
        </div>
      </div>

      {/* <img src={weatherInfo?.weather[0].icon} alt="Weather Icon" className="weather-icon" />
      <button
        aria-label="Refresh Weather"
        type="button"
        className="refresh"
        onClick={() => {
          findMe();
          handleTime();
        }}>
        <FontAwesomeIcon icon={faArrowsRotate} />
      </button>
      <div className="basic-info">
        <p className="clickableTemperature" onClick={() => setTemperature((prev) => !prev)}>
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
      </div> */}
    </div>
  );
};

export default Widget;
