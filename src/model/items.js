import Sequelize, { Model } from 'sequelize';

export default class Item extends Model {
  static init(sequelize) {
    super.init({
      quantidade: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
          isDate: {
            msg: 'A quantidade do produto precisa ser um numero',
          },
          positivo(value) {
            if (value <= 0) {
              throw new Error(
                'A quantidade do produto precisa ser positiva',
              );
            }
          },
        },
      },
      preco_produto: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      cancelado: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,

      },
      total: {
        type: Sequelize.FLOAT,
        allowNull: false,
        positivo(value) {
          if (value <= 0) {
            throw new Error(
              'O total do item precisa ser positivo',
            );
          }
        },
      },
    },
    {
      sequelize,
      tableName: 'item',
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Venda, { foreignKey: 'venda_id' });
    this.belongsTo(models.Produto, { foreignKey: 'produto_id' });
  }
}
