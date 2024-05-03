import { NextFunction, Request, Response } from "express"
import { ZodError } from "zod"

export const errorHandler = (
  error: Error,
  _request: Request,
  response: Response,
  _next: NextFunction,
) => {
  if (error instanceof ZodError) {
    return response
      .status(400)
      .send({ message: "Validation error", issues: error.formErrors.fieldErrors })
  }

  return response.status(500).send({ message: "Internal server error." })
}