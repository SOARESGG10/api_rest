import { Router } from "express";
import { Store } from "../controllers/token.js";

const routes = Router();

routes.post("/token", Store);

export { routes as routesToken };
