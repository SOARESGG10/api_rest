import Sequelize, { Model } from "sequelize";
import bcryptjs from "bcrypt";

export default class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: Sequelize.STRING,
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
              msg: "E-mail inválido",
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
              args: [],
              msg: "O campo senha deve ter entre 8 a 25 caracteres",
            },
          },
        },
      },
      { sequelize }
    );

    this.addHook("beforeSave", async (user) => {
      if (user.password) {
        user.password_hash = await bcryptjs.hash(user.password, 8);
      }
    });

    return this;
  }

  passwordIsValid(password) {
    return bcryptjs.compare(password, this.password_hash);
  }
}
