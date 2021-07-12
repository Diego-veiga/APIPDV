import { Router } from 'express';
import vendaController from '../controller/vendaController';

const router = new Router();

router.post('/', vendaController.store);
router.get('/', vendaController.index);
router.get('/:id', vendaController.show);
router.delete('/:id', vendaController.delete);

export default router;
