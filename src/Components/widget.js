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
  const { weatherInfo, findMe, setIsCelcius, isCelcius } = props;

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

  const time = weatherInfo
    ? new Date((weatherInfo.dt + weatherInfo.timezone) * 1000).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
        timeZone: "UTC",
      })
    : "";

  const day = weatherInfo
    ? new Date((weatherInfo.dt + weatherInfo.timezone) * 1000).toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        timeZone: "UTC",
      })
    : "";

  const sunset = weatherInfo
    ? new Date((weatherInfo.sys.sunset + weatherInfo.timezone) * 1000).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
        timeZone: "UTC",
      })
    : "";

  const sunrise = weatherInfo
    ? new Date((weatherInfo.sys.sunrise + weatherInfo.timezone) * 1000).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
        timeZone: "UTC",
      })
    : "";

  const weatherCondition = handleWeatherConditionIcon();

  const visibility = weatherInfo
    ? new Intl.NumberFormat("en-US", { style: "unit", unit: "kilometer", notation: "compact" }).format(
        weatherInfo.visibility / 1000
      ) // Visibility info is in meters, devide by 1000 to get km
    : "";

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

          <div className="text-sm-center text-md-start mt-4">
            <FontAwesomeIcon icon={faSun} fontSize={19} className="me-2" />
            <span className="text-uppercase fs-5">weather</span>
          </div>

          <div className="mt-4 d-flex gap-5 flex-sm-column flex-md-row">
            <div className="d-flex flex-column justify-content-end text-center">
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

            <div className="d-flex flex-column justify-content-end text-center">
              <div className="d-flex justify-content-center">
                <img src={weatherInfo.weather[0].icon} alt="Weather Icon" className="weather-icon" />
              </div>

              <div className="fw-bold">
                {Math.floor(weatherInfo.wind.speed)}mph/{weatherInfo.wind.deg}
                <span className="fs-5">°</span>
              </div>
            </div>

            <div className="d-flex gap-4 justify-content-md-start justify-content-sm-center">
              <div className="border-start ps-3 text-center">
                <p className="mb-0">Sunrise</p>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="36"
                  fill="currentColor"
                  className="bi bi-sunrise-fill"
                  viewBox="0 0 16 16">
                  <path d="M7.646 1.146a.5.5 0 0 1 .708 0l1.5 1.5a.5.5 0 0 1-.708.708L8.5 2.707V4.5a.5.5 0 0 1-1 0V2.707l-.646.647a.5.5 0 1 1-.708-.708l1.5-1.5zM2.343 4.343a.5.5 0 0 1 .707 0l1.414 1.414a.5.5 0 0 1-.707.707L2.343 5.05a.5.5 0 0 1 0-.707zm11.314 0a.5.5 0 0 1 0 .707l-1.414 1.414a.5.5 0 1 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zM11.709 11.5a4 4 0 1 0-7.418 0H.5a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1h-3.79zM0 10a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 0 10zm13 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z" />
                </svg>

                <p className="mb-0">{sunrise}</p>
              </div>

              <div className="border-start ps-3 text-center">
                <p className="mb-0">Sunset</p>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="36"
                  fill="currentColor"
                  className="bi bi-sunset-fill"
                  viewBox="0 0 16 16">
                  <path d="M7.646 4.854a.5.5 0 0 0 .708 0l1.5-1.5a.5.5 0 0 0-.708-.708l-.646.647V1.5a.5.5 0 0 0-1 0v1.793l-.646-.647a.5.5 0 1 0-.708.708l1.5 1.5zm-5.303-.51a.5.5 0 0 1 .707 0l1.414 1.413a.5.5 0 0 1-.707.707L2.343 5.05a.5.5 0 0 1 0-.707zm11.314 0a.5.5 0 0 1 0 .706l-1.414 1.414a.5.5 0 1 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zM11.709 11.5a4 4 0 1 0-7.418 0H.5a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1h-3.79zM0 10a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 0 10zm13 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z" />
                </svg>

                <p className="mb-0">{sunset}</p>
              </div>

              <div className="border-start ps-3 text-center">
                <p className="mb-0">Visibility</p>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="36"
                  fill="currentColor"
                  className="bi bi-eye-slash-fill"
                  viewBox="0 0 16 16">
                  <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
                  <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
                </svg>

                <p className="mb-0">{visibility}</p>
              </div>

              <div className="border-start ps-3 text-center">
                <p className="mb-0">Humidity</p>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="36"
                  fill="currentColor"
                  className="bi bi-moisture"
                  viewBox="0 0 16 16">
                  <path d="M13.5 0a.5.5 0 0 0 0 1H15v2.75h-.5a.5.5 0 0 0 0 1h.5V7.5h-1.5a.5.5 0 0 0 0 1H15v2.75h-.5a.5.5 0 0 0 0 1h.5V15h-1.5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 .5-.5V.5a.5.5 0 0 0-.5-.5h-2zM7 1.5l.364-.343a.5.5 0 0 0-.728 0l-.002.002-.006.007-.022.023-.08.088a28.458 28.458 0 0 0-1.274 1.517c-.769.983-1.714 2.325-2.385 3.727C2.368 7.564 2 8.682 2 9.733 2 12.614 4.212 15 7 15s5-2.386 5-5.267c0-1.05-.368-2.169-.867-3.212-.671-1.402-1.616-2.744-2.385-3.727a28.458 28.458 0 0 0-1.354-1.605l-.022-.023-.006-.007-.002-.001L7 1.5zm0 0-.364-.343L7 1.5zm-.016.766L7 2.247l.016.019c.24.274.572.667.944 1.144.611.781 1.32 1.776 1.901 2.827H4.14c.58-1.051 1.29-2.046 1.9-2.827.373-.477.706-.87.945-1.144zM3 9.733c0-.755.244-1.612.638-2.496h6.724c.395.884.638 1.741.638 2.496C11 12.117 9.182 14 7 14s-4-1.883-4-4.267z" />
                </svg>

                <p className="mb-0">{weatherInfo.main.humidity}%</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Widget;
