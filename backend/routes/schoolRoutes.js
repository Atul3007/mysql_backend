import express from "express";
import { createSchool, getMySchool } from "../controllers/schoolController.js";
import {requireSignin,apiKey} from "../middlewares/atuhMiddleware.js"

const schoolRouter = express.Router();

// router.get('/branchList', getBranchList)
schoolRouter.post('/create-school/:id',requireSignin,apiKey,createSchool);
schoolRouter.get("/get-myschool/:id",requireSignin,apiKey,getMySchool)

export { schoolRouter};