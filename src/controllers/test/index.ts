import express from "express";

export const test = (req: express.Request, res: express.Response) => {
  console.log(req);
  return res.status(200).json("test");
};
