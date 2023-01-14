import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate, faCaretDown } from "@fortawesome/free-solid-svg-icons";

import "./index.scss";

function App() {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [hours, setHours] = useState(null);
  const [minutes, setMinutes] = useState(null);

  const fetchWeatherInfo = () => {
    fetch("https://weather-proxy.freecodecamp.rocks/api/current?lat=35&lon=139")
      .then((response) => response.json())
      .then((data) => {
        setWeatherInfo(data);
      });
    console.log(new Date(), weatherInfo);
  };

  const handleFahrenheitConvert = (temp) => {
    return Math.floor((9/5 * temp) + 32);
  };

  const handleTime = () => {
    //TODO
    //You have timzone proprety in fetched object use it instead date
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();

    setHours(hours);
    setMinutes(minutes);
  };

  useEffect(() => {
    fetchWeatherInfo();
    handleTime();
  }, []);

  return (
    <div className="App">
      <div className="app-container">
        <img src={weatherInfo?.weather[0].icon} alt="A icon of current weather" className="weather-icon" />
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
            <button type="button">
              <FontAwesomeIcon icon={faCaretDown} />
              More Info...
            </button>
          </div>
        </div>
      </div>
      <footer>FCC Free Weather App</footer>
    </div>
  );
}

export default App;
