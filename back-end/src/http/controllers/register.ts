import { NextFunction, Request, Response } from "express"
import { z } from "zod"

import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error"
import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case"

export class RegisterController {
  async handler(request: Request, response: Response, next: NextFunction) {
    try {
      const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
      })

      const { email, name, password } = registerBodySchema.parse(request.body)

        const registerUseCase = makeRegisterUseCase()
    
        await registerUseCase.execute({ name, email, password })
    } catch (error) {
      if (error instanceof UserAlreadyExistsError) {
        return response.status(409).send({ message: error.message })
      }

      return next(error)
    }

    return response.status(201).end()
  }
}
