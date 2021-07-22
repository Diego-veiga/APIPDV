import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import Produto from '../model/Produto';
import StatusPedido from '../model/statusPedido';
import Venda from '../model/Vendas';
import item from '../model/items';
import User from '../model/User';

const models = [Produto, StatusPedido, Venda, item, User];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));
