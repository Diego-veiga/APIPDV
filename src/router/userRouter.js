import { Router } from 'express';
import userController from '../controller/userController';
import tokenRequired from '../middleware/tokenRequired';

const router = new Router();

router.post('/', tokenRequired, userController.store);
router.get('/', tokenRequired, userController.index);
router.get('/:id', tokenRequired, userController.show);
router.put('/:id', tokenRequired, userController.update);
router.delete('/:id', tokenRequired, userController.delete);

export default router;
