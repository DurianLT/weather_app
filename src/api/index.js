//import Vue from 'vue';
import Axios from 'axios';

// 创建一个带有配置选项的 Axios 实例
const axiosInstance = Axios.create({
    withCredentials: true // 启用发送请求时携带凭据
})

// 拦截请求，在发送前进行处理
axiosInstance.interceptors.request.use((config) => {
    // 添加 X-Requested-With 头部以指示为 XMLHttpRequest
    config.headers['X-Requested-With'] = 'XMLHttpRequest'

    // 从 cookies 中提取 CSRF 令牌并添加到请求头部
    const regex = /.*csrftoken=([^;.]*).*$/
    config.headers['X-CSRFToken'] = document.cookie.match(regex) === null ? null : document.cookie.match(regex)[1]

    return config
})

// 拦截响应，在处理前进行处理
axiosInstance.interceptors.response.use(
    response => {
        return response // 返回响应
    },
    error => {
        return Promise.reject(error) // 返回带有错误的被拒绝的 Promise
    }
)

// 将 Axios 实例添加到 Vue 原型中以便全局访问
//Vue.prototype.axios = axiosInstance

// 导出 Axios 实例
export default axiosInstance
