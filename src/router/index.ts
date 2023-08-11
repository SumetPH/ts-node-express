import express from "express";
import routerTest from "./routerTest";
import routerProduct from "./routerProduct";

const router = express.Router();

export default (): express.Router => {
  routerTest(router);
  routerProduct(router);
  return router;
};
