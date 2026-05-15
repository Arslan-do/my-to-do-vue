import axios, { type AxiosInstance } from 'axios'

export function useAxios(): AxiosInstance {
  return axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
  })
}

