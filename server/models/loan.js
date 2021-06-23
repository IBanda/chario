import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const LoanSchema = new Schema({
  loaner: { type: Schema.Types.ObjectId, ref: 'hub' },
  loanee: { type: Schema.Types.ObjectId, ref: 'user' },
  amount: Number,
  currency: String,
  duration: Number,
  status: {
    type: String,
    enum: ['approved', 'pending', 'declined'],
    default: 'pending',
  },
  reason: { type: String, default: '' },
  interest_rate: { type: Schema.Types.ObjectId, ref: 'rate' },
  active: { type: Boolean, default: false },
  issue_date: Date,
  payment_date: Date,
  approvals: [String],
});

const Loan = model('loan', LoanSchema);

export default Loan;
