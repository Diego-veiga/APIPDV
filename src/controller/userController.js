import { Op } from 'sequelize';
import User from '../model/User';

class UserController {
  async store(req, res) {
    try {
      const {
        nome, sobrenome, email, password,
      } = req.body;

      const newUser = await User.create({
        nome, sobrenome, email, password,
      });
      delete newUser.password;
      return res.status(200).json(newUser);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async index(req, res) {
    try {
      const users = await User.findAll({ attributes: ['id', 'nome', 'sobrenome', 'email', 'ativo'] });
      if (!users) {
        return res.status(400).json({ errors: 'Nenhum usuario encontrado' });
      }
      return res.status(200).json(users);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ errors: 'Por favor enviar  o id do usuario' });
      }
      const user = await User.findOne({
        where: { id },
        attributes: ['id', 'nome', 'sobrenome', 'email', 'ativo'],

      });
      if (!user) {
        return res.status(400).json({ errors: 'Usuario não encontrado' });
      }
      return res.status(200).json(user);
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
        return res.status(400).json({ errors: 'Por favor enviar  o id do usuario' });
      }
      const user = await User.findOne({ where: { id } });
      if (!user) {
        return res.status(400).json({ errors: 'Usuario não encontrado' });
      }
      const userUpdated = await user.update(req.body);
      const { nome, sobrenome, email } = userUpdated;
      return res.status(200).json({ nome, sobrenome, email });
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
        return res.status(400).json({ errors: 'Por favor enviar  o id do usuario' });
      }
      const user = await User.findOne({
        where: {
          [Op.and]: [{ id }, { ativo: true }],
        },
      });
      if (!user) {
        return res.status(400).json({ errors: 'Usuario não encontrado' });
      }
      user.ativo = false;
      await user.save();
      return res.status(200).json({ message: 'Usuario desativado com sucesso' });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new UserController();
