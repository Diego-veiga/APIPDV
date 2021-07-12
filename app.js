import express from 'express';
import './src/database';
import dotenv from 'dotenv';
import produtoRouter from './src/router/produtoRouter';
import vendaRouter from './src/router/vendaRouter';
import statusPedidoRouter from './src/router/statusPedidoRouter';

dotenv.config();

class App {
  constructor() {
    this.app = express();
    this.middleware();
    this.router();
  }

  middleware() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  router() {
    this.app.use('/produto', produtoRouter);
    this.app.use('/venda', vendaRouter);
    this.app.use('/statusPedido', statusPedidoRouter);
  }
}

export default new App().app;
