import express, { Application } from "express";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

const port = process.env.PORT ?? 3001;

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(3000, () => {
  console.log(`App listen on port ${port}!`);
});
