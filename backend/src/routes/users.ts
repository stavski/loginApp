import { Router } from "express";
import { validation } from "../shared/middlewares";

import { UserController } from "../controllers/users";

import { createUserSchema } from "../controllers/users/create-user.schema";
import { getUserSchema } from "../controllers/users/get-user.schema";
import { getAllUsersSchema } from "../controllers/users/get-all-users.schema";
import { updateUsersSchema } from "../controllers/users/update-user.schema";
import { deleteUserSchema } from "../controllers/users/delete-user.schema";
import { updateUserPasswordSchema } from "../controllers/users/update-user-password.schema";

const usersRoutes = Router();

usersRoutes.post("/", validation(createUserSchema), UserController.create);
usersRoutes.get("/", validation(getAllUsersSchema), UserController.getAll);
usersRoutes.get("/:id", validation(getUserSchema), UserController.getById);
usersRoutes.put("/:id", validation(updateUsersSchema), UserController.update);
usersRoutes.delete("/:id", validation(deleteUserSchema), UserController.deleteById);
usersRoutes.patch("/:id/update-password", validation(updateUserPasswordSchema), UserController.updatePassword);

export { usersRoutes };