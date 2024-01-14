import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

export const isLoggedIn: RequestHandler = (req, res, next) => {
  const token = req.cookies["jwt"];

  if (!token) {
    res.redirect("/signin");
  }

  const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

  if (!decoded) {
    res.redirect("/signin");
  }

  next();
};
