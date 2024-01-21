import { RequestHandler } from "express";

export const home: RequestHandler = (req, res) => {
  res.render("home", {
    title: "Authenticator - Home",
  });
};

export const signin: RequestHandler = (req, res) => {
  res.render("signin", {
    title: "Authenticator - Sign in",
  });
};

export const signup: RequestHandler = (req, res) => {
  res.render("signup", {
    title: "Authenticator - Sign up",
  });
};

export const edit: RequestHandler = (req, res) => {
  res.render("edit", {
    title: "Authenticator - Edit",
  });
};

export const editPassword: RequestHandler = (req, res) => {
  res.render("edit-password", {
    title: "Authenticator - Edit password",
  });
};

export const forgotPassword: RequestHandler = (req, res) => {
  res.render("forgot-password", {
    title: "Authenticator - Forgot password",
  });
};

export const resetPassword: RequestHandler = (req, res) => {
  res.render("reset-password", {
    title: "Authenticator - Reset password",
  });
};
