import axios from 'axios'

export const nextApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_NEXT_API
})
