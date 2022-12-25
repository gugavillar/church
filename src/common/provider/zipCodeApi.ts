import axios from 'axios'

export const zipCodeApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ZIP_CODE_API
})
