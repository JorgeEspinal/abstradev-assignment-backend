import express from "express";
import controller from "../controllers/Transaction";

const router = express.Router();

router.get("/api", (_req, res, _next) => {
  res.status(200).json({ message: "API" });
});

router.post("/create", controller.createTransaction);
router.get("/get", controller.readAll);
router.get("/byId", controller.readTransactionById);
router.post("/filter", controller.filtersAdvanceTransactions);
router.patch("/update/:transactionId", controller.updateTransaction);
router.delete("/delete/:transactionId", controller.deleteTransaction);

export default router;
