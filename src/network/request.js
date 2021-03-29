import axios from 'axios'

export function request(config) {
  const instance = new axios.create({
    baseURL: 'http://152.136.185.210:7878/api/m5/',
    timeout: 5000
  })

  instance.interceptors.response.use(res => res.data, err => {
    console.log(err)
  })

  return instance(config)
}

export function request1(config) {
  const instance = new axios.create({
    baseURL: ';;;',
    timeout: '400'
  })

  return instance(config)
}