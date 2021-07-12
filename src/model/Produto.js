import Sequelize, { Model } from 'sequelize';

export default class Produto extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            len: {
              args: [3, 50],
              msg: 'O nome do produto deve ter entre 3 e 50 caracteres',
            },
          },
          defaultValue: '',
        },
        preco_venda: {
          type: Sequelize.FLOAT,
          defaultValue: 0,
          validate: {
            isFloat: {
              msg: 'O preço de venda precisa ser do tipo numero',
            },
            positivo(value) {
              if (value <= 0) {
                throw new Error(
                  'O preço de venda precisa ser positivo',
                );
              }
            },
            notEmpty: {
              msg: 'O campo preco de venda não pode estar vazio',
            },
          },
        },
        preco_custo: {
          type: Sequelize.FLOAT,
          defaultValue: 0,
          validate: {
            isFloat: {
              msg: 'O preço de custo precisa ser do tipo numero',
            },
            positivo(value) {
              if (value <= 0) {
                throw new Error(
                  'O preço de custo precisa ser positivo',
                );
              }
            },
            notEmpty: {
              msg: 'O campo preco de custo não pode estar vazio',
            },
          },
        },
        quantidade_estoque: {
          type: Sequelize.FLOAT,
          defaultValue: 0,
          validate: {
            isFloat: {
              msg: 'A quantidade estoque precisa ser do tipo numero',
            },
            positivo(value) {
              if (value <= 0) {
                throw new Error(
                  'A quantidade estoque precisa ser positivo',
                );
              }
            },
            notEmpty: {
              msg: 'A quantidade estoque não pode estar vazio',
            },
          },
        },
        ativo: {
          type: Sequelize.BOOLEAN,
          defaultValue: true,

        },
      },

      {
        sequelize,
      },
    );
    return this;
  }
}
