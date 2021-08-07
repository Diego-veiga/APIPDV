import { Router } from 'express';
import vendaController from '../controller/vendaController';
import tokenRequired from '../middleware/tokenRequired';
import validateRequest from '../middleware/validateRequest';
import vendaSchema from '../schemas/vendaSchema';

const router = new Router();

router.post('/', tokenRequired, vendaController.store);
router.get('/', tokenRequired, vendaController.index);
router.get('/:id', validateRequest(vendaSchema.get, 'params'), tokenRequired, vendaController.show);
router.put('/:id', validateRequest(vendaSchema.get, 'params'), tokenRequired, vendaController.update);
router.delete('/:id', validateRequest(vendaSchema.get, 'params'), tokenRequired, vendaController.delete);

export default router;
