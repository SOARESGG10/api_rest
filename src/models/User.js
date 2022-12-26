import Sequelize, { Model } from "sequelize";

import bcryptjs from "bcrypt";

export default class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: Sequelize.STRING,
          unique: {
            msg: "Já existe um usuário com esse nome. Informe outro nome.",
          },
          validate: {
            notEmpty: {
              msg: "É necessário informar o seu nome.",
            },
          },
        },
        email: {
          type: Sequelize.STRING,
          unique: {
            msg: "Este email já está cadastrado em nossa base de dados. Informe outro email.",
          },
          validate: {
            notEmpty: {
              msg: "É necessário informar o seu nome.",
            },
            isEmail: {
              msg: "E-mail inválido. Por favor informe um e-mail válido.",
            },
          },
        },
        password_hash: {
          type: Sequelize.STRING,
          defaultValue: "",
        },
        password: {
          type: Sequelize.VIRTUAL,
          defaultValue: "",
          validate: {
            len: {
              args: [8, 25],
              msg: "A sua senha deve ter entre 8 a 25 caracteres.",
            },
          },
        },
      },
      { sequelize }
    );
    this.addHook("beforeSave", async (athor) => {
      if (athor.password) {
        athor.password_hash = await bcryptjs.hash(athor.password, 8);
      }
    });

    return this;
  }

  passwordIsValid(password) {
    return bcryptjs.compare(password, this.password_hash);
  }

  static associate(models) {
    this.hasMany(models.Book, { foreignKey: "user_id" });
  }
}
