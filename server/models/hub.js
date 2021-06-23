import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const HubSchema = new Schema({
  wallet: String,
});

const Hub = model('hub', HubSchema);

export default Hub;
