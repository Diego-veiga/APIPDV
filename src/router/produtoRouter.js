import { Router } from 'express';
import produtoController from '../controller/produtoController';

const router = new Router();

router.post('/', produtoController.store);
router.get('/', produtoController.show);
router.get('/:id', produtoController.index);
router.put('/:id', produtoController.update);
router.delete('/:id', produtoController.delete);

export default router;
