import { Router } from "express"

import { RegisterController } from "../controllers/register"
import { AuthenticateController } from "../controllers/authenticate"

export const authRoutes = Router()

const registerController = new RegisterController()
const authenticateController = new AuthenticateController()

authRoutes.post("/register", registerController.handler)
authRoutes.post("/sign-in", authenticateController.handler)
