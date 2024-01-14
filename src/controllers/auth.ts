import { RequestHandler } from "express";
import prisma from "../lib/prisma";
import bcrypt from "bcrypt";

export const signin: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  res.send("ok");
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
    console.log(error);
    res.status(500).json({
      error: error,
      message: "Something went wrong!",
    });
  }
};
