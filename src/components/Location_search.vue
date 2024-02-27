<template>
  <div>
    <h2>查询天气</h2>
    <input type="text" v-model="city" placeholder="输入城市名称">
    <button @click="fetchWeather">查询</button>
    
    <div v-if="weather">
      <p>Weather: {{ weather.weather }}</p>
      <p>Temperature: {{ weather.temperature_C }}</p>
      <p>Feels Like: {{ weather.feels_like }}</p>
      <p>Pressure: {{ weather.pressure }}</p>
      <p>Visibility: {{ weather.visibility }}</p>
      <p>Wind Speed: {{ weather.wind_speed }}</p>
      <p>Measurement Time: {{ weather.measurement_time }}</p>
    </div>
    <div v-else>
      <p v-if="loading">Loading...</p>
      <p v-else>No weather data available</p>
    </div>
  </div>
</template>

<script>
import { postSearchLocation } from '@/api/api';

export default {
  data() {
    return {
      city: '',
      weather: null,
      loading: false
    };
  },
  methods: {
    async fetchWeather() {
      if (!this.city) return;
      
      this.loading = true;
      
      try {
        const response = await postSearchLocation(this.city);
        this.weather = response.data;
      } catch (error) {
        console.error('Error fetching weather data:', error);
        this.weather = null;
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style>
/* 样式 */
</style>
