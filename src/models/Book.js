import Sequelize, { Model } from "sequelize";

export default class Book extends Model {
  static init(sequelize) {
    super.init(
      {
        title: {
          type: Sequelize.SMALLINT,
          defaultValue: "",
          unique: {
            msg: "Nome de livro já existe. Utilize outro nome.",
          },
          validate: {
            notEmpty: {
              msg: "É necessário informar um nome para o livro.",
            },
          },
        },
        year: {
          type: Sequelize.INTEGER,
          defaultValue: "",
          validate: {
            notEmpty: {
              msg: "É necessário informar um ano para o livro.",
            },
          },
        },
        description: {
          type: Sequelize.STRING,
          defaultValue: "",
        },
        pages: {
          type: Sequelize.INTEGER,
          defaultValue: "",
        },
      },
      { sequelize }
    );
    return this;
  }
}
