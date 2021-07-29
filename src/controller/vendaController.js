import { Op, QueryTypes, Sequelize } from 'sequelize';
import Venda from '../model/Vendas';
import Item from '../model/items';

class VendaController {
  async store(req, res) {
    try {
      const newVenda = await Venda.create(req.body);
      return res.status(200).json(newVenda);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async index(req, res) {
    try {
      const vendas = await Venda.findAll();
      return res.status(200).json(vendas);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const venda = await Venda.findByPk(id);
      return res.status(200).json(venda);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ errors: 'Id não encontrado' });
      }
      const venda = await Venda.findOne({
        include: Item,
        where: {
          [Op.and]: [{ id }, { status_id: [9, 10] }],
        },
      });
      if (!venda) {
        return res
          .status(400)
          .json({ message: 'Venda não encontrada ou ja cancelada' });
      }

      if (venda.Items) {
        const sequelize = new Sequelize(process.env.DATABASE, process.env.DATABASE_USERNAME,
          process.env.DATABASE_PASSWORD, {
            host: 'localhost',
            port: process.env.DATABASE_PORT,
            dialect: 'mariadb',

            pool: {
              max: 5,
              min: 0,
              acquire: 30000,
              idle: 10000,
            },

          });

        await sequelize.query(`update item set cancelado=1 where venda_id=${venda.id}`, { type: QueryTypes.UPDATE });
      }

      venda.status_id = 11;
      await venda.save();

      return res
        .status(200)
        .json({ Message: 'Venda cancelada com sucesso' });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new VendaController();
