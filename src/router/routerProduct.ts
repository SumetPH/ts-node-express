import express from "express";

import * as product from "@/controllers/product";

export default (router: express.Router) => {
  router.get("/api/products", product.products);
  router.get("/api/product/:id", product.productsDetail);
};
