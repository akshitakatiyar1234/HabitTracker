import userController from "./user.controller.js";
import express from 'express';

const userRoutes = express.Router();
const usercontroller =new userController();

userRoutes.post('/login',usercontroller.login);
userRoutes.post('/register',usercontroller.registerUser);

export default userRoutes;