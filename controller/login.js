import { userModel } from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const loginUser = async (req, res) => {
  try {
    const { userName, password } = req.body;
    if (!(userName && password)) {
      res.status(400).send("All input is required");
    }
    const user = await userModel.findOne({ userName });

    const validatePassword = await bcrypt.compare(password, user.password);

    if (!validatePassword) res.status(400).send("Invalid Credentials");
    
    if (user && validatePassword) {
      const token = jwt.sign({ user_id: user._id }, process.env.TOKEN_KEY, {
        expiresIn: "2h",
      });
      user.token = token;
      res.status(200).json(user);
    }
  } catch (err) {
    console.log(err);
  }
};
export default loginUser;
