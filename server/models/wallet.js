import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const WalletSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'user' },
  wallet_id: String,
});

const Wallet = model('wallet', WalletSchema);

export default Wallet;
