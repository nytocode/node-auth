import { RequestHandler } from "express";
import prisma from "../lib/prisma";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { Resend } from "resend";
import AppError from "../utils/error";

const resend = new Resend(process.env.RESEND_API_KEY);

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

    if (!user || !(await bcrypt.compare(password, user?.password!))) {
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

export const updatePassword: RequestHandler = async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: req.user?.email,
      },
    });

    if (!user || !(await bcrypt.compare(oldPassword, user?.password!))) {
      return next(
        new AppError(
          "Invalid email or password. Please try again with the correct credentials.",
          401,
        ),
      );
    }

    const hash = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hash,
        passwordChangedAt: new Date(),
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
    next(error);
  }
};

export const forgotPassword: RequestHandler = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return next(
        new AppError("There is no user with this email address.", 404),
      );
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    const passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        passwordResetToken,
        passwordResetExpires: new Date(new Date().getTime() + 10 * 60 * 1000),
      },
    });

    const resetURL = `${req.protocol}://${req.get("host")}/reset-password/${resetToken}`;

    // Send mail
    const { error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [email],
      subject: "Node Auth",
      html: `Reset password link: ${resetURL}`,
    });

    if (error) {
      next(new AppError(error.message, 500));
    }

    res.status(200).json({
      status: "success",
      message: "Token sent to email!",
    });
  } catch (error) {
    await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        passwordResetToken: null,
        passwordResetExpires: null,
      },
    });

    next(error);
  }
};

export const resetPassword: RequestHandler = async (req, res, next) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await prisma.user.findFirst({
      where: {
        passwordResetToken: hashedToken,
        passwordResetExpires: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      return next(new AppError("Token is invalid or has expired", 400));
    }

    const hash = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hash,
        passwordResetExpires: null,
        passwordResetToken: null,
        passwordChangedAt: new Date(),
      },
    });

    const jwtToken = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRES_IN },
    );

    res.cookie("jwt", jwtToken, {
      expires: new Date(
        Date.now() +
          parseInt(process.env.JWT_COOKIE_EXPIRES_IN!) * 24 * 60 * 60 * 1000,
      ),
      httpOnly: true,
    });

    user.password = null;

    res.status(200).json({
      status: "success",
      token: jwtToken,
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};
