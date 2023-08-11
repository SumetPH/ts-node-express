import express from "express";

export const test = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  return next();
};
