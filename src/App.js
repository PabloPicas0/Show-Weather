import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate, faCaretDown } from "@fortawesome/free-solid-svg-icons";

import "./index.scss";

function App() {
  const [weatherInfo, setWeatherInfo] = useState(null);

  const handleWeatherInfo = () => {
    fetch("https://weather-proxy.freecodecamp.rocks/api/current?lat=35&lon=139")
      .then((response) => response.json())
      .then((data) => {
        setWeatherInfo(data);
      });
  };

  const handleFahrenheitConvert = (temp) => {
    return (temp * 1, 8) + 32;
  };

  useEffect(() => {
    handleWeatherInfo();
  }, []);

  return (
    <div className="App">
      <div className="app-container">
        <img />
        <div className="basic-info">
          <button type="button" className="refresh" onClick={console.log(weatherInfo)}>
            <FontAwesomeIcon icon={faArrowsRotate} />
          </button>
          <p>{weatherInfo.main.temp}</p>
          <p>{weatherInfo.name}</p>
          <p>Updated time</p>
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
