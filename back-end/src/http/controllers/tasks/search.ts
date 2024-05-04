import { NextFunction, Request, Response } from "express"

import { makeSearchTasksUseCase } from "@/use-cases/factories/make-search-tasks-use-case"

export class SearchTasksController {
  async handler(request: Request, response: Response, next: NextFunction) {
    try {
      const userId = request.user.id

      const searchTaskUseCase = makeSearchTasksUseCase()

      const { tasks } = await searchTaskUseCase.execute({ userId })
    
      return response.status(200).json({ tasks })
    } catch (error) {
      return next(error)
    }
  }
}
