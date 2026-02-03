import express from 'express';
import { signUp } from '../controllers/auth/signup.controller.js';
import { signIn } from '../controllers/auth/signin.controller.js';

const UserRoute = express.Router();

UserRoute.post("/signup", signUp);
UserRoute.post("/signin", signIn);

export default UserRoute