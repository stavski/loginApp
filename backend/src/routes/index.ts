import { Router } from "express";
import { validation } from "../shared/middlewares";

import { UserController } from "../controllers/users";
import { createSchema } from "../controllers/users/create-user.schema";
import { getSchema } from "../controllers/users/get-user.schema";
import { getAllSchema } from "../controllers/users/get-all-users.schema";

const router = Router();

router.get('/', (req, res) => { res.send('API runing!'); });

router.post("/users", validation(createSchema), UserController.create);
router.get("/users", validation(getAllSchema), UserController.getAll);
router.get("/user/:id", validation(getSchema), UserController.getById);

export { router };