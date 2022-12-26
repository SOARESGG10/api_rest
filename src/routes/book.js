import { Router } from "express";
import { Index, Store, Show, Update, Delete } from "../controllers/book";
import loginRequired from "../middlewares/required_login";

const routes = Router();

routes.get("/books/", loginRequired, Index);
routes.post("/books/", loginRequired, Store);
routes.get("/books/:id", loginRequired, Show);
routes.put("/books/:id?", loginRequired, Update);
routes.delete("/books/:id?", loginRequired, Delete);

export { routes as routesBooks };
