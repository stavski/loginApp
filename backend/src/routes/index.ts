import { Router } from "express";
import { validation } from "../shared/middlewares";
import { UserController } from "../controllers/users";

const router = Router();

router.get('/', (req, res) => { res.send('API runing!'); });

router.post(
    "/users",
    validation(UserController.createUserSchema),
    UserController.createUser
);


/*
router.get('/user/:id', UserController.getUserValidation, UserController.getById);
router.get('/users', UserController.listUsersValidation, UserController.listUsers);
*/

export { router };