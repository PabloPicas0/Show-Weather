import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate, faCaretDown } from "@fortawesome/free-solid-svg-icons";

import "./index.scss";

function App() {
  const [weatherInfo, setWeatherInfo] = useState(null);

  return (
    <div className="App">
      <div className="app-container">
        <img />
        <div className="basic-info">
          <button type="button" className="refresh">
            <FontAwesomeIcon icon={faArrowsRotate} />
          </button>
          <p>25*c</p>
          <p>Location</p>
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
