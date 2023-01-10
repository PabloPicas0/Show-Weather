import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate, faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import "./index.scss";

function App() {
  return (
    <div className="App">
      <div className="app-container">
        <img />
        <div className="basic-info">
          <p>
            25*c
            <button className="refresh">
              <FontAwesomeIcon icon={faArrowsRotate} />
            </button>
          </p>
          <p>Location</p>
        </div>

        <div className="more-info">
          <button>
              <FontAwesomeIcon icon={faCaretDown} />
            More Info...
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
