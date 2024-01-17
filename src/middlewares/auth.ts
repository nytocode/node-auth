import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma";

export const isLoggedIn = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies["jwt"];

  if (token) {
    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
      const user = await prisma.user.findUnique({
        where: {
          id: decoded.id,
        },
      });

      if (!user) {
        res.redirect("/signin");
      }

      res.locals.user = user;
      return next();
    } catch (error) {
      console.log(error);
      res.redirect("/signin");
    }
  }

  res.redirect("/signin");
};
