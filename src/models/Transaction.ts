import mongoose, { Document, Schema } from "mongoose";

export interface ITransaction {
  transactionId: string;
  transactionData: any;
  transactionMetadata: any;
  timestamp: string;
}

// interface ITransactionModel extends ITransaction, Document {}

const TransactionSchema: Schema = new Schema(
  {
    transactionId: { type: String, required: true },
    transactionData: { type: Schema.Types.Mixed, required: true },
    transactionMetadata: { type: Schema.Types.Mixed, required: true },
    timestamp: { type: String, required: true },
  },
  { versionKey: false }
);

export default mongoose.model<ITransaction>("Transactions", TransactionSchema);
