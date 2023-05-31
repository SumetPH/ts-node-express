import { prisma } from "@/db";
import express from "express";

export const getUsers = async (req: express.Request, res: express.Response) => {
  const users = await prisma.wallet_user.findMany();
  return res.status(200).json(users);
};
