import Sequelize, { Model } from 'sequelize';

export default class StatusPedido extends Model {
  static init(sequelize) {
    super.init({
      nome: {
        type: Sequelize.STRING(20),
        defaultValue: '',
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'statusPedido',
    });
    return this;
  }

  static associate(models) {
    this.hasMany(models.Venda, { foreignKey: 'status_id' });
  }
}
