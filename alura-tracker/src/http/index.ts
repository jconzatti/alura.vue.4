import axios, { type AxiosInstance } from 'axios'

const clienteHTTP: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000/',
})

export default clienteHTTP
