import { Op } from 'sequelize';
import Venda from '../model/Vendas';

class VendaController {
  async store(req, res) {
    try {
      const newVenda = await Venda.create(req.body);
      return res.status(200).json(newVenda);
    } catch (e) {
      console.log('ERROR', e);
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
      console.log('ERROR', e);
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
      console.log('ERROR', e);
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
        where: {
          [Op.and]: [{ id }, { status_id: [9, 10] }],

        },
      });
      if (!venda) {
        return res.status(400).json({ message: 'Venda não encontrada ou ja cancelada' });
      }
      venda.status_id = 11;
      venda.save();
      return res.status(200).json({ Message: 'Venda cancelada com sucesso' });
    } catch (e) {
      console.log('ERROR', e);
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new VendaController();
