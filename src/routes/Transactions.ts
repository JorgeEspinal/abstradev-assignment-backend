import express from "express";
import controller from "../controllers/Transaction";

const router = express.Router();

router.post("/create", controller.createTransaction);
router.get("/get/:transactionId", controller.readTransaction);
router.get("/filter", controller.filterAdvanceTransactions);
router.get("/get", controller.readAll);
router.patch("/update/:transactionId", controller.updateTransaction);
router.delete("/delete/:transactionId", controller.deleteTransaction);

export default router;
