import { Router } from 'express';
import userController from '../controller/userController';
import tokenRequired from '../middleware/tokenRequired';
import validateRequest from '../middleware/validateRequest';
import userSchemas from '../schemas/userSchema';

const router = new Router();

router.post('/', validateRequest(userSchemas.post, 'body'), tokenRequired, userController.store);
router.get('/', tokenRequired, userController.index);
router.get('/:id', validateRequest(userSchemas.get, 'params'), tokenRequired, userController.show);
router.put('/:id', validateRequest(userSchemas.get, 'params'), validateRequest(userSchemas.update, 'body'), tokenRequired, userController.update);
router.delete('/:id', validateRequest(userSchemas.get, 'params'), tokenRequired, userController.delete);

export default router;
