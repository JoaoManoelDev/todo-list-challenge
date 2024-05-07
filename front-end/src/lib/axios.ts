import { deleteCookie, getCookie, hasCookie } from "cookies-next"
import axios from "axios"

const baseUrl = "http://localhost:3333"

export const http = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
})

http.interceptors.request.use(
  async (config) => {
    const token = getCookie("@todo:token-auth")

    config.headers.Authorization = `Bearer: ${token}`
    return config
  },
  (error) => {
    return error
  }
)
