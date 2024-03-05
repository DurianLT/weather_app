<template>
  <div class="pc-container">
    <div class="header">
      <div class="title"></div>
      <div class="container">
        <input type="text" placeholder="Search...（按下回车以搜索）" v-model="city" @keyup.enter="getWeatherByCity">
        <div class="search"></div>
      </div>
    </div>
    <div class="body">
      <StatusBar :weather="weather" :temperatureUnit="temperatureUnit" @toggleUnit="toggleUnit" />
      <MainContent :weather="weather" :temperatureUnit="temperatureUnit" :loading="loading" />
    </div>
    
  </div>
</template>

<script>
import StatusBar from './components/StatusBar.vue';
import MainContent from './components/MainContent.vue';

export default {
  components: {
    StatusBar,
    MainContent
  },
  data() {
    return {
      weather: null,
      city: '',
      temperatureUnit: 'Celsius',
      loading: false,
    };
  },
  created() {
    // 组件创建时自动获取当前位置的天气
    this.getCurrentLocationWeather();
  },
  methods: {
    getCurrentLocationWeather() {
      // 显示加载状态
      this.loading = true;
      // 获取用户当前位置的经纬度
      navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        this.getWeather(lat, lon);
      });
    },
    getWeatherByCity() {
      // 显示加载状态
      this.loading = true;
      // 调用后端接口获取城市经纬度
      fetch(`http://127.0.0.1:8000//api/get_coordinates_by_city?city=${this.city}`)
        .then(response => response.json())
        .then(data => {
          const lat = data.lat;
          const lon = data.lon;
          this.getWeather(lat, lon);
        });
    },
    getWeather(lat, lon) {
      // 调用后端接口获取天气信息
      fetch(`http://127.0.0.1:8000//api/get_weather?lat=${lat}&lon=${lon}`)
        .then(response => response.json())
        .then(data => {
          this.weather = data;
          // 加载完成后隐藏加载状态
          this.loading = false;
        });
    },
    toggleUnit() {
      this.temperatureUnit = this.temperatureUnit === 'Celsius' ? 'Fahrenheit' : 'Celsius';
    },
  }
};
</script>

<style>
/*左对齐*/
.z{
  float:left;
}
/*右对齐*/
.y{
  float:right;
}
/*居中显示*/
.wp{
  width:960px;
  margin:0 px;
}
/*清除浮动*/
.cl{
  clear:both;
}
.pc-container {
  position: relative;
}

.title {
	background: linear-gradient( rgb(0, 0, 0),rgba(255, 0, 0, 0));
	width:100%;
	height:28px;
	line-height:28px;
  z-index: 1;
}

.container {
  position: absolute;
  justify-content: center;
  margin-top: 0px;
  width: 100vw;
  height: 100px;
}

.search {
  position: absolute;
  margin: auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 80px;
  height: 80px;
  background: #92b5e2;
  border-radius: 50%;
  transition: all 1s;
  z-index: 4;
  box-shadow: 0 0 25px 0 rgba(0, 0, 0, 0.4);
}

.search:hover {
  cursor: pointer;
}

.search::before {
  content: "";
  position: absolute;
  margin: auto;
  top: 22px;
  right: 0;
  bottom: 0;
  left: 22px;
  width: 12px;
  height: 2px;
  background: white;
  transform: rotate(45deg);
  transition: all .5s;
}

.search::after {
  content: "";
  position: absolute;
  margin: auto;
  top: -5px;
  right: 0;
  bottom: 0;
  left: -5px;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 2px solid white;
  transition: all .5s;
}

input {
  position: absolute;
  margin: auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 50px;
  height: 50px;
  outline: none;
  border: none;
  background: #92b5e2;
  color: white;
  text-shadow: 0 0 10px #92b5e2;
  padding: 0 80px 0 20px;
  border-radius: 30px;
  box-shadow: 0 0 25px 0 #92b5e2,
              0 20px 25px 0 rgba(0, 0, 0, 0.2);
  transition: all 1s;
  opacity: 0;
  z-index: 5;
  letter-spacing: 0.1em;
}

input:hover {
  cursor: pointer;
}

input:focus {
  width: 240px;
  opacity: 1;
  cursor: text;
}

input:focus ~ .search {
  right: -250px;
  background: #151515;
  z-index: 6;
}

input::placeholder {
  color: white;
  opacity: 0.5;
}

.body{
  position: relative;
  min-width: 150px;
  min-height: 80vh;
  margin-bottom:  0%;
  margin-top: 15vh;
  margin-left:10%;
  margin-right: 10%;
  background-color: rgb(36 36 36 / 1);
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 12px;
  box-shadow: rgb(0 0 0 / 40%) 0px 0px 50px 8px;
}

</style>
