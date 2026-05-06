import { Router } from "express";
import { validation } from "../shared/middlewares";

import { UserController } from "../controllers/users";
import { createUsersSchema } from "../controllers/users/create-users.schema";
import { getUsersSchema } from "../controllers/users/get-user.schema";
import { getAllUsersSchema } from "../controllers/users/get-all-users.schema";
import { updateUsersSchema } from "../controllers/users/update-users.schema";

const router = Router();

router.get('/', (req, res) => { res.send('API runing!'); });

router.post("/users", validation(createUsersSchema), UserController.create);
router.get("/users", validation(getAllUsersSchema), UserController.getAll);
router.get("/users/:id", validation(getUsersSchema), UserController.getById);

router.put("/users/:id", validation(updateUsersSchema), UserController.update);

export { router };