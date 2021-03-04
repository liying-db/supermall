import axios from 'axios'

export function request(config) {
  const instance = new axios.create({
    baseURL: 'http://152.136.185.210:7878/api/m5/',
    timeout: 5000
  })

  instance.interceptors.response.use(res => res.data, err => {
    console.lof(err)
  })

  return instance(config)
}