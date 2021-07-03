import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const WalletSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'user' },
  wallet_id: { type: String, unique: true },
});

const Wallet = model('wallet', WalletSchema);

export default Wallet;
