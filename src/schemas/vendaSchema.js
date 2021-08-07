import Joi from 'joi';

const vendaSchema = {
  get: {
    id: Joi.number().min(1).required(),
  },

};

export default vendaSchema;
