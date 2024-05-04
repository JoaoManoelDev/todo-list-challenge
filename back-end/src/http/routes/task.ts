import { Router } from "express"

import { CreateTaskController } from "../controllers/tasks/create"

export const taskRoutes = Router()

const createTaskController = new CreateTaskController()

taskRoutes.post("/", createTaskController.handler)