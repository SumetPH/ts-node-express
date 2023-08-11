import express from "express";
import routerTest from "./routerTest";

const router = express.Router();

export default (): express.Router => {
  routerTest(router);
  return router;
};
