import axios from 'axios'

export const citiesApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CITIES_API
})
