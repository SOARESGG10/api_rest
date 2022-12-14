import User from "../models/User";

// const Index = async (req, res) => {
//   try {
//     const users = await User.findAll({
//       attributes: ["id", "name", "email"],
//     });
//     return res.json(users);
//   } catch (err) {
//     return res.status(400).json(null);
//   }
// };

const Store = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const { name, email, password } = user;
    return res.json({ name, email, password });
  } catch (err) {
    return res.status(400).json(err);
  }
};

const Update = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await User.findByPk(id);

    if (!data) {
      return res.status(400).json({ errors: ["Este usuário não existe."] });
    }

    const user = await data.update(req.body);
    const { name, email, password } = user;

    return res.json({ name, email, password });
  } catch (err) {
    return res.status(400).json(err);
  }
};

const Delete = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(400).json({ errors: ["Este usuário não existe."] });
    }
    await user.destroy(req.body);
    return res.json(null);
  } catch (err) {
    return res.status(400).json(null);
  }
};

export { Store, Update, Delete };
