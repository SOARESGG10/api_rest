import User from "../models/User";
import { treatErrors, createError } from "../middlewares/errors.js";

const Store = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const { name, email, password } = user;
    return res.json({ name, email, password });
  } catch (err) {
    return res.status(400).json(treatErrors(err));
  }
};

const Update = async (req, res) => {
  try {
    const id = req.user_id;
    const data = await User.findByPk(id);

    if (!data) {
      return res.status(400).json(createError("Este usuário não existe."));
    }

    const user = await data.update(req.body);
    const { name, email, password } = user;

    return res.json({ name, email, password });
  } catch (err) {
    return res.status(400).json(treatErrors(err));
  }
};

const Delete = async (req, res) => {
  try {
    const id = req.user_id;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(400).json(createError("Este usuário não existe."));
    }

    // await author.update({ active: false });
    await user.destroy();

    return res.json("Usuário deletado com sucesso.");
  } catch (err) {
    return res.status(400).json(treatErrors(err));
  }
};

export { Store, Update, Delete };
