import express from "express";
import jwt from "jsonwebtoken";

export const isAuthentication = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const userSessionToken = req.cookies["user_session_token"];
    if (!userSessionToken) {
      return res.status(400).send("not found token");
    }

    // check password
    const decodeToken = jwt.verify(
      userSessionToken,
      process.env.AUTH_SECRET_KEY
    );

    return next();
  } catch (error) {
    console.error(error);
    return res.status(500).send("Unauthenticated");
  }
};
