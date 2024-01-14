import { RequestHandler } from "express";
import prisma from "../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signin: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      res.status(404).json({
        error: {
          message: "User doesn't exists!",
        },
      });
    }

    if (!user?.password) {
      res.status(403).json({
        error: {
          message: "Something went wrong!",
        },
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user?.password!);

    if (!isPasswordCorrect) {
      res.status(403).json({
        error: {
          message: "Password wrong. Try again!",
        },
      });
    }

    const token = jwt.sign(
      {
        email: user?.email,
      },
      process.env.JWT_SECRET!,
    );

    res.cookie("jwt", token, { httpOnly: true }).redirect("/");
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

export const signup: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const hash = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        email,
        password: hash,
      },
    });

    res.redirect("/signin");
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};
