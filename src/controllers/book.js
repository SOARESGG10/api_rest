import Book from "../models/Book";
import { treatErrors, createError } from "../middlewares/errors";

const Index = async (req, res) => {
  try {
    const { user_id } = req;
    const books = await Book.findAll({
      where: { user_id },
      attributes: ["id", "title", "year", "description", "pages", "author"],
    });
    return res.json(books);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const Store = async (req, res) => {
  try {
    const { user_id } = req;
    const { title, year, description, pages, author } = req.body;
    await Book.create({
      title,
      year,
      description,
      pages,
      author,
      user_id,
    });
    return res.json({ title, year, description, pages, author });
  } catch (err) {
    return res.status(400).json(err);
  }
};

const Show = async (req, res) => {
  try {
    const { user_id } = req;
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json(
          createError(
            "É necessário informar o ID do livro para executar essa ação."
          )
        );
    }

    const book = await Book.findOne({ where: { id, user_id } });

    if (!book) {
      return res.status(400).json(createError("Este livro não existe."));
    }

    const { title, year, description, pages, author } = book;

    return res.json({ title, year, description, pages, author });
  } catch (err) {
    return res.status(400).json(treatErrors(err));
  }
};

const Update = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json(
          createError(
            "É necessário informar o ID do livro para executar esta operação."
          )
        );
    }
    const data = await Book.findByPk(id);

    if (!data) {
      return res.status(400).json(createError("Este livro não existe."));
    }

    const book = await data.update(req.body);
    const { title, year, description, pages } = book;

    return res.json({ title, year, description, pages });
  } catch (err) {
    return res.status(400).json(treatErrors(err));
  }
};

const Delete = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json(
          createError(
            "É necessário informar o ID do livro para executar esta operação."
          )
        );
    }

    const book = await Book.findByPk(id);

    if (!book) {
      return res.status(400).json(createError("Este livro não existe."));
    }
    await book.destroy(req.body);
    return res.json("Livro apagado com sucesso");
  } catch (err) {
    return res.status(400).json(treatErrors(err));
  }
};

export { Index, Store, Show, Update, Delete };
