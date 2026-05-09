import { Router } from "express";
import { validation } from "../shared/middlewares";

import { AuthController } from "../controllers/auth";

import { loginSchema } from "../controllers/auth/login.schema";

const authRoutes = Router();

authRoutes.post("/login", validation(loginSchema), AuthController.login);

export { authRoutes };