import { Router } from "express";
import { validation, auth } from "../shared/middlewares";

import { UserController } from "../controllers/users";

import { createUserSchema } from "../controllers/users/create-user.schema";
import { getUserSchema } from "../controllers/users/get-user.schema";
import { getAllUsersSchema } from "../controllers/users/get-all-users.schema";
import { updateUsersSchema } from "../controllers/users/update-user.schema";
import { deleteUserSchema } from "../controllers/users/delete-user.schema";
import { updateUserPasswordSchema } from "../controllers/users/update-user-password.schema";

const usersRoutes = Router();

usersRoutes.post("/", validation(createUserSchema), UserController.create);
usersRoutes.get("/", auth, validation(getAllUsersSchema), UserController.getAll);
usersRoutes.get("/:id", auth, validation(getUserSchema), UserController.getById);
usersRoutes.put("/:id", auth,validation(updateUsersSchema), UserController.update);
usersRoutes.delete("/:id", auth, validation(deleteUserSchema), UserController.deleteById);
usersRoutes.patch("/:id/update-password", auth,validation(updateUserPasswordSchema), UserController.updatePassword);

export { usersRoutes };