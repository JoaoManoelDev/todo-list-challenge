import { NextFunction, Request, Response } from "express"
import { JsonWebTokenError, verify } from "jsonwebtoken"

import { env } from "@/env"
import { InvalidTokenError } from "@/errors/invalid-token-error"

interface Payload {
  sub: string
  name: string
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const authHeader = request.headers.authorization

    if (!authHeader) {
      throw new InvalidTokenError()
    }

    const [_bearer, token] = authHeader.split(" ")

    const {
      sub: userId,
      name: userName
    } = verify(token, env.JWT_SECRET) as Payload

    request.user = {
      id: userId,
      name: userName
    }

    return next()
  } catch(error) {
    if (error instanceof InvalidTokenError) {
      return response.status(401).send({ message: error.message })
    }

    if (error instanceof JsonWebTokenError) {
      return response.status(401).send({ message: "Jwt malformed." })
    }

    return next(error)
  }
}