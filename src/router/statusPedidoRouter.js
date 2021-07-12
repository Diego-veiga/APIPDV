import { Router } from 'express';
import statusPedidoController from '../controller/statusPedidoController';

const router = new Router();

router.post('/', statusPedidoController.store);
router.get('/', statusPedidoController.show);
router.get('/:id', statusPedidoController.index);
router.put('/:id', statusPedidoController.update);

export default router;
