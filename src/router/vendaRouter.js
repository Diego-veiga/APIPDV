import { Router } from 'express';
import vendaController from '../controller/vendaController';
import tokenRequired from '../middleware/tokenRequired';

const router = new Router();

router.post('/', tokenRequired, vendaController.store);
router.get('/', tokenRequired, vendaController.index);
router.get('/:id', tokenRequired, vendaController.show);
router.delete('/:id', tokenRequired, vendaController.delete);

export default router;
