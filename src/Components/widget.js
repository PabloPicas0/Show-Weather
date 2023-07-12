import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faLocationDot,
  faCloudBolt,
  faCloudSunRain,
  faCloudRain,
  faSnowflake,
  faSmog,
  faCloudSun,
} from "@fortawesome/free-solid-svg-icons";
import { faSun as faSunRegular } from "@fortawesome/free-regular-svg-icons";

const WeatherConditionIcons = [
  [2, faCloudBolt],
  [3, faCloudSunRain],
  [5, faCloudRain],
  [6, faSnowflake],
  [7, faSmog],
  [8, faCloudSun],
];

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

  const handleWeatherConditionIcon = () => {
    if (!weatherInfo) return;

    let weatherIcon = null;
    const weatherId = weatherInfo.weather[0].id;

    if (weatherId === 800) {
      weatherIcon = faSunRegular;
      return weatherIcon;
    }

    const firstNumber = Number(String(weatherId)[0]);

    for (const WeatherConditionIcon of WeatherConditionIcons) {
      const [id, icon] = WeatherConditionIcon;

      if (firstNumber === id) {
        weatherIcon = icon;
        break;
      }
    }

    return weatherIcon;
  };

  const time = handleTime();
  const day = handleDay();
  const weatherCondition = handleWeatherConditionIcon()

  return (
    <>
      {!weatherInfo ? (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div className="widget-container">
          <div className="d-flex justify-content-between">
            <h2 className="text-capitalize fw-bold">{weatherInfo.weather[0].description}</h2>

            <div>
              <p className="mb-0 fw-semibold">
                {weatherInfo.name}
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="ms-2 location-dot-animation"
                  onClick={() => findMe()}
                  cursor={"pointer"}
                />
              </p>
              <p className="mb-0 fw-semibold">{time}</p>
            </div>
          </div>

          <div className="d-flex justify-content-center">
            <FontAwesomeIcon icon={weatherCondition} fontSize={80} />
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

              <div className="fw-bold">{day}</div>
            </div>

            <div className="d-flex flex-column">
              <div className="d-flex justify-content-center">
                <img src={weatherInfo.weather[0].icon} alt="Weather Icon" className="weather-icon" />
              </div>

              <div className="fw-bold">
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
