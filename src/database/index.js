import { Sequelize } from "sequelize";
import databaseConfig from "../config/database";
import Book from "../models/Book";
import User from "../models/User";

const models = [Book, User];

const sequelize = new Sequelize(databaseConfig);

models.forEach((model) => model.init(sequelize));
models.forEach((model) => model.associate && model.associate(sequelize.models));

export { sequelize };
