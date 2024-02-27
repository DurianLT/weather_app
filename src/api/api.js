import axiosInstance from "./index";

const axios = axiosInstance
export const get_weather = () => { return axios.get(`http://127.0.0.1:8000/api/get_weather/`) }

export const postSearchLocation = (city_name) => { return axios.post('http://localhost:8000/api/search_location/', { 'city_name' : city_name }) }