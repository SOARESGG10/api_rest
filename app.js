import dotenv from "dotenv";

import express from "express";
import "./src/database/index";

import { routesBooks } from "./src/routes/book";
import { routesUser } from "./src/routes/user";
import { routesToken } from "./src/routes/token";
import { routesAdmin } from "./src/routes/admin";

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routesBooks);
app.use(routesUser);
app.use(routesToken);
app.use(routesAdmin);

export default app;
