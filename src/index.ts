import express, { Application } from "express";
import path from "path";
import dotenv from "dotenv";
import cookie_parser from "cookie-parser";
import body_parser from "body-parser";
import "./lib/prisma";
import errorHandler from "./middlewares/error";
import views from "./routes/views";
import auth from "./routes/auth";

dotenv.config();

const app: Application = express();

// Pug Views settings
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// Cookies Parser
app.use(cookie_parser());

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT ?? 3001;

// ROUTES
app.use("/", views);
app.use("/api/v1/auth", auth);

app.use(errorHandler);

app.listen(3000, () => {
  console.log(`App listen on port ${port}!`);
});
