import axios from 'axios'

const request = axios.create({
  baseURL: 'http://localhost:8081/cms/'
})

export default request
