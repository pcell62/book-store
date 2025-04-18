import express from "express";

import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import userRoutes from "./routes/userRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import cors from "cors";
import dotenv from "dotenv";

const app = express();

dotenv.config();

app.use(express.json());

app.use(cors());

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome To Book Store");
});

app.use("/books", booksRoute);
app.use("/user", userRoutes);
app.use("/chats", chatRoutes);

console.log(process.env.mongoDBURL);

mongoose
  .connect(process.env.mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(process.env.PORT, () => {
      console.log(`App is listening to port: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
