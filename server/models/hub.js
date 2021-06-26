import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const HubSchema = new Schema({
  name: String,
  wallet: String,
  interest_rate: Number,
  max_deposit: Number,
  min_deposit: Number,
  members: [{ type: Schema.Types.ObjectId, ref: 'user' }],
});

const Hub = model('hub', HubSchema);

export default Hub;
