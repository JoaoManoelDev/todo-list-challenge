import { Router } from "express"

import { CreateTaskController } from "../controllers/tasks/create"
import { SearchTasksController } from "../controllers/tasks/search"
import { DeleteTaskController } from "../controllers/tasks/delete"
import { ToggleTaskCompletedController } from "../controllers/tasks/toggle-completed"

export const taskRoutes = Router()

const createTaskController = new CreateTaskController()
const searchTasksController = new SearchTasksController()
const deleteTaskUseCase = new DeleteTaskController()
const toggleTaskCompletedController = new ToggleTaskCompletedController()

taskRoutes.post("/", createTaskController.handler)
taskRoutes.get("/", searchTasksController.handler)
taskRoutes.delete("/:id", deleteTaskUseCase.handler)
taskRoutes.patch("/toggle-completed/:id", toggleTaskCompletedController.handler)
