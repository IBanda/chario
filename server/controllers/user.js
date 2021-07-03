/* eslint-disable consistent-return */
import User from '../models/user.js';

export async function signUp(req, res, next) {
  try {
    const {
      body: { email, password },
    } = req;
    const userExists = await User.exists({ email });
    if (userExists) {
      res.status(401);
      return res.json({ status: 'ERROR', message: 'Email already exists' });
    }
    const user = new User({ email });
    await user.hashFn(password);
    const newUser = await user.save();
    req.session.user = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    };
    res.status(200);
    res.json({ status: 'SUCCESS', user: newUser });
  } catch (error) {
    next(error);
  }
}

export async function signIn(req, res, next) {
  try {
    const {
      body: { email, password },
    } = req;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401);
      return res.json({ status: 'ERROR', message: 'Invalid email provided' });
    }
    const isValid = await user.compareFn(password);
    if (!isValid) {
      res.status(401);
      return res.json({
        status: 'ERROR',
        message: 'Invalid password provided',
      });
    }
    req.session.user = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
    res.status(200);
    res.json({ status: 'SUCCESS', user });
  } catch (error) {
    next(error);
  }
}
