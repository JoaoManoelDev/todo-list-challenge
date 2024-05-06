import axios from "axios"

const baseUrl = "http://localhost:3333"

export const http = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
})
