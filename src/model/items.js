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
      total: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
    },
    {
      sequelize,
    });
    this.addHook('beforeSave', async (item) => {
      item.total = item.quantidade * item.preco_produto;
    });
    return this;
  }
}
