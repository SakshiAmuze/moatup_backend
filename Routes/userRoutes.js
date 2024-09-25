import express from "express";
import { loginAction, logOutAction, registerAction } from "../Controllers/userAuthControllers.js";
import isAuthenticated from "../Middlewares/auth.middlewares.js";

const userRoute = express.Router();

userRoute.post('/registeruser',registerAction);
userRoute.post('/loginuser', loginAction);
userRoute.get('/logoutuser',logOutAction);
export default userRoute;

