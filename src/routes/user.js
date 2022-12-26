import { Router } from "express";
import { Store, Update, Delete } from "../controllers/user";
import loginRequired from "../middlewares/required_login";

const routes = Router();

routes.post("/user/", Store);
routes.put("/user/", loginRequired, Update);
routes.delete("/user/", loginRequired, Delete);

export { routes as routesUser };
