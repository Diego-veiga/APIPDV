import { Router } from 'express';
import tokenController from '../controller/tokenController';
import validateRequest from '../middleware/validateRequest';
import loginSchema from '../schemas/loginSchema';

const router = new Router();

router.post('/', validateRequest(loginSchema, 'body'), tokenController.store);

export default router;
