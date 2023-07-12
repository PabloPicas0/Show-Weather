import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faLocationDot } from "@fortawesome/free-solid-svg-icons";

const Widget = (props) => {
  const { weatherInfo, findMe, setIsCelcius, isCelcius, handleCard, handleTemperatureConvert } = props;

  const handleTime = () => {
    return new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  const handleDay = () => {
    return new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric" });
  };

  const time = handleTime();
  const day = handleDay();

  return (
    <>
      {!weatherInfo ? (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div className="widget-container">
          <div className="d-flex justify-content-between">
            <h2 className="text-capitalize">{weatherInfo.weather[0].description}</h2>

            <div>
              <p className="mb-0">
                {weatherInfo.name}
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="ms-2 location-dot-animation"
                  onClick={() => findMe()}
                  cursor={"pointer"}
                />
              </p>
              <p className="mb-0">{time}</p>
            </div>
          </div>

          <div className="d-flex justify-content-center">
            <img src={weatherInfo.weather[0].icon} alt="Weather Icon" className="weather-icon" />
          </div>

          <div>
            <FontAwesomeIcon icon={faSun} fontSize={19} className="me-2" />
            <span className="text-uppercase fs-5">weather</span>
          </div>

          <div className="mt-4 d-flex gap-5">
            <div className="d-flex flex-column justify-content-end">
              <div className="d-flex justify-content-center">
                <h2
                  className="display-temperature user-select-none"
                  onClick={() => setIsCelcius((prev) => !prev)}>
                  {isCelcius
                    ? Math.floor(weatherInfo.main.temp)
                    : Math.floor((9 / 5) * weatherInfo.main.temp + 32)}
                </h2>

                <span className="fs-5">°</span>
              </div>

              <div>{day}</div>
            </div>

            <div className="d-flex flex-column">
              <div className="d-flex justify-content-center">
                <img src={weatherInfo.weather[0].icon} alt="Weather Icon" className="weather-icon" />
              </div>

              <div>
                {Math.floor(weatherInfo.wind.speed)}mph/{weatherInfo.wind.deg}
                <span className="fs-5">°</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Widget;
