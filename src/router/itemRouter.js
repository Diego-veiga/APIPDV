import { Router } from 'express';
import itemController from '../controller/itemController';
import tokenRequired from '../middleware/tokenRequired';

const router = new Router();

router.post('/', tokenRequired, itemController.store);
router.get('/:venda_id', tokenRequired, itemController.itemVenda);
router.delete('/:id', tokenRequired, itemController.delete);
router.get('/:id', tokenRequired, itemController.show);

export default router;
