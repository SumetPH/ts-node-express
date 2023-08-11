import { prisma } from "../../db";
import express from "express";

// GET /api/products
export const products = async (req: express.Request, res: express.Response) => {
  try {
    const products: any[] = await prisma.$queryRaw`
        SELECT 
            P."productID",
            P."name",
            P."description",
            MIN ( pt.price ),
            MAX ( pt.price ) 
        FROM
            "Product" P 
            LEFT JOIN "ProductType" pt ON pt."productID" = P."productID" 
        GROUP BY
            P."productID"
    `;

    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// GET /api/product/:id
export const productsDetail = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const id = Number(req.params.id);

    const productDetail: any[] = await prisma.$queryRaw`
        SELECT
            * 
        FROM
            "Product" P 
        WHERE
            P."productID" = ${id}
    `;

    const productType: any[] = await prisma.$queryRaw`
        SELECT
            pt."productTypeID",
            pt."name",
            pt."quantity",
            pt."price" 
        FROM
            "ProductType" pt 
        WHERE
            pt."productID" = ${id}
    `;

    const category: any[] = await prisma.$queryRaw`
        SELECT 
            C."categoryID",
            C."name" 
        FROM
            "ProductCategory" pc
        LEFT JOIN "Product" P ON P."productID" = pc."productID"
        LEFT JOIN "Category" C ON C."categoryID" = pc."categoryID" 
        WHERE
            pc."productID" = ${id}
    `;

    const product = {
      productDetail: productDetail[0],
      productType,
      category,
    };

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json(error);
  }
};
