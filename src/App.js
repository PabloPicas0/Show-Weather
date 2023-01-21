import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate, faCaretDown } from "@fortawesome/free-solid-svg-icons";

import "./index.scss";

function App() {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [temperature, setTemperature] = useState(false);
  const [latitude, setLatitude] = useState(35);
  const [longitude, setLongitude] = useState(139);
  const [hours, setHours] = useState(null);
  const [minutes, setMinutes] = useState(null);

  const fetchWeatherInfo = (api) => {
    fetch(api)
      .then((response) => response.json())
      .then((data) => {
        setWeatherInfo(data);
      });
  };

  const handleTemperatureConvert = (temp, toggle) => {
    if (toggle === false) {
      return `${Math.floor(temp)}°C`;
    }
    return `${Math.floor((9 / 5) * temp + 32)}°F`;
  };

  const handleDirection = (degree) => {
    if (degree === 0) {
      return "N";
    }
    if (degree > 0 && degree < 90) {
      return "NE";
    }
    if (degree === 90) {
      return "E";
    }
    if (degree > 90 && degree < 180) {
      return "SE";
    }
    if (degree === 180) {
      return "S";
    }
    if (degree > 180 && degree < 270) {
      return "SW";
    }
    if (degree === 270) {
      return "W";
    }
    if (degree > 270 && degree < 350) {
      return "NW";
    }
  };

  const handleTime = () => {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();

    setHours(hours);
    setMinutes(minutes);
  };

  const handleTimeConvertion = (timestamp) => {
    const date = new Date(timestamp * 1000);

    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${hours}:${minutes}`;
  };

  const findMe = () => {
    let findGeolocation = navigator.geolocation;

    const success = (position) => {
      let lat = position.coords.latitude;
      let long = position.coords.longitude;
      const request = `https://weather-proxy.freecodecamp.rocks/api/current?lat=${lat}&lon=${long}`;

      fetchWeatherInfo(request);
      setLatitude(lat);
      setLongitude(long);
    };

    findGeolocation.getCurrentPosition(success);
  };

  useEffect(() => {
    findMe();
    handleTime();
  }, []);

  return (
    <div className="App">
      <div className="widget-container">
        <img src={weatherInfo?.weather[0].icon} alt="Weather Icon" className="weather-icon" />
        <div className="basic-info">
          <button
            type="button"
            className="refresh"
            onClick={() => {
              fetchWeatherInfo(`https://weather-proxy.freecodecamp.rocks/api/current?lat=${latitude}&lon=${longitude}`);
              handleTime();
            }}>
            <FontAwesomeIcon icon={faArrowsRotate} />
          </button>
          <p className="clickableTemperature" onClick={() => setTemperature(!temperature)}>
            {weatherInfo !== null ? handleTemperatureConvert(weatherInfo.main.temp, temperature) : "Loading..."}
          </p>
          <p>{weatherInfo !== null ? weatherInfo.name : "Loading..."}</p>
          <p>{`Updated ${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes} `}</p>
        </div>

        <div className="more-info">
          <div>
            <button type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
              <FontAwesomeIcon icon={faCaretDown} />
              More Info...
            </button>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="stacicBackdropLabel">
                Accurate weather Info
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div className="modal-body">
              <p className="underscore">{weatherInfo !== null ? `${weatherInfo.name}, ${weatherInfo.sys.country}` : "Loading..."}</p>
              <div className="underscore d-flex justify-content-evenly">
                <div className="d-flex align-items-center ms-5">
                  {weatherInfo !== null ? handleTemperatureConvert(weatherInfo.main.temp, temperature) : "Loading..."}
                </div>

                <img src={weatherInfo?.weather[0].icon} alt={`A icon shows ${weatherInfo?.weather[0].description}`} className="" />

                <div className="me-5">
                  <div>{weatherInfo !== null ? handleTemperatureConvert(weatherInfo.main.temp_max, temperature) : "Loading..."}</div>
                  <div>{weatherInfo !== null ? handleTemperatureConvert(weatherInfo.main.temp_min, temperature) : "Loading..."}</div>
                </div>
              </div>

              <div className="underscore d-flex justify-content-evenly">
                <div>
                  <div>{weatherInfo !== null ? `Wind: ${handleDirection(weatherInfo.wind.deg)} ${weatherInfo.wind.speed} m/s` : "Loading..."}</div>
                  <div>{weatherInfo !== null ? `Sunrise: ${handleTimeConvertion(weatherInfo.sys.sunrise)}` : "Loading..."}</div>
                </div>

                <div>
                  <div>{weatherInfo !== null ? `Humidity: ${weatherInfo.main.humidity}%` : "Loading..."}</div>
                  <div>{weatherInfo !== null ? `Sunset: ${handleTimeConvertion(weatherInfo.sys.sunset)}` : "Loading..."}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer>FCC Free Weather App</footer>
    </div>
  );
}

export default App;
