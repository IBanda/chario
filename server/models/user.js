import mongoose from 'mongoose';
import crypto from 'crypto';
import { promisify } from 'util';

const { Schema, model } = mongoose;

const pbkdf2 = promisify(crypto.pbkdf2);

const UserSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  salt: String,
  hash: String,
});

UserSchema.methods.hashFn = async function hashFn(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  const hash = (await pbkdf2(password, this.salt, 1000, 64, 'sha512')).toString(
    'hex'
  );
  this.hash = hash;
};

UserSchema.methods.compareFn = async function compareFn(password) {
  const hash = (await pbkdf2(password, this.salt, 1000, 64, 'sha512')).toString(
    'hex'
  );
  return this.hash === hash;
};

const User = model('user', UserSchema);

export default User;
