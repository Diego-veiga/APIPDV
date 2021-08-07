import Joi from 'joi';

const statusPedidoSchema = {
  post: {
    nome: Joi.string().min(3).max(20).required(),
  },
  get: {
    id: Joi.number().min(1).required(),
  },
  put: {
    nome: Joi.string().min(3).max(20).optional(),
  },
};

export default statusPedidoSchema;
