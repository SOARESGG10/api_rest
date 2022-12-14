import Book from "../models/Book.js";

const Index = async (req, res) => {
  try {
    const books = await Book.findAll({
      attributes: ["id", "title", "year", "description", "pages"],
    });
    return res.json(books);
  } catch (err) {
    return res.status(400).json(null);
  }
};

const Store = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    const { title, year, description, pages } = book;
    return res.json({ title, year, description, pages });
  } catch (err) {
    return res.status(400).json(null);
  }
};

const Update = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Book.findByPk(id);

    if (!data) {
      return res.status(400).json({ errors: ["Este livro não existe."] });
    }

    const book = await data.update(req.body);
    const { title, year, description, pages } = book;

    return res.json({ title, year, description, pages });
  } catch (err) {
    return res.status(400).json(err);
  }
};

const Delete = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByPk(id);

    if (!book) {
      return res.status(400).json({ errors: ["Este livro não existe."] });
    }
    await book.destroy(req.body);
    return res.json(null);
  } catch (err) {
    return res.status(400).json(null);
  }
};

export { Index, Store, Update, Delete };
