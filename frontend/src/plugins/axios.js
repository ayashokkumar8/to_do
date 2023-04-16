import axios from 'axios'
import token from './jwt'

console.log('process.env.NODE_ENV: ', process.env.NODE_ENV)
window.API_PATH =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:3001'
    : `https://api.${window.location.hostname.replace('www.', '')}`

const axiosInstance = axios.create({
  baseURL: window.API_PATH,
  headers: {
    Authorization: token
  }
})

export default axiosInstance
