import Joi from 'joi';

const produtoSchema = {
  post: Joi.object().keys({
    nome: Joi.string().min(3).max(50).required(),
    preco_venda: Joi.number().min(0.1).required(),
    preco_custo: Joi.number().min(0.1).optional(),
    quantidade_estoque: Joi.number().min(0.1).optional(),
  }),
  get: Joi.object().keys({
    id: Joi.number().min(1).required(),
  }),
  put: Joi.object().keys({
    nome: Joi.string().min(3).max(50).optional(),
    preco_venda: Joi.number().min(3).optional(),
    preco_custo: Joi.number().min(0.1).optional(),
    quantidade_estoque: Joi.number().min(0.1).optional(),
  }),

};

export default produtoSchema;
