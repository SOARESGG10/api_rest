import User from "../models/User";
import Book from "../models/Book";
import { treatErrors } from "../middlewares/errors";

const Index_User = async (req, res) => {
  try {
    const author = await User.findAll({
      attributes: ["id", "name", "email"],
      order: ["name"],
      include: {
        model: Book,
        attributes: ["title"],
      },
    });
    return res.json(author);
  } catch (err) {
    return res.status(400).json(treatErrors(err));
  }
};

const Index_Book = async (req, res) => {
  try {
    const book = await Book.findAll({
      attributes: ["title", "year", "description", "pages"],
      order: ["title"],
    });
    return res.json(book);
  } catch (err) {
    return res.status(400).json(treatErrors(err));
  }
};

export { Index_User, Index_Book };
