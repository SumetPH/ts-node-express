import { prisma } from "@/db";
import express from "express";

export const test = async (req: express.Request, res: express.Response) => {
  const order = await prisma.order.findMany({
    select: {
      orderID: true,
      status: true,
      totalQuantity: true,
      totalPrice: true,
      OrderProduct: {
        select: {
          orderProductID: true,
          Product: {
            select: {
              name: true,
            },
          },
          ProductType: {
            select: {
              name: true,
              price: true,
            },
          },
        },
      },
    },
  });

  const orderRaw: Order[] = await prisma.$queryRaw`
    SELECT
      op."orderID",
      P."name" AS "productName",
      pt."name" AS "productType",
      pt."quantity",
      pt."price" 
    FROM
      "OrderProduct" op
      LEFT JOIN "Product" P ON P."productID" = op."productID"
      LEFT JOIN "ProductType" pt ON pt."productTypeID" = op."productTypeID"
  `;

  return res.status(200).json(order);
};

export interface Order {
  orderID: number;
  productName: string;
  productType: string;
  quantity: number;
  price: string;
}
