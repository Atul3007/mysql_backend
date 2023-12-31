import express from "express";
import {getUser, login, register} from "../controllers/userController.js";

const userRouter = express.Router();

// router.get('/branchList', getBranchList)
userRouter.post('/register-user', register);
userRouter.post("/log-in",login);
userRouter.get("/users",getUser);

export { userRouter};
