import express, { Application } from "express";
import path from "path";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { signin, signup } from "./controllers/auth";
import "./lib/prisma";

dotenv.config();

const app: Application = express();

// Views settings
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// bodyParser
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

const port = process.env.PORT ?? 3001;

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/signin", (req, res) => {
  res.render("signin");
});

app.post("/signin", signin);

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post("/signup", signup);

app.listen(3000, () => {
  console.log(`App listen on port ${port}!`);
});
