import { RequestHandler } from "express";
import prisma from "../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AppError from "../utils/error";

export const signout: RequestHandler = async (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 1000),
    httpOnly: true,
  });
  res.status(200).json({
    status: "success",
  });
};

export const signin: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError("Please provide email and password!", 400));
    }

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    const isPasswordCorrect = await bcrypt.compare(password, user?.password!);

    if (!user || !isPasswordCorrect) {
      return next(
        new AppError(
          "Invalid email or password. Please try again with the correct credentials.",
          401,
        ),
      );
    }

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRES_IN },
    );

    res.cookie("jwt", token, {
      expires: new Date(
        Date.now() +
          parseInt(process.env.JWT_COOKIE_EXPIRES_IN!) * 24 * 60 * 60 * 1000,
      ),
      httpOnly: true,
    });

    user.password = null;

    res.status(200).json({
      status: "success",
      token,
      data: {
        user,
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const signup: RequestHandler = async (req, res, next) => {
  const { email, name, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hash,
      },
    });

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRES_IN },
    );

    res.cookie("jwt", token, {
      expires: new Date(
        Date.now() +
          parseInt(process.env.JWT_COOKIE_EXPIRES_IN!) * 24 * 60 * 60 * 1000,
      ),
      httpOnly: true,
    });

    user.password = null;

    res.status(200).json({
      status: "success",
      token,
      data: {
        user,
      },
    });
  } catch (error) {
    return next(error);
  }
};
