import axios from "axios";
import React, { useState, useEffect } from "react";
const WeatherReport = ({ capital }) => {
    const [weatherData, setWeatherData] = useState({});
    const [apiExpired, setApiExpired] = useState(false);
    useEffect(() => {
        let isMounted = true;
        axios
            .get("http://api.weatherstack.com/current", {
                params: {
                    access_key: process.env.REACT_APP_API_KEY,
                    query: capital,
                },
            })
            .then((response) => {
                console.log(response);
                if (
                    response.data.current === undefined &&
                    response.data.error.code === 104
                )
                    setApiExpired(true);
                if (isMounted) setWeatherData(response.data.current);
            })
            .catch((error) => console.log(error));
        return () => (isMounted = false);
    }, [capital]);
    if (weatherData !== undefined)
        return (
            <div>
                <h3>Weather in {capital}</h3>
                <p>
                    <b>Temperature: </b>
                    {weatherData.temperature} Celcius degrees{" "}
                </p>
                <img
                    src={weatherData.weather_icons}
                    alt="Should be weather icon"
                />
                <p>
                    <b>Wind: </b>
                    {weatherData.wind_speed} direction {weatherData.wind_dir}
                </p>
            </div>
        );
    if (apiExpired) return <p>API has been expired, please get another one</p>;
    return <p>No weather to display</p>;
};

export default WeatherReport;
