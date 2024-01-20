import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma";
import AppError from "../utils/error";

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
        select: {
          email: true,
          name: true,
          id: true,
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

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies["jwt"]) {
      token = req.cookies["jwt"];
    }

    if (!token) {
      return next(
        new AppError(
          "You are not logged in! Pleasse log in to get access.",
          401,
        ),
      );
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
      select: {
        name: true,
        email: true,
        id: true,
      },
    });

    if (!user) {
      return next(
        new AppError(
          "The user belonging to this token does no longer exist",
          401,
        ),
      );
    }

    req.user = {
      email: user.email,
      name: user.name as string,
      id: user.id.toString(),
    };
    res.locals.user = user;

    next();
  } catch (error) {
    return next(error);
  }
};
