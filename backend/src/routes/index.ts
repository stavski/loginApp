import { Router } from 'express';

import { UserController } from '../controllers';

const router = Router();

router.get('/', (req, res) => { res.send('API runing!'); });

router.post('/users', UserController.create);

export { router };