import { prisma } from "@/db";
import express from "express";

export const test = async (req: express.Request, res: express.Response) => {
  const trans = await prisma.wallet_transaction.findMany();
  return res.status(200).json(trans);
};
