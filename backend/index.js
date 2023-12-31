import express from "express";
import mysql2 from "mysql2";
import { userRouter } from "./routes/userRoute.js";
import { schoolRouter } from "./routes/schoolRoutes.js";
import { classRouter } from "./routes/classRoutes.js";
import { studentRouter } from "./routes/studentRoutes.js";


const connection = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "Up090859",
  database: "school",
  port: 3306,
});

const app = express();
app.use(express.json());
const port = 8000;

app.use("/api/", userRouter);
app.use("/school/",schoolRouter);
app.use("/class",classRouter);
app.use("/students",studentRouter);


app.listen(port, () => {
  console.log("Server is running on 8000");
  connection.connect((err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Database connected!");
    }
  });
});

