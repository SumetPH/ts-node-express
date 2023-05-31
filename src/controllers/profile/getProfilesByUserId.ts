import express from "express";
import { z } from "zod";

import { prisma } from "@/db";

export const getProfilesByUserId = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const validate = z.object({
      user_id: z.number(),
    });
    const body = validate.parse(req.body);

    const profiles = await prisma.wallet_profile.findMany({
      where: {
        user_id: body.user_id,
      },
    });

    return res.status(200).json(profiles);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};
