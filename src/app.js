import dotenv from "dotenv";

import express from "express";
import "./database/index";

import { routesBooks } from "./routes/book";
import { routesUser } from "./routes/user";
import { routesToken } from "./routes/token";
import { routesAdmin } from "./routes/admin";

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routesBooks);
app.use(routesUser);
app.use(routesToken);
app.use(routesAdmin);

export default app;
