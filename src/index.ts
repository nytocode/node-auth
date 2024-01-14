import express, { Application } from "express";
import path from "path";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { signin, signup } from "./controllers/auth";
import "./lib/prisma";
import { isLoggedIn } from "./middlewares/auth";

dotenv.config();

const app: Application = express();

// Views settings
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// Body Parser
app.use(bodyParser.urlencoded({ extended: true }));

// Cookies Parser
app.use(cookieParser());

app.use(express.json());

const port = process.env.PORT ?? 3001;

app.get("/", isLoggedIn, (req, res) => {
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
