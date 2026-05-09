import { Router } from "express";
import { usersRoutes } from "./users";
import { authRoutes } from "./auth";

const router = Router();

usersRoutes.get('/', (req, res) => { res.send('API runing!'); });

router.use("/users", usersRoutes);
router.use("/auth", authRoutes);

export { router };