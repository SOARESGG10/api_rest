import { Router } from "express";
import { Index_User, Index_Book } from "../controllers/admin";

const routes = Router();

routes.get("/admin/users", Index_User);
routes.get("/admin/books", Index_Book);

export { routes as routesAdmin };
