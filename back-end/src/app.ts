import express from "express"

import { routes } from "@/http/routes"
import { errorHandler } from "@/middlewares/error"

const app = express()

app.use(express.json())

app.use(routes)

app.use(errorHandler)

export { app }