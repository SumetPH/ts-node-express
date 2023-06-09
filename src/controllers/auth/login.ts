import express from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { prisma } from "@/db";

const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const validate = loginSchema.parse(req.body);

    // check email
    const user = await prisma.wallet_user.findFirst({
      where: {
        user_email: validate.email,
      },
    });
    if (!user) {
      return res.status(400).send("email not found");
    }

    // check password
    const checkPassword = bcrypt.compareSync(
      validate.password,
      user.user_password
    );
    if (!checkPassword) {
      return res.status(400).send("password not correct");
    }

    // update user session token
    const user_session_token = jwt.sign(
      { user_id: user.user_id.toString() },
      process.env.AUTH_SECRET_KEY
    );
    const loginUser = await prisma.wallet_user.update({
      where: {
        user_id: user.user_id,
      },
      data: {
        user_session_token: user_session_token,
      },
      select: {
        user_id: true,
        user_email: true,
        user_name: true,
        user_session_token: true,
      },
    });

    // set cookie
    res.cookie("user_session_token", user_session_token);

    return res.json(loginUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};
