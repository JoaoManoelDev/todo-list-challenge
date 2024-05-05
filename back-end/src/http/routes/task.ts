import { Router } from "express"

import { CreateTaskController } from "../controllers/tasks/create"
import { SearchTasksController } from "../controllers/tasks/search"
import { DeleteTaskController } from "../controllers/tasks/delete"
import { ToggleTaskCompletedController } from "../controllers/tasks/toggle-completed"
import { UpdateTaskController } from "../controllers/tasks/update"

export const taskRoutes = Router()

const createTaskController = new CreateTaskController()
const searchTasksController = new SearchTasksController()
const deleteTaskUseCase = new DeleteTaskController()
const toggleTaskCompletedController = new ToggleTaskCompletedController()
const updateTaskController = new UpdateTaskController()

taskRoutes.post("/", createTaskController.handler)
taskRoutes.get("/", searchTasksController.handler)
taskRoutes.delete("/:id", deleteTaskUseCase.handler)
taskRoutes.patch("/toggle-completed/:id", toggleTaskCompletedController.handler)
taskRoutes.put("/:id", updateTaskController.handler)
