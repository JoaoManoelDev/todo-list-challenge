import { NextFunction, Request, Response } from "express"
import { env } from "process"
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

  if (env.NODE_ENV !== "production") {
    console.log("[ERROR]", error)
  } else {
    // TODO: Here we should log to an external tool like DataDog/NewRelic/Sentry
  }

  return response.status(500).send({ message: "Internal server error." })
}