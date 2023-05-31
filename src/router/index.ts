import express from "express";
import routerTest from "./routerTest";
import routerAuth from "./routerAuth";
import routerUser from "./routerUser";
import routerProfile from "./routerProfile";

const router = express.Router();

export default (): express.Router => {
  routerTest(router);
  routerAuth(router);
  routerUser(router);
  routerProfile(router);
  return router;
};
