import Jwt from "jsonwebtoken";
import { createError } from "./errors";
import User from "../models/User";

export default async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res
      .status(400)
      .json(
        createError(
          "É necessário realizar a autenticação do usuário para executar essa ação."
        )
      );
  }

  const [, token] = authorization.split(" ");
  try {
    const data = Jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = data;

    const user = await User.findOne({ where: { id, email } });

    if (!user) {
      return res
        .status(400)
        .json(createError("Usuário inválido ou inexistente."));
    }

    req.user_id = id;
    req.user_email = email;

    return next();
  } catch (err) {
    return res
      .status(400)
      .json(createError("Token inválido ou expirado. Realize o login."));
  }
};
