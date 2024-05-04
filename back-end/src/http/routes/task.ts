import { Router } from "express"

import { CreateTaskController } from "../controllers/tasks/create"
import { SearchTasksController } from "../controllers/tasks/search"
import { DeleteTaskController } from "../controllers/tasks/delete"
import { MarkTaskCompleteController } from "../controllers/tasks/mark-complete"

export const taskRoutes = Router()

const createTaskController = new CreateTaskController()
const searchTasksController = new SearchTasksController()
const deleteTaskUseCase = new DeleteTaskController()
const markTaskCompleteController = new MarkTaskCompleteController()


taskRoutes.post("/", createTaskController.handler)
taskRoutes.get("/", searchTasksController.handler)
taskRoutes.delete("/:id", deleteTaskUseCase.handler)
taskRoutes.post("/mark-complete/:id", markTaskCompleteController.handler)
