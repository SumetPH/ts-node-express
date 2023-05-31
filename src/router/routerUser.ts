import { getUsers } from "@/controllers/user";
import { isAuthentication } from "@/middlewares";
import express from "express";

export default (router: express.Router) => {
  router.get("/api/users", isAuthentication, getUsers);
};
