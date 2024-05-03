import { NextFunction, Request, Response } from "express"
import { z } from "zod"

import { makeAuthenticateUseCase } from "@/use-cases/factories/make-authenticate-use-case"
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error"

export class AuthenticateController {
  async handler(request: Request, response: Response, next: NextFunction) {
    try {
      const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6)
      })
    
      const { email, password } = authenticateBodySchema.parse(request.body)

      const authenticateUseCase = makeAuthenticateUseCase()
  
      await authenticateUseCase.execute({ email, password })
    } catch (error) {
      if (error instanceof InvalidCredentialsError) {
        return response.status(409).send({ message: error.message })
      }

      return next(error)
    }

    return response.status(200).end()
  }
}
