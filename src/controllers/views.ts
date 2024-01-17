import { RequestHandler } from "express";

export const home: RequestHandler = (req, res) => {
  res.render("home");
};

export const signin: RequestHandler = (req, res) => {
  res.render("signin");
};

export const signup: RequestHandler = (req, res) => {
  res.render("signup");
};
