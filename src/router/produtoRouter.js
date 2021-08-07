import { Router } from 'express';
import produtoController from '../controller/produtoController';
import tokenRequired from '../middleware/tokenRequired';
import validateRequest from '../middleware/validateRequest';
import produtoSchema from '../schemas/produtoSchema';

const router = new Router();

router.post('/', validateRequest(produtoSchema.post, 'body'), tokenRequired, tokenRequired, produtoController.store);
router.get('/', tokenRequired, tokenRequired, produtoController.show);
router.get('/:id', validateRequest(produtoSchema.get, 'params'), tokenRequired, tokenRequired, produtoController.index);
router.put('/:id', validateRequest(produtoSchema.get, 'params'), validateRequest(produtoSchema.put, 'body'), tokenRequired, produtoController.update);
router.delete('/:id', validateRequest(produtoSchema.get, 'params'), tokenRequired, produtoController.delete);

export default router;
