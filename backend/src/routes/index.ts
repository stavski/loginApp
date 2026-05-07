import { Router } from "express";
import { validation } from "../shared/middlewares";

import { UserController } from "../controllers/users";
import { createUserSchema } from "../controllers/users/create-user.schema";
import { getUserSchema } from "../controllers/users/get-user.schema";
import { getAllUsersSchema } from "../controllers/users/get-all-users.schema";
import { updateUsersSchema } from "../controllers/users/update-user.schema";
import { deleteUserSchema } from "../controllers/users/delete-user.schema";

const router = Router();

router.get('/', (req, res) => { res.send('API runing!'); });

router.post("/users", validation(createUserSchema), UserController.create);
router.get("/users", validation(getAllUsersSchema), UserController.getAll);
router.get("/users/:id", validation(getUserSchema), UserController.getById);
router.put("/users/:id", validation(updateUsersSchema), UserController.update);
router.delete("/users/:id", validation(deleteUserSchema), UserController.deleteById);

export { router };