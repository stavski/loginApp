import { Router } from "express";
import { validation } from "../shared/middlewares";

import { UserController } from "../controllers/users";
import { createUsersSchema } from "../controllers/users/create-user.schema";
import { getUsersSchema } from "../controllers/users/get-user.schema";
import { getAllUsersSchema } from "../controllers/users/get-all-users.schema";
import { updateUsersSchema } from "../controllers/users/update-user.schema";
import { deleteUsersSchema } from "../controllers/users/delete-user.schema";

const router = Router();

router.get('/', (req, res) => { res.send('API runing!'); });

router.post("/users", validation(createUsersSchema), UserController.create);
router.get("/users", validation(getAllUsersSchema), UserController.getAll);
router.get("/users/:id", validation(getUsersSchema), UserController.getById);
router.put("/users/:id", validation(updateUsersSchema), UserController.update);
router.delete("/users/:id", validation(deleteUsersSchema), UserController.deleteById);

export { router };