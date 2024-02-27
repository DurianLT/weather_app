<template>
  <div id="app">
    <h1>Weather App</h1>
    <Location_search />
    <div v-if="weatherData">
      <p>Weather: {{ weatherData.weather }}</p>
      <p>Temperature: {{ weatherData.temperature_C }}</p>
      <p>Feels Like: {{ weatherData.feels_like }}</p>
      <p>Pressure: {{ weatherData.pressure }}</p>
      <p>Visibility: {{ weatherData.visibility }}</p>
      <p>Wind Speed: {{ weatherData.wind_speed }}</p>
      <p>Measurement Time: {{ weatherData.measurement_time }}</p>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
import { get_weather } from './api/api'; 
import Location_search from './components/Location_search.vue'

export default {
  name: 'App',
  data() {
    return {
      weatherData: null
    };
  },
  mounted() {
    this.getWeather();
  },
  methods: {
    async getWeather() {
      try {
        const response = await get_weather();
        this.weatherData = response.data;
      } catch (error) {
        console.error('Error fetching weather data:', error);
        // 输出错误的详细信息
        console.error('Error details:', error.response);
      }
    }
  },
  components: {
    Location_search // 注册Location_search组件
  } 
};

</script>

<style>
#app {
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
}
</style>

