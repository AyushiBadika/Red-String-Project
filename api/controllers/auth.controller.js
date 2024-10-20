import UserModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

export const signUp = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new UserModel({ username, password: hashedPassword, email });
    await newUser.save();

    res.json({ message: "connected" });
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await UserModel.findOne({ email });

    if (!validUser) return next(errorHandler({ statusCode: 404, message: "User not found!" }));

    const validPassword = bcryptjs.compareSync(password, validUser.password);

    if (!validPassword) return next(errorHandler({ statusCode: 401, message: "Wrong credentials" }));

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;

    res.cookie("access_token", token, { httpOnly: true }).status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("User has been logout!");
  } catch (error) {
    next(error);
  }
};
