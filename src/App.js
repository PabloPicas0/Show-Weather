import { useEffect, useState } from "react";

import Widget from "./Components/widget";

import "./index.scss";

function App() {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [isCelcius, setIsCelcius] = useState(true);
  const [latitude, setLatitude] = useState(35);
  const [longitude, setLongitude] = useState(139);

  const fetchWeatherInfo = async (lat, long) => {
    const request = `https://weather-proxy.freecodecamp.rocks/api/current?lat=${lat}&lon=${long}`;

    const weatherRequest = await fetch(request);
    const weatherResponse = await weatherRequest.json();

    return weatherResponse;
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

  useEffect(() => {
    fetchWeatherInfo(latitude, longitude).then((weather) => {
      setWeatherInfo(weather);
    });
  }, []);

  return (
    <div className="App py-5">
      <Widget weatherInfo={weatherInfo} findMe={findMe} setIsCelcius={setIsCelcius} isCelcius={isCelcius} />
      <footer className="fw-bold">Created by Pablo</footer>
    </div>
  );
}

export default App;
