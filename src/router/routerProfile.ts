import { createProfile, getProfilesByUserId } from "@/controllers/profile";
import { isAuthentication } from "@/middlewares";
import express from "express";

export default (router: express.Router) => {
  router.get(
    "/api/profile/getProfilesByUserId",
    isAuthentication,
    getProfilesByUserId
  );

  router.post("/api/profile/createProfile", isAuthentication, createProfile);
};
