import Jwt from "jsonwebtoken";
import User from "../models/User";
import { createError } from "../middlewares/errors";

const Store = async (req, res) => {
  try {
    const { email = null, password = null } = req.body;

    if (!email || !password) {
      return res.status(400).json(createError("Credenciais inválidas."));
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json(createError("Usuário não existe."));
    }

    if (!(await user.passwordIsValid(password))) {
      return res.status(400).json(createError("Senha inválida"));
    }

    const { id } = user;

    const token = Jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });
    return res.json({ token });
  } catch (err) {
    return res.json(err);
  }
};

export { Store };
