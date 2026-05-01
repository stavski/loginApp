import { Router } from 'express';
import { UserController } from '../controllers';
import { validation } from '../shared/middlewares';
import { createUserSchema } from '../controllers/users/user.schema';

const router = Router();

router.get('/', (req, res) => { res.send('API runing!'); });

router.post('/users', validation({ body: createUserSchema }), UserController.create);

export { router };