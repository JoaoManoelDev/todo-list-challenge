import { Router } from "express"

import { CreateTaskController } from "../controllers/tasks/create"
import { SearchTasksController } from "../controllers/tasks/search"

export const taskRoutes = Router()

const createTaskController = new CreateTaskController()
const searchTasksController = new SearchTasksController()

taskRoutes.post("/", createTaskController.handler)
taskRoutes.get("/", searchTasksController.handler)
