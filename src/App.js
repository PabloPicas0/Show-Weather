import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate, faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import "./index.scss";

function App() {
  return (
    <div className="App">
      <div className="app-container">
        <img />
        <div className="basic-info">
          <button className="refresh">
            <FontAwesomeIcon icon={faArrowsRotate} />
          </button>
          <p>25*c</p>
          <p>Location</p>
          <p>Updated time</p>
        </div>

        <div className="more-info">
          <div>
            <button>
              <FontAwesomeIcon icon={faCaretDown} />
              More Info...
            </button>
          </div>
        </div>
      </div>
      <footer>FCC free weather app</footer>
    </div>
  );
}

export default App;
