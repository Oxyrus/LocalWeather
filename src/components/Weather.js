import React, { Component } from 'react';

import LoadingSpinner from './LoadingSpinner';
import { fetchWeather } from '../api';

export default class Weather extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      isCelsius: true
    };
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(location  => {
        fetchWeather(location.coords.latitude, location.coords.longitude)
          .then(data => {
            let celsius = (data.main.temp - 273.15).toFixed(2);
            let fahrenheit = (data.main.temp * (9/5) - 459.67).toFixed(2);
            this.setState({
              temp: data.main.temp,
              pressure: data.main.pressure,
              humidity: data.main.humidity,
              city: data.name,
              country: data.sys.country,
              celsius,
              fahrenheit,
              loading: false,
              weather: data.weather[0].main
            });
          })
          .catch(err => {
            console.error(err);
          });
    });
  }

  icon() {
    let { weather } = this.state;
    if (weather === "Clouds") {
      return (<i className="wi wi-cloudy"></i>);
    } else if (weather === "Rain") {
      return (<i className="wi wi-sleet"></i>);
    } else if (weather === "Clear") {
      return (<i className="wi wi-day-sunny"></i>);
    } else if (weather === "Snow") {
      return (<i className="wi wi-snow"></i>);
    } else if (weather === "Thunderstorm") {
      return (<i className="wi wi-thunderstorm"></i>);
    } else if (weather === "Drizzle") {
      return (<i className="wi wi-showers"></i>);
    } else if (weather === "Atmosphere") {
      return (<i className="wi wi-volcano"></i>);
    } else if (weather === "Extreme") {
      return (<i className="wi wi-tornado"></i>);
    }
    else {
      return ("I have no idea in which planet you are");
    }
  }

  render() {
    let { isCelsius, celsius, fahrenheit, pressure, humidity, city, loading, country, weather } = this.state;

    if (loading) {
      return <LoadingSpinner />;
    }

    return (
      <div className="container">
        <div className="card">
          <div className="location">
            <h1>{city}</h1>, <span>{country}</span>
          </div>
          <div className="icon">

            {this.icon()}

            <span>{weather}</span>

          </div>
          <div className="data">
            <span className="data-item">
              {isCelsius ? celsius : fahrenheit}
              <i className="wi wi-celsius" onClick={e => this.setState({isCelsius: true})}></i> |
              <i className="wi wi-fahrenheit" onClick={e => this.setState({isCelsius: false})}></i>
            </span>
            <span className="data-item">{pressure} <i className="wi wi-barometer"></i></span>
            <span className="data-item">{humidity} <i className="wi wi-humidity"></i></span>
          </div>
        </div>
      </div>
    );
  }
}
