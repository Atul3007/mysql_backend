import jwt from "jsonwebtoken";
const JWT_SECRET_KEY="asdglkjklj09876";
let user_id;

const requireSignin = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, JWT_SECRET_KEY,{expiresIn:'500s'});
    if (decoded) {
       user_id = decoded.id;
       next();
   }

  } catch (error) {
    res.status(400).json({ message: "error in auth-middleware" });
    console.log("error in auth-middleware");
  }
};

const apiKey = async (req, res, next) => {
  try {
    if (req.headers.key === "equitysoft") {
      next();
    }
  } catch (error) {
    console.log("error in apiKey");
  }
};


export {
  requireSignin,
  apiKey
};
