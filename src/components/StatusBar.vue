<template>
    <div class="status-bar">
      <span class="left z">
        <span>位置:{{ weather ? weather.name : '城市名称' }}</span>
      </span>
      <span class="right y">
        <span class="y">
          <span>{{ temperatureUnit === 'Celsius' ? '切换到华氏度' : '切换到摄氏度' }}</span>
          <div class="y">
            <input id="cmn-toggle-1" class="cmn-toggle cmn-toggle-round" type="checkbox" @click="toggleUnit">
            <label for="cmn-toggle-1"></label>
          </div>
        </span>
      </span>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      weather: Object,
      temperatureUnit: String
    },
    methods: {
      toggleUnit() {
        this.$emit('toggleUnit');
      }
    }
  };
  </script>
  
  <style scoped>
  .status-bar {
    width: 100%;
    height: 28px;
    line-height: 28px;
    z-index: 1;
    margin: 5px;
  }
  
  .status-bar span {
    text-decoration: none;
    color: #dddddd;
  }
  .cmn-toggle {
  position: absolute;
  margin-left: -9999px;
  visibility: hidden;
}
.cmn-toggle + label {
  display: block;
  position: relative;
  cursor: pointer;
  outline: none;
  user-select: none;
}
input.cmn-toggle-round + label {
  padding: 2px;
  width: 40px;
  height: 20px;
  background-color: #dddddd;
  border-radius: 60px;
  margin-top: 5px;
  margin-left: 3px;
}
input.cmn-toggle-round + label:before,
input.cmn-toggle-round + label:after {
  display: block;
  position: absolute;
  top: 1px;
  left: 1px;
  bottom: 1px;
  content: "";
}
input.cmn-toggle-round + label:before {
  right: 1px;
  background-color: #f1f1f1;
  border-radius: 60px;
  transition: background 0.4s;
}
input.cmn-toggle-round + label:after {
  width: 22px;
  background-color: #fff;
  border-radius: 100%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  transition: margin 0.4s;
}
input.cmn-toggle-round:checked + label:before {
  background-color: #707070;
}
input.cmn-toggle-round:checked + label:after {
  margin-left: 20px;
}
  </style>
  