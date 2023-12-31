import express from "express";
import {  } from "../controllers/classController.js";
import {requireSignin,apiKey} from "../middlewares/atuhMiddleware.js"
import { createStudent, getAllClassSameStudent, getClassMates, getStudent } from "../controllers/studentController.js";

const studentRouter = express.Router();

studentRouter.post('/create-students/:id',requireSignin,apiKey,createStudent);
studentRouter.get("/get-students/:id",requireSignin,apiKey,getStudent);
studentRouter.get("/get-all-class-same-student",requireSignin,apiKey,getAllClassSameStudent);
studentRouter.get("/get-classmates/:id",requireSignin,apiKey,getClassMates)

export { studentRouter};