import { Op } from 'sequelize';
import Produto from '../model/Produto';

export class ProdutoController {
  async store(req, res) {
    try {
      const novoProduto = await Produto.create(req.body);
      return res.status(200).json(novoProduto);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async show(req, res) {
    try {
      const produtos = await Produto.findAll();
      if (!produtos.length) {
        return res.status(200).json({ message: 'Nenhum produto cadastrado' });
      }
      return res.status(200).json(produtos);
    } catch (e) {
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
      const produto = await Produto.findByPk(id);
      if (!produto) {
        return res.status(200).json({ message: 'Produto não encontrado' });
      }
      return res.status(200).json(produto);
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
      const produto = await Produto.findByPk(id);
      if (!produto) {
        return res.status(200).json({ message: 'Produto não encontrado' });
      }
      const produtoAtualizado = await produto.update(req.body);
      return res.status(200).json(produtoAtualizado);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const produto = await Produto.findOne({
        where: {
          [Op.and]: [{ id }, { ativo: true }],
        },
      });
      if (!produto) {
        return res.status(400).json({ errors: 'Produto não encontrado ou desativado' });
      }

      produto.ativo = false;
      await produto.save();
      return res.status(200).json({ errors: 'Produto excluído com sucesso' });
    } catch (e) {
      console.log('error', e);
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new ProdutoController();
