import Sequelize, { Model } from "sequelize";

export default class Book extends Model {
  static init(sequelize) {
    super.init(
      {
        title: {
          type: Sequelize.STRING,
          defaultValue: "",
          unique: {
            msg: "Já existe um livro com esse nome. Utilize outro nome.",
          },
          validate: {
            notEmpty: {
              msg: "É necessário informar um nome para o livro.",
            },
            isLetter(value) {
              if (typeof value !== "string") {
                throw new Error("Título inválido.");
              }
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
          validate: {
            len: {
              args: [0, 255],
              msg: "Descrição informada é muito longa.",
            },
          },
        },
        pages: {
          type: Sequelize.INTEGER,
          defaultValue: "",
          validate: {
            notEmpty: {
              msg: "É necessário informar quantas páginas tem o livro.",
            },
          },
        },
        author: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            notEmpty: {
              msg: "É necessário informar o nome do autor do livro.",
            },
          },
        },
      },
      { sequelize }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id" });
  }
}
