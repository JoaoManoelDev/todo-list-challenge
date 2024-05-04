import { Router } from "express"

import { authRoutes } from "./auth"
import { taskRoutes } from "./task"
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated"

export const routes = Router()

routes.use("/auth", authRoutes)
routes.use("/task", ensureAuthenticated, taskRoutes)