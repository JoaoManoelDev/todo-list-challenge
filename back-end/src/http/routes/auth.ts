import { Router } from "express"

import { RegisterController } from "../controllers/register"

export const authRoutes = Router()

const registerController = new RegisterController()

authRoutes.post("/register", registerController.handler)