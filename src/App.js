import { useEffect, useRef, useState } from "react";

import MoreInfoModal from "./Components/moreInfo";
import Widget from "./Components/widget";

import "./index.scss";

function App() {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [isCelcius, setIsCelcius] = useState(true);
  const [latitude, setLatitude] = useState(35);
  const [longitude, setLongitude] = useState(139);

  const moreInfoCard = useRef();

  const fetchWeatherInfo = async (lat, long) => {
    const request = `https://weather-proxy.freecodecamp.rocks/api/current?lat=${lat}&lon=${long}`;

    const weatherRequest = await fetch(request);
    const weatherResponse = await weatherRequest.json();

    return weatherResponse;
  };

  const handleDirection = (degree) => {
    const idx = Math.floor(degree / 45 + 0.5);
    const direcionts = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    return direcionts[idx % 8];
  };

  const handleTimeConvertion = (timestamp) => {
    let date = new Date(timestamp * 1000);

    if (weatherInfo.id === 1851632) {
      date = new Date(new Date(timestamp * 1000).toLocaleString("en-GB", { timeZone: "Asia/Tokyo" })); //this change sunset/sunrise to this in Tokyo if user denied geolocation
    }

    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}`;
  };

  const findMe = () => {
    let findGeolocation = navigator.geolocation;

    const success = (position) => {
      let lat = position.coords.latitude;
      let long = position.coords.longitude;

      fetchWeatherInfo(lat, long).then((weather) => setWeatherInfo(weather));
      setLatitude(lat);
      setLongitude(long);
    };

    const eror = (eror) => {
      fetchWeatherInfo(latitude, longitude).then((weather) => setWeatherInfo(weather));

      console.log(eror.message);
    };

    findGeolocation.getCurrentPosition(success, eror);
  };

  const handleCard = () => {
    const moreInfo = moreInfoCard.current;
    const hideTabIndex = moreInfoCard.current.childNodes[0].firstChild;

    moreInfo.style.height === ""
      ? (moreInfoCard.current.style.height = "100vh")
      : (moreInfoCard.current.style.height = "");
    hideTabIndex.tabIndex === -1 ? (hideTabIndex.tabIndex = 1) : (hideTabIndex.tabIndex = -1);
  };

  useEffect(() => {
    fetchWeatherInfo(latitude, longitude).then((weather) => {
      console.log(weather)
      setWeatherInfo(weather);
    });
  }, []);

  return (
    <div className="App">
      <Widget
        weatherInfo={weatherInfo}
        findMe={findMe}
        setIsCelcius={setIsCelcius}
        isCelcius={isCelcius}
        handleCard={handleCard}
      />
      {/* <MoreInfoModal
        moreInfoCard={moreInfoCard}
        handleCard={handleCard}
        weatherInfo={weatherInfo}
        handleTemperatureConvert={handleTemperatureConvert}
        temperature={temperature}
        handleDirection={handleDirection}
        handleTimeConvertion={handleTimeConvertion}
      /> */}
      <footer>Created by Pablo</footer>
    </div>
  );
}

export default App;
