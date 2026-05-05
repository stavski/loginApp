import { create } from "./create-user.controller";
import { getById } from "./get-users.controller";
import { getAll } from "./get-all-users.controller";

export const UserController = {
    create,
    getById,
    getAll,
};