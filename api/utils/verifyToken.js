import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;

    if (!token) return next(errorHandler({ statusCode: 401, message: "Unauthorized request!" }));

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return next(errorHandler({ statusCode: 401, message: "Unauthorized request!" }));

      req.user = user;
      next();
    });
  } catch (error) {
    next(errorHandler({ statusCode: 401, message: "Unauthorized request!" }));
  }
};
