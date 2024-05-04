import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error"
import { makeDeleteTaskUseCase } from "@/use-cases/factories/make-delete-task-use-case"

import { NextFunction, Request, Response } from "express"

export class DeleteTaskController {
  async handler(request: Request, response: Response, next: NextFunction) {
    try {
      const { id: taskId } = request.params

      const deleteTaskUseCase = makeDeleteTaskUseCase()

      await deleteTaskUseCase.execute({ taskId })
    
      return response.status(204).send()

    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return response.status(409).json({ message: error.message })
      }

      return next(error)
    }
  }
}
