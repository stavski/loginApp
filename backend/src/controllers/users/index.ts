import * as createUser from "./create-user.controller";
import * as createUserSchema from "./create-user.schema";

/*
import * as getById from "./get-user.controller";
import * as getUserValidation from "./get-user.validation";

import * as listUsers from "./list-users.controller";
import * as listUsersValidation from "./list-users.validation";
*/

export const UserController = {
    ...createUser,
    ...createUserSchema,
};