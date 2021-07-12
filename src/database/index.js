import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import Produto from '../model/Produto';
import StatusPedido from '../model/statusPedido';
import Venda from '../model/Vendas';

const models = [Produto, StatusPedido, Venda];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));
