import { Router } from 'express';
import statusPedidoController from '../controller/statusPedidoController';
import tokenRequired from '../middleware/tokenRequired';
import validateRequest from '../middleware/validateRequest';
import statusPedidoSchema from '../schemas/statusPedidoSchema';

const router = new Router();

router.post('/', validateRequest(statusPedidoSchema.post, 'body'), tokenRequired, statusPedidoController.store);
router.get('/', tokenRequired, statusPedidoController.show);
router.get('/:id', validateRequest(statusPedidoSchema.get, 'params'), tokenRequired, statusPedidoController.index);
router.put('/:id', validateRequest(statusPedidoSchema.get, 'body'), validateRequest(statusPedidoSchema.put, 'body'), tokenRequired, statusPedidoController.update);

export default router;
