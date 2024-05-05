import { NextFunction, Request, Response } from "express"
import { z } from "zod"

import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error"
import { makeUpdateTaskUseCase } from "@/use-cases/factories/make-update-task-use-case"

export class UpdateTaskController {
  async handler(request: Request, response: Response, next: NextFunction) {
    try {
      const taskId = request.params.id

      const updateTaskBodySchema = z.object({
        title: z.string(),
        isCompleted: z.boolean()
      })

      const { title, isCompleted } = updateTaskBodySchema.parse(request.body)

      const updateTaskUseCase = makeUpdateTaskUseCase()

      const { task } = await updateTaskUseCase.execute({
        taskId,
        taskUpdate: {
          title,
          isCompleted
        }
      })
    
      return response.status(200).json({ task })
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return response.status(409).json({ message: error.message })
      }

      return next(error)
    }
  }
}
