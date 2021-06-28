/*
 * @Author: "Evan"
 * @Description:
 * @props:
 * @event:
 * @Date:
 * @LastEditors:
 * @LastEditTime:
 */
import axios from 'axios'
import Vue from 'vue'
import apiConfig from './api'
const vue = new Vue()

const service = axios.create({
  timeout: 5000,
  headers: {
    'Access-Control-Allow-Methods': 'GET, POST'
  }
})

// request拦截器
service.interceptors.request.use((config) => {
  config.headers['Content-Type'] = 'application/json'
  return config
}, (error) => {
  Promise.reject(error)
})
// respone拦截器
service.interceptors.response.use((response) => {
  const res = response.data
  const code = res.code
  const status = response.status
  if (code === 200 || code === 0 || status === 200) {
    return res
  } else {
    vue.$message.warning({
      content: '啊哦，服务器出了点问题，请稍后再试~'
    })
  }
}, (error) => {
  return error
})
/**
 * 统一请求方法
 * @param apiName {string} 方法名
 * @param params {string} 参数
 * @param config {object} 自定义配置请求
 * @return {promise}
 */
const request = (apiName, params, config) => {
  const key = null
  if (typeof apiConfig[apiName] !== 'object') {
    // 检查 方法名是否写错
    throw new TypeError('调用api函数函数错误，请检查函数名称是否错误' + apiName)
  }

  const newConfig = JSON.parse(JSON.stringify(apiConfig[apiName])) // 深拷贝方法名
  const { headers = [] } = newConfig
  newConfig.headers = {}

  if (headers.length > 0) {
    headers.forEach(({ key, value }) => {
      newConfig.headers[key] = value
    })
  }

  if (params) {
    newConfig.url = newConfig.url.replace(/\{([\d\w_]+)\}/g, (word, $1) => {
      const res = params[$1] || ''
      delete params[$1] // 将param在url中的参数删除，剩余的放进request body
      return res
    })
    if (
      ['get', 'delete', undefined].includes(apiConfig[apiName].method) ||
      apiConfig[apiName].formData
    ) {
      newConfig.params = params
    } else if (apiConfig[apiName].value) {
      let url = ''
      for (const key in params) {
        if (Object.prototype.hasOwnProperty.call(params, key)) {
          if (typeof params[key] === 'object') {
            const jsonStr = encodeURIComponent(JSON.stringify(params[key]))
            url += `&${key}=${jsonStr}`
          } else {
            url += `&${key}=${params[key]}`
          }
        }
      }
      url.replace('&', '?')
      newConfig.url += url.replace('&', '?')
      newConfig.data = null
    } else {
      newConfig.data = params
    }
  } else if (config && Object.keys(config).length > 0) {
    for (const [key] of Object.entries(config)) {
      newConfig[key] = Object.assign(config[key], newConfig[key])
    }
  }
  return service(newConfig)
}

export default request
