import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

const createToken = (_id) => {
  return jwt.sign({ _id }, JWT_SECRET, { expiresIn: "3d" });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);

    const token = createToken(user._id);

    res.status(200).json({ email, token, name: user.name });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const signupUser = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const user = await User.signup(email, password, name);

    const token = createToken(user._id);

    res.status(200).json({ name, email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
export const getUserById = async (request, response) => {
  try {
    const { id } = request.params;

    const ussr = await User.findById(id);

    return response.status(200).json(ussr);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
};
