import { Router } from "express"

import { TaskController } from "../controllers/task"

export const taskRoutes = Router()

const taskController = new TaskController()

taskRoutes.post("/", taskController.handler)