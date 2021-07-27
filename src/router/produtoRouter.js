import { Router } from 'express';
import produtoController from '../controller/produtoController';
import tokenRequired from '../middleware/tokenRequired';

const router = new Router();

router.post('/', tokenRequired, tokenRequired, produtoController.store);
router.get('/', tokenRequired, tokenRequired, produtoController.show);
router.get('/:id', tokenRequired, tokenRequired, produtoController.index);
router.put('/:id', tokenRequired, tokenRequired, produtoController.update);
router.delete('/:id', tokenRequired, tokenRequired, produtoController.delete);

export default router;
