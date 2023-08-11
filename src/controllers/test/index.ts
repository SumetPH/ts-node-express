import { prisma } from "@/db";
import express from "express";

export const test = async (req: express.Request, res: express.Response) => {
  return res.status(200).json("test");
};
