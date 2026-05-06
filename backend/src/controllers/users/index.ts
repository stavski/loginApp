import { create } from "./create-users.controller";
import { getById } from "./get-users.controller";
import { getAll } from "./get-all-users.controller";
import { update } from "./update-users.controller";
import { deleteById } from "./delete-users.controller";

export const UserController = {
    create,
    getById,
    getAll,
    update,
    deleteById,
};