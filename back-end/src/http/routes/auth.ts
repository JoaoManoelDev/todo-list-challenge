import { Router } from "express"

import { RegisterController } from "../controllers/auth/register"
import { AuthenticateController } from "../controllers/auth/authenticate"

export const authRoutes = Router()

const registerController = new RegisterController()
const authenticateController = new AuthenticateController()

authRoutes.post("/register", registerController.handler)
authRoutes.post("/sign-in", authenticateController.handler)
