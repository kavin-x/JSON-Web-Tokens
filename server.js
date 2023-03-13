import Routes from "./routes/routes.js";
import * as dotenv from "dotenv";
import pkg from "express";
import cors from "cors";
import { connectDb } from "./config/database.js";
import bodyParser from "body-parser";
connectDb();
dotenv.config()
const app = pkg();

app.use(cors());

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use("/api", Routes);
app.get("/", (req, res) => {
  res.json({ message: "Welcome!" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
