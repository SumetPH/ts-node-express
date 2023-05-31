import "dotenv/config";

import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";

import router from "./router";

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});

app.use(
  cors({
    origin: ["http://localhost:3001"],
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/", router());
