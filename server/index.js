import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongoDB/connect.js";

import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const startSever = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8000, () => {
      console.log("Server has started on port http://localhost:8000");
    });
  } catch (err) {
    console.log(err);
  }
};

startSever();
