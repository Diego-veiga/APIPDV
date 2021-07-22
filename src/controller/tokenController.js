import User from '../model/User';

class TokenController {
  async token(req, res) {
    try {

    } catch (e) {
      return res.status(400).json({
        errros: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new TokenController();
