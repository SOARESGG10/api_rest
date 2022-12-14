import { Router } from "express";
import { Index, Store, Update, Delete } from "../controllers/user";

const routes = Router();

routes.get("/users/", Index);
routes.post("/users/", Store);
routes.put("/users/:id?", Update);
routes.delete("/users/:id?", Delete);

export { routes as routesUsers };
