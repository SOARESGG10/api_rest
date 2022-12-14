import dotenv from "dotenv";

import express from "express";
import "./src/database/index.js";
import { routesBooks } from "./src/routes/book.js";
import { routesUsers } from "./src/routes/user.js";

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routesBooks);
app.use(routesUsers);

export default app;
