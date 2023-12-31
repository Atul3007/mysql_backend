
import {hashpass,comparePass} from "../helper/authHelper.js"
import jwt from "jsonwebtoken";
import mysql2 from "mysql2";
const JWT_SECRET_KEY="asdglkjklj09876";

const connection = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "Up090859",
    database: "school",
    port: 3306,
  });

async function getUserByEmail(email) {
    return new Promise((resolve, reject) => {
      const sqlQuery = "SELECT * FROM users WHERE email = ?";
      connection.query(sqlQuery, [email], (err, results) => {
        if (err) {
          reject(err);
        } else {
         const user = results[0];
          resolve(user);
        }
      });
    });
  }

  //---------get user--------------------
  const getUser = async (req,res) => {
    const sql_Query = "select * from users";
    connection.query(sql_Query, (err, result) => {
      if (err) {
        throw err;
      } else {
        res.send(result);
      }
    });
  }

  //-------------register-----------------

const register = async (req, res) => {
  try {
    const { name, email, password, photo, role } = req.body;
    const hashPassword = await hashpass(password);
    const sqlQuery =
      "INSERT INTO school.users (name, email, password, photo, role) VALUES (?, ?, ?, ?, ?)";

    connection.query(
      sqlQuery,
      [name, email, hashPassword, photo, role],
      (err, result) => {
        if (err) {
          console.error("Error inserting data:", err);
          res.status(500).json({ error: "Internal Server Error" });
        } else {
          console.log("Data inserted successfully:", result);
          res.status(200).json({ msg: "User added successfully!!!", result });
        }
      }
    );
  } catch (error) {
    console.log({ msg: "err in registration", err: error });
  }
};

// --------------------------login------------------------

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);
    if (user) {
       // console.log(user)
      const compare = await comparePass(password, user.password);
     // console.log(compare);
      //res.send(user)
      if (compare) {
        const token = jwt.sign({ id: user.id }, JWT_SECRET_KEY);
        res.status(200).json({ message: "login success", token, user });
      } else {
        res.status(400).json({ message: "login failed" });
      }
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { register, login , getUser };
