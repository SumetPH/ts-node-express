import express from "express";
import { isAuthentication } from "@/middlewares";
import { getProfilesByUserId } from "@/controllers/profile/getProfilesByUserId";
import { createProfile } from "@/controllers/profile/createProfile";

export default (router: express.Router) => {
  router.get(
    "/api/profile/getProfilesByUserId",
    isAuthentication,
    getProfilesByUserId
  );

  router.post("/api/profile/createProfile", isAuthentication, createProfile);
};
