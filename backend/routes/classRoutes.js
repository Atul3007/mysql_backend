import express from "express";
import { createClass, getClass } from "../controllers/classController.js";
import {requireSignin,apiKey} from "../middlewares/atuhMiddleware.js"

const classRouter = express.Router();

classRouter.post('/create-class/:id',requireSignin,apiKey,createClass);
classRouter.get("/get-class/:id",requireSignin,apiKey,getClass)

export { classRouter};