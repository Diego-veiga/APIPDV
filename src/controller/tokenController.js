import { Op } from 'sequelize';
import jwt from 'jsonwebtoken';
import User from '../model/User';

class TokenController {
  async store(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ errors: 'Usuario e senha são necessários para login' });
      }
      const user = await User.findOne({
        where: {
          [Op.and]: [{ email }, { ativo: true }],
        },
      });
      if (!user) {
        return res.status(400).json({ errors: 'usuario e senha inválidos' });
      }
      if (!(await user.passwordValid(password))) {
        return res.status(400).json({ errors: 'usuario e senha inválidos' });
      }
      const { id, nome, sobrenome } = user;
      const token = await jwt.sign({
        id, nome, sobrenome, email,
      }, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRATION });
      req.user_id = user.id;
      req.user_email = user.email;
      return res.status(200).json({ token });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new TokenController();
