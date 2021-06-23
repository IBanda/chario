import { Schema, model } from 'mongoose';

const RateSchema = new Schema({
  hub: String,
  rate_in_percent: Number,
});

const Rate = model('rate', RateSchema);

export default Rate;
