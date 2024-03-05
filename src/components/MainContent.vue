<template>
    <div class="main-content">
      <div class="weather-box">
        <div class="z">
          <img v-if="weather" :src="weatherIconUrl" alt="Weather Icon">
        </div>
        <div class="z text">
          <span v-if="weather" class="temperature z">{{ weather ? temperature : '-' }}</span>
          <div>
            <p v-if="weather" class="description">{{ weather ? weather.description : '-' }}</p>
            <p v-if="weather" class="feel">体感温度：{{ weather ? feelTemperature : '-' }}</p>
          </div>
        </div>
      </div>
      <div class="info-boxes">
        <div class="info-box">气压：{{ weather ? weather.pressure : '-' }}hPa</div>
        <div class="info-box">能见度：{{ weather ? weather.visibility : '-' }}km</div>
        <div class="info-box">风速：{{ weather ? weather.wind_speed : '-' }}m/s</div>
        <div class="info-box">测量时间：{{ weather ? weather.measurement_time : '-' }}（北京时间 UTC+8）</div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      weather: Object,
      temperatureUnit: String,
      loading: Boolean
    },
    computed: {
      temperature() {
        if (this.weather) {
          return this.temperatureUnit === 'Celsius' ? `${this.weather.temperatureCelsius.toFixed(1)}°C` : `${this.weather.temperatureFahrenheit.toFixed(1)}°F`;
        }
        return '-';
      },
      feelTemperature() {
        if (this.weather) {
          return this.temperatureUnit === 'Celsius' ? `${this.weather.feels_like_celsius.toFixed(1)}°C` : `${this.weather.feels_like_fahrenheit.toFixed(1)}°F`;
        }
        return '-';
      },
      weatherIconUrl() {
        if (this.weather && this.weather.icon) {
          return `https://openweathermap.org/img/wn/${this.weather.icon}@2x.png`;
        }
        return '';
      }
    }
  };
  </script>
  
  <style scoped>
  .main-content {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
  }
  .weather-box {
    width: 50%;
    min-width: 300px;
    min-height: 180px;
    overflow-y: auto;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 10px;
    margin-right: 20px;
    padding: 10px;
  }
  
  .weather-box img {
    width: 150px;
    height: 150px;
  }
  
  .info-boxes {
    display: flex;
    flex-direction: column;
    flex: 1;
    max-width: 50%;
  }
  
  .info-box {
    padding: 10px;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 10px;
    margin-bottom: 10px;
  }
  .temperature{
  margin-left: 8px;
  font-size: 60px;
  align-items: center;
}
.text{
  margin-top: 40px;
}
@media (max-width: 768px) {
  .main-content{
    display: flex;
    flex-direction:column;
    width: 100%;
    align-items: center;
    text-align: center;
  }
  .weather-box {
    display: flex;
    flex-direction:column;
    min-width: 100%;
    min-height: 180px;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 10px;
    overflow-y: auto;
    margin-right: 0px;
    align-items: center;
    text-align: center;
    padding: 0px;
  }
  .info-boxes {
    flex-direction: column;
    flex: 1;
    min-width: 100%;
    width: 100%;
    margin-top: 10px;
  }
  .info-box {
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 10px;
    margin-bottom: 10px;
    
  }
  .text{
    margin-top: 0px;
  }
  .temperature{
    margin-left: 8px;
    font-size: 60px;
    align-items: center;
}
  .weather-box img {
    width: 150px;
    height: 150px;
    margin: 0 auto;
  }
}
  </style>
  