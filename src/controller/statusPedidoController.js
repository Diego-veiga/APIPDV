import { Op } from 'sequelize';
import StatusPedido from '../model/statusPedido';

export class StatusPedidoController {
  async store(req, res) {
    try {
      const novoStatusPedido = await StatusPedido.create(req.body);
      return res.status(200).json(novoStatusPedido);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async show(req, res) {
    try {
      const statusPedidos = await StatusPedido.findAll();
      if (!statusPedidos.length) {
        return res.status(200).json({ message: 'Nenhum StatusPedido cadastrado' });
      }
      return res.status(200).json(statusPedidos);
    } catch (e) {
      console.log('---ERRROR', e);
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async index(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ errors: 'Id não enviado' });
      }
      const statusPedido = await StatusPedido.findByPk(id);
      if (!statusPedido) {
        return res.status(200).json({ message: 'StatusPedido não encontrado' });
      }
      return res.status(200).json(StatusPedido);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ errors: 'Id não enviado' });
      }
      const statusPedido = await StatusPedido.findByPk(id);
      if (!statusPedido) {
        return res.status(200).json({ message: 'StatusPedido não encontrado' });
      }
      const statusPedidoAtualizado = await StatusPedido.update(req.body);
      return res.status(200).json(statusPedidoAtualizado);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const statusPedido = await StatusPedido.findOne({
        where: {
          [Op.and]: [{ id }, { ativo: true }],
        },
      });
      if (!statusPedido) {
        return res.status(400).json({ errors: 'StatusPedido não encontrado ou desativado' });
      }

      StatusPedido.ativo = false;
      await StatusPedido.save();
      return res.status(200).json({ errors: 'StatusPedido excluído com sucesso' });
    } catch (e) {
      console.log('error', e);
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new StatusPedidoController();
