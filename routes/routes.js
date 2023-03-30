import pkg from "express";
import createUser from "../controller/createUser.js";
import loginUser from "../controller/login.js";

const Routes = pkg.Router();
const { express } = pkg;

Routes.post("/register", createUser);
Routes.post("/login", loginUser);
export default Routes;