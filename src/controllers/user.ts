import AppError from "../utils/error";
import prisma from "../lib/prisma";
import { RequestHandler } from "express";

export const updateMe: RequestHandler = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) {
      return next(new AppError("Please provide a valid name!", 400));
    }

    const user = await prisma.user.update({
      where: {
        email: req.user?.email,
      },
      data: {
        name,
      },
      select: {
        name: true,
        email: true,
      },
    });

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    return next(error);
  }
};
