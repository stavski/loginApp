import { login } from "./login.controller";
import { me } from "./me.controller";
import { refresh } from "./refresh-token.controller";

export const AuthController = {
    login,
    me,
    refresh,
};