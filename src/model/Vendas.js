import Sequelize, { Model } from 'sequelize';

export default class Venda extends Model {
  static init(sequelize) {
    super.init({
      valor_liquido: {
        type: Sequelize.FLOAT,
        validate: {
          isNumeric: {
            msg: 'O valor liquido deve ser um numero  ',
          },
          positivo(value) {
            if (value <= 0) {
              throw new Error(
                'O valor liquido precisa ser positivo',
              );
            }
          },
        },
      },
      valor_total: {
        type: Sequelize.FLOAT,
        validate: {
          isNumeric: {
            msg: 'O valor total deve ser um numero  ',
          },
          positivo(value) {
            if (value <= 0) {
              throw new Error(
                'O valor liquido precisa ser positivo',
              );
            }
          },
        },
      },
      status_id: {
        type: Sequelize.INTEGER,
        defaultValue: 9,
        validate: {
          isNumeric: {
            msg: 'O valor total deve ser um numero  ',
          },
          positivo(value) {
            if (value <= 0) {
              throw new Error(
                'O valor liquido precisa ser positivo',
              );
            }
          },
        },
      },
    }, {
      sequelize,
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.StatusPedido, { foreignKey: 'status_id' });
  }
}
