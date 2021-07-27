import { Router } from 'express';
import statusPedidoController from '../controller/statusPedidoController';
import tokenRequired from '../middleware/tokenRequired';

const router = new Router();

router.post('/', tokenRequired, statusPedidoController.store);
router.get('/', tokenRequired, statusPedidoController.show);
router.get('/:id', tokenRequired, statusPedidoController.index);
router.put('/:id', tokenRequired, statusPedidoController.update);

export default router;
