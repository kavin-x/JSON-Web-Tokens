import { userModel } from "../model/user.model.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
const createUser = async (req, res) => {
  try {
    console.log(req.body);
    const { userName, password } = req.body;
    if (!(password && userName)) {
      res.status(400).send("All input is required");
    }
    const oldUser = await userModel.findOne({ userName });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }
    let encryptedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      userName: userName, // sanitize: convert email to lowercase
      password: encryptedPassword,
      
    });

    const token = jwt.sign(
      { user_id: user._id },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    user.token = token;
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
};
export default createUser;
