import axios from 'axios';
import { API_KEY } from '../constants';

export const fetchWeather = (lat, lon) => {
  let API_URL = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  return axios.get(API_URL)
    .then(res => {
      // console.log(res.data);
      return res.data;
    })
    .catch(err => {
      console.error(err);
    })
}
