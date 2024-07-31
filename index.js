const express = require("express");
const dotenv = require("dotenv");
const http = require("http");
const cors = require("cors");
dotenv.config();
const app = express();
const server = http.createServer(app);

const userRouter = require("./routes/user");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: "application/vnd.api+json" }));
app.use(cors());

app.use("/api/v1/user/", userRouter);
server.listen(8000, async () => {
  console.log("Server Started at port 8000");
  try {
    console.log("Connected to database");
  } catch (error) {
    console.log(error);
  }
});
