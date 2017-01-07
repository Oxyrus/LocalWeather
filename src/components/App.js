import React, { Component } from 'react';

import LoadingSpinner from './LoadingSpinner';
import { fetchWeather } from '../api';

class App extends Component {
  constructor() {
    super();

    this.state = {
      loading: true
    };
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(location  => {
        fetchWeather(location.coords.latitude, location.coords.longitude)
          .then(data => {
            this.setState({
              temp: data.main.temp,
              pressure: data.main.pressure,
              humidity: data.main.humidity,
              city: data.name,
              country: data.sys.country,
              loading: false
            });
          })
          .catch(err => {
            console.error(err);
          });
    });
  }

  render() {
    let { temp, pressure, humidity, city, loading, country } = this.state;

    if (loading) {
      return <LoadingSpinner />;
    }

    return (
      <div className="container">
        {temp}, {pressure}, {humidity}, {city}, {country}
      </div>
    );
  }
}

export default App;
