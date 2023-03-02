import { useEffect, useRef, useState } from "react";

import MoreInfoModal from "./Components/moreInfo";
import Widget from "./Components/widget";

import "./index.scss";

function App() {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [temperature, setTemperature] = useState(false);
  const [latitude, setLatitude] = useState(35);
  const [longitude, setLongitude] = useState(139);
  const [hours, setHours] = useState(null);
  const [minutes, setMinutes] = useState(null);
  const [background, setBackground] = useState("");

  const moreInfoCard = useRef();

  const fetchWeatherInfo = (api) => {
    fetch(api)
      .then((response) => response.json())
      .then((data) => {
        setWeatherInfo(data);
        handleBackground(data.weather[0].main);
      });
  };

  const handleTemperatureConvert = (temp, toggle) => {
    if (toggle === false) {
      return `${Math.floor(temp)}°C`;
    }
    return `${Math.floor((9 / 5) * temp + 32)}°F`;
  };

  const handleDirection = (degree) => {
    const idx = Math.floor((degree / 45) + 0.5) 
    const direcionts = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    return direcionts[(idx % 8)]
  };

  const handleTime = () => {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();

    setHours(hours);
    setMinutes(minutes);
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
      const request = `https://weather-proxy.freecodecamp.rocks/api/current?lat=${lat}&lon=${long}`;

      fetchWeatherInfo(request);
      setLatitude(lat);
      setLongitude(long);
    };

    const eror = (eror) => {
      const request = `https://weather-proxy.freecodecamp.rocks/api/current?lat=${latitude}&lon=${longitude}`;
      fetchWeatherInfo(request);

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

  const handleBackground = (weather) => {
    const weatherState = {
      "Clear": `url(${process.env.PUBLIC_URL + "/images/sunny_day.gif"})`,
      "Clouds": `url(${process.env.PUBLIC_URL + "/images/cloudy_day.gif"})`,
      "Mist": `url(${process.env.PUBLIC_URL + "/images/cloudy_day.gif"})`,
      "Snow": `url(${process.env.PUBLIC_URL + "/images/winter_day.gif"})`,
      "Rain": `url(${process.env.PUBLIC_URL + "/images/rainy_day.gif"})`,
      "Drizzle": `url(${process.env.PUBLIC_URL + "/images/rainy_day.gif"})`,
      "Thunderstorm": `url(${process.env.PUBLIC_URL + "/images/rainy_day.gif"})`,
      "default": "linear-gradient(240deg, rgba(150, 50, 50, 0.3), rgba(0, 0, 200, 0))"
    };

    if(!weatherState.hasOwnProperty(weather)) {
      setBackground(weatherState["default"]);
    }

    setBackground(weatherState[weather])
  };

  useEffect(() => {
    findMe();
    handleTime();
  }, []);

  return (
    <div className="App" style={{ backgroundImage: background }}>
      <Widget
        weatherInfo={weatherInfo}
        findMe={findMe}
        handleTime={handleTime}
        setTemperature={setTemperature}
        temperature={temperature}
        hours={hours}
        minutes={minutes}
        handleCard={handleCard}
        handleTemperatureConvert={handleTemperatureConvert}
      />
      <MoreInfoModal
        moreInfoCard={moreInfoCard}
        handleCard={handleCard}
        weatherInfo={weatherInfo}
        handleTemperatureConvert={handleTemperatureConvert}
        temperature={temperature}
        handleDirection={handleDirection}
        handleTimeConvertion={handleTimeConvertion}
      />
      <footer>Created by Pablo</footer>
    </div>
  );
}

export default App;
