import { NextFunction, Request, Response } from "express";
import Transaction from "../models/Transaction";
import crypto, { randomBytes } from "crypto";
import mongoose from "mongoose";

const createTransaction = (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const data = req.body;
  const id = randomBytes(20).toString("hex");
  const hashId = crypto.createHash("sha256").update(id).digest("hex");

  const transaction = new Transaction({
    _id: new mongoose.Types.ObjectId(),
    transactionId: hashId,
    timestamp: new Date(),
    ...data,
  });

  transaction
    .save()
    .then((dataSave) => {
      res.status(201).json(dataSave);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

const readTransactionById = (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const transactionId = req.query.transactionId;

  return Transaction.findOne({ transactionId: transactionId })
    .then((transaction) => {
      return transaction
        ? res.status(200).json(transaction)
        : res.status(404).json({ message: "Not found" });
    })
    .catch((error) => res.status(500).json({ error }));
};

const filtersAdvanceTransactions = (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const filters = req.body;

  return Transaction.find({ transactionMetadata: { $in: [filters] } })
    .then((transactions) => {
      return transactions
        ? res.status(200).json(transactions)
        : res.status(404).json({ message: "Not found" });
    })
    .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, _next: NextFunction) => {
  const page: number = Number(req.query.page) || 0;
  const limit: number = Number(req.query.limit) || 10;

  return Transaction.find({})
    .limit(limit)
    .skip(page)
    .then((transactions) => res.status(200).json({ transactions }))
    .catch((error) => res.status(500).json({ error }));
};

const updateTransaction = (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const transactionId = req.params.transactionId;

  return Transaction.findById(transactionId)
    .then((transaction) => {
      if (transaction) {
        transaction.set(req.body);

        return transaction
          .save()
          .then((dataSave) => res.status(201).json(dataSave))
          .catch((error) => res.status(500).json({ error }));
      } else res.status(404).json({ message: "Not found" });
    })
    .catch((error) => res.status(500).json({ error }));
};

const deleteTransaction = (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const transactionId = req.params.transactionId;

  return Transaction.findByIdAndDelete(transactionId)
    .then((transaction) =>
      transaction
        ? res.status(201).json({ message: "deleted" })
        : res.status(404).json({ message: "Not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

export default {
  createTransaction,
  readTransactionById,
  filtersAdvanceTransactions,
  readAll,
  updateTransaction,
  deleteTransaction,
};
