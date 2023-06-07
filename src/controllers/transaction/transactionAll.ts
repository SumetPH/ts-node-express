import express from "express";
import { z } from "zod";

import { prisma } from "@/db";
import { format } from "date-fns";

export const transactionAll = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const transactionCreate = z.object({
      profile_id: z.number(),
      acc_id: z.number().optional(),
    });

    const body = transactionCreate.parse(req.body);

    const transactionAll = await prisma.wallet_transaction.findMany({
      where: {
        profile_id: body.profile_id,
        acc_id: body.acc_id,
      },
      include: {
        wallet_account: true,
        wallet_category: {
          include: {
            wallet_transaction_type: true,
          },
        },
      },
      orderBy: {
        trans_date: "desc",
      },
    });

    const data = transactionAll.map((trans) => ({
      ...trans,
      date: trans.trans_date ? format(trans.trans_date, "dd-MM-yyyy") : null,
      time: trans.trans_date ? format(trans.trans_date, "HH.mm") : null,
    }));

    return res.json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};
