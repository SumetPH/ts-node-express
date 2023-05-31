import express from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
import { prisma } from "@/db";

const registerSchema = z.object({
  username: z.string(),
  password: z.string(),
  email: z.string(),
});
export const register = async (req: express.Request, res: express.Response) => {
  try {
    // validate body
    const validate = await registerSchema.parse(req.body);

    // check email
    const findUser = await prisma.wallet_user.findFirst({
      where: {
        user_email: validate.email,
      },
    });
    if (findUser) {
      return res.status(400).send("User already exists");
    }

    // create user
    const passwordHash = bcrypt.hashSync(validate.password, 10);
    const newUser = await prisma.wallet_user.create({
      data: {
        user_name: validate.username,
        user_email: validate.email,
        user_password: passwordHash,
      },
    });
    return res.json(newUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};
