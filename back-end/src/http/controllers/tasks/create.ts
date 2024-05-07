import { NextFunction, Request, Response } from "express"
import { z } from "zod"

import { makeCreateTaskUseCase } from "@/use-cases/factories/make-create-task-use-case"

export class CreateTaskController {
  async handler(request: Request, response: Response, next: NextFunction) {
    try {
      const userId = request.user.id

      const createTaskBodySchema = z.object({
        title: z.string(),
      })

      const { title } = createTaskBodySchema.parse(request.body)

      const createTaskUseCase = makeCreateTaskUseCase()

      const { task } = await createTaskUseCase.execute({ title, userId })
    
      return response.status(201).json(task)
    } catch (error) {
      return next(error)
    }
  }
}
