import { Router } from 'express';
import itemController from '../controller/itemController';

const router = new Router();

router.post('/', itemController.store);
router.get('/:venda_id', itemController.itemVenda);
router.delete('/:id', itemController.delete);
router.get('/:id', itemController.show);

export default router;
