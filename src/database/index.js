import { Sequelize } from "sequelize";
import databaseConfig from "../config/database";
import Book from "../models/Book.js";
import User from "../models/User.js";

const models = [Book, User];

const sequelize = new Sequelize(databaseConfig);

models.forEach((model) => model.init(sequelize));

export { sequelize };
