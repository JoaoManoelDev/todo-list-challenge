import { NextFunction, Request, Response } from "express"

import { makeToggleTaskCompletedTaskUseCase } from "@/use-cases/factories/make-toggle-task-completed-use-case"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error"

export class ToggleTaskCompletedController {
  async handler(request: Request, response: Response, next: NextFunction) {
    try {
      const taskId = request.params.id

      console.log("TASK ID", taskId)

      const toggleTaskCompletedUseCase = makeToggleTaskCompletedTaskUseCase()

      const { task } = await toggleTaskCompletedUseCase.execute({ taskId })
    
      return response.status(200).json({ task })
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return response.status(409).json({ message: error.message })
      }

      return next(error)
    }
  }
}
