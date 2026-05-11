import { Router } from "express";
import { validation, auth } from "../shared/middlewares";

import { AuthController } from "../controllers/auth";

import { loginSchema } from "../controllers/auth/login.schema";
import { refreshSchema } from "../controllers/auth/refresh.schema";

const authRoutes = Router();

authRoutes.post("/login", validation(loginSchema), AuthController.login);
authRoutes.get("/me", auth, AuthController.me);
authRoutes.post("/refresh", validation(refreshSchema), AuthController.refresh);

export { authRoutes };