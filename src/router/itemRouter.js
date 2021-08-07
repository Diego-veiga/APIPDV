import { Router } from 'express';
import itemController from '../controller/itemController';
import tokenRequired from '../middleware/tokenRequired';
import validateRequest from '../middleware/validateRequest';
import itemSchema from '../schemas/itemSchema';

const router = new Router();

router.post('/', validateRequest(itemSchema.post, 'body'), tokenRequired, itemController.store);
router.get('/:venda_id', validateRequest(itemSchema.getVenda, 'params'), tokenRequired, itemController.itemVenda);
router.delete('/:id', validateRequest(itemSchema.get, 'params'), tokenRequired, itemController.delete);
router.get('/:id', validateRequest(itemSchema.get, 'params'), tokenRequired, itemController.show);

export default router;
