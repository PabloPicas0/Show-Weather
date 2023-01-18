import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate, faCaretDown } from "@fortawesome/free-solid-svg-icons";

import "./index.scss";

function App() {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [latitude, setLatitude] = useState(35)
  const [longitude, setLongitude] = useState(139)
  const [hours, setHours] = useState(null);
  const [minutes, setMinutes] = useState(null);

  const fetchWeatherInfo = () => {
    fetch(`https://weather-proxy.freecodecamp.rocks/api/current?lat=${latitude}&lon=${longitude}`)
      .then((response) => response.json())
      .then((data) => {
        setWeatherInfo(data);
      });
    console.log(weatherInfo);
  };

  const handleFahrenheitConvert = (temp) => {
    return Math.floor((9 / 5) * temp + 32);
  };

  const handleTime = () => {
    const offset = weatherInfo?.timezone

    let date = new Date();
    date.setUTCMinutes(date.getUTCMinutes() + offset / 60)
    let hours = date.getHours();
    let minutes = date.getMinutes();

    setHours(hours);
    setMinutes(minutes);
  };

  const findMe = () => {
    let findGeolocation = navigator.geolocation

    const success = (position) => {
      let lat = position.coords.latitude
      let long = position.coords.longitude

      setLatitude(lat)
      setLongitude(long)
    }
    
    findGeolocation.getCurrentPosition(success)
  }

  useEffect(() => {
    findMe();
    fetchWeatherInfo();
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
              fetchWeatherInfo();
              handleTime();
            }}>
            <FontAwesomeIcon icon={faArrowsRotate} />
          </button>
          <p>{weatherInfo !== null ? `${handleFahrenheitConvert(weatherInfo.main.temp)}°F` : "Loading..."}</p>
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
                <div className="d-flex align-items-center ms-5">{weatherInfo !== null ? weatherInfo.main.temp : "Loading..."}</div>

                <img src={weatherInfo?.weather[0].icon} alt={`A icon shows ${weatherInfo?.weather[0].description}`} className="" />

                <div className="me-5">
                  <div>{weatherInfo !== null ? weatherInfo.main.temp_max : "Loading..."}</div>
                  <div>{weatherInfo !== null ? weatherInfo.main.temp_min : "Loading..."}</div>
                </div>
              </div>

              <div className="underscore d-flex justify-content-evenly">
                <div>
                  <div>{weatherInfo !== null ? `Wind: ${weatherInfo.wind.speed} m/s` : "Loading..."}</div>
                  <div>{weatherInfo !== null ? `Sunrise: ${weatherInfo.sys.sunrise}` : "Loading..."}</div>
                </div>

                <div>
                  <div>{weatherInfo !== null ? `Humidity: ${weatherInfo.main.humidity}%` : "Loading..."}</div>
                  <div>{weatherInfo !== null ? `Sunset: ${weatherInfo.sys.sunset}` : "Loading..."}</div>
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
