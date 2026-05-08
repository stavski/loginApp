import { create } from "./create-user.controller";
import { getById } from "./get-user.controller";
import { getAll } from "./get-all-users.controller";
import { update } from "./update-user.controller";
import { deleteById } from "./delete-user.controller";
import { updatePassword } from "./update-user-password.controller";

export const UserController = {
    create,
    getById,
    getAll,
    update,
    deleteById,
    updatePassword,
};