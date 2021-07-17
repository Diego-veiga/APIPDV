import { Op } from 'sequelize';
import Item from '../model/items';
import Produto from '../model/Produto';
import Venda from '../model/Vendas';

class ItemController {
  async store(req, res) {
    try {
      const { produto_id, venda_id, quantidade } = req.body;
      if (!produto_id || !venda_id || !quantidade) {
        return res.status(400).json({ errors: 'Por favor enviar o id do produto, id da venda e quantidade' });
      }
      const produto = await Produto.findOne({
        where: {
          [Op.and]: [{ id: produto_id }, { ativo: true }],
        },
      });
      if (!produto) {
        return res.status(400).json({ errors: 'Produto não encontrado ou cancelado' });
      }

      const venda = await Venda.findOne({
        where: {
          [Op.and]: [{ id: venda_id }, { status_id: 9 }],
        },
      });
      if (!venda) {
        return res.status(400).json({ errors: 'Venda não  encontrado ou cancelada ' });
      }

      const itemExiste = await Item.findOne({
        where: { [Op.and]: [{ venda_id }, { produto_id }, { cancelado: false }] },
      });
      if (itemExiste) {
        itemExiste.preco_produto = produto.preco_produto;
        itemExiste.quantidade += quantidade;
        itemExiste.total = itemExiste.preco_produto * itemExiste.quantidade;
        itemExiste.save();
        return res.status(200).json(itemExiste);
      }
      const preco_produto = produto.preco_venda;
      const total = preco_produto * quantidade;

      const item = {
        venda_id,
        produto_id,
        quantidade,
        preco_produto,
        total,
      };
      const newItem = await Item.create(item);
      return res.status(200).json(newItem);
    } catch (e) {
      console.log('ERROR', e);
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async itemVenda(req, res) {
    try {
      const { venda_id } = req.params;
      if (!venda_id) return res.status(400).json({ errors: 'Id da venda não enviado' });
      const itens = await Item.findAll({
        attributes: ['id', 'quantidade', 'preco_produto', 'total', 'produto_id', 'venda_id', 'cancelado'],
        where: {
          [Op.and]: [{ venda_id }, { cancelado: false }],
        },

      });

      if (!itens) return res.status(400).json({ errors: 'Nenhum item encontrado para esta venda' });
      return res.status(200).json(itens);
    } catch (e) {
      console.log('ERRORRR', e);
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ errors: 'Id do item não enviado' });
      const item = await Item.findOne({
        attributes: ['id', 'quantidade', 'preco_produto', 'total', 'produto_id', 'venda_id', 'cancelado'],
        where: {
          [Op.and]: [{ id }, { cancelado: false }],
        },
      });
      if (!item) return res.status(400).json({ errors: 'Item não encontrado ou  ja cancelado' });
      return res.status(200).json(item);
    } catch (e) {
      console.log('ERRORRR', e);
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ errors: 'Id do item não enviado' });
      const item = await Item.findOne({
        where: {
          [Op.and]: [{ id }, { cancelado: false }],
        },
      });
      if (!item) return res.status(400).json({ errors: 'Item não encontrado ou  ja cancelado' });
      const { venda_id } = item;
      const venda = await Venda.findOne({ where: { id: venda_id, status_id: 9 } });
      if (!venda) return res.status(400).json({ errors: 'este item pertence a uma venda cancelada ou finalizada' });
      item.cancelado = true;
      await item.save();
      return res.status(200).json({ message: 'item cancelado com sucesso' });
    } catch (e) {
      console.log('ERRORRR', e);
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new ItemController();
