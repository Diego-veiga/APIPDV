import jwt from 'jsonwebtoken';
import User from '../model/User';

export default async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({
        message: 'token  inválido',
      });
    }
    const [, token] = authorization.split(' ');
    const dados = jwt.verify(token, process.env.TOKEN_SECRET);
    const { email, id } = dados;
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(400).JSON({ errors: 'usuario e senha inválidos' });
    }
    req.userId = id;
    req.userEmail = email;
    next();
  } catch (e) {
    return res.status(400).json({
      errors: 'token inválido',
    });
  }
};
