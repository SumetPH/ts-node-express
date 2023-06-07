import express from "express";
import { transactionAll } from "@/controllers/transaction/transactionAll";

export default (router: express.Router) => {
  router.post("/api/transaction/transactionAll", transactionAll);
};
