import Joi from 'joi';

const itemSchema = {
  post: Joi.object().keys({
    produto_id: Joi.number().integer().min(1).required(),
    venda_id: Joi.number().integer().min(1).required(),
    quantidade: Joi.number().integer().min(1).required(),
  }),
  getVenda: Joi.object().keys({
    venda_id: Joi.number().integer().min(1).required(),
  }),
  get: Joi.object().keys({
    id: Joi.number().integer().min(1).required(),
  }),
};

export default itemSchema;
