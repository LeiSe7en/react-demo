import axios from 'axios'

const request = axios.create({
  baseURL: 'https://randomuser.me/api/',
  responseType: 'json'
})

request.interceptors.response.use(function (response) {
  if (response && response.data) {
    return response.data
  }
  return response
})

export default request

