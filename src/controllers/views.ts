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
