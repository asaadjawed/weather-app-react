import React, { useEffect, useState } from "react";
import "../../src/App.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import nightImg from "../images/night_image.png";

export const GetWeather = () => {
  const [cityData, setCityData] = useState([]);
  const [cityName, setCityName] = useState("");
//   const [newTemp,setNewTemp] = useState(0)
 
const temp = cityData?.main?.temp - 273.15

const newVal =  temp?.toFixed(2);
console.log(newVal);
  return (
    
    <>
      <section className="parent_heading_section">
        <div className="container">
          <h1>Weather App</h1>
          <div className="main_weather_parent">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                axios({
                  method: "GET",
                  url: `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=697bfd2fec2ded264625d06a7688f992`,
                })
                  .then((res) => {
                    setCityData(res.data);
                    console.log(res.data);

                    setCityName("");
                  })
                  .catch((err) => {
                    console.log(err, "error occur");
                  });

                console.log("cityda", cityData.coord.lat);
              }}
            >
              <input
                className="input_type"
                placeholder="Enter City Name..."
                type="text"
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
              />
              <button type="submit">SUBMIT</button>
            </form>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="weather_card">
            <img className="img-fluid" src={nightImg} />
            <h1>{cityData.name}</h1>
            <div className="longitude_latitude_work">
            
                <div>Latitude: {cityData?.coord?.lat}</div>
                <div>Longitude: {cityData?.coord?.lon}</div>
             
            </div>
             
            <div className="temperature_current">
                {/* {
                    newTemp = cityData?.main?.temp - 273.15
                } */}
              <h4>Current Temperature:{ newVal + 'C' } </h4>
              <p>Feels Like: {cityData?.main?.feels_like}</p>     
              <p>Humidity: {cityData?.main?.humidity}</p>
              <p>Pressure: {cityData?.main?.pressure}</p>
                
                <div className="longitude_latitude_work">
                    <div>Wind: {cityData?.wind?.deg}</div>
                    <div>Speed: {cityData?.wind?.speed}</div>
                </div>
              {/* <h6>Weather: {cityData?.weather[0]?.description}</h6> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
