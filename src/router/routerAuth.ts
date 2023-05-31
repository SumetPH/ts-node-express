import express from "express";
import { login } from "@/controllers/auth/login";
import { register } from "@/controllers/auth/register";

export default (router: express.Router) => {
  router.post("/api/auth/login", login);
  router.post("/api/auth/register", register);
};
