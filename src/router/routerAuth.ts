import { login, register } from "@/controllers/auth";
import express from "express";

export default (router: express.Router) => {
  router.post("/api/auth/login", login);
  router.post("/api/auth/register", register);
};
