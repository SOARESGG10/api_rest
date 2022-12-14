import { Router } from "express";
import { Index, Store, Update, Delete } from "../controllers/book";

const routes = Router();

routes.get("/books/", Index);
routes.post("/books/", Store);
routes.put("/books/:id?", Update);
routes.delete("/books/:id?", Delete);

export { routes as routesBooks };
