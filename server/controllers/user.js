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
      return res.json({ message: 'Email already exists' });
    }

    const user = new User({ email });
    await user.hashFn(password);
    const newUser = await user.save();

    req.session.user = newUser.id;

    res.status(200);
    res.json(newUser);
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
      return res.json({ message: 'Invalid email provided' });
    }

    const isValid = await user.compareFn(password);

    if (!isValid) {
      res.status(401);
      return res.json({ message: 'Invalid password provided' });
    }

    req.session.user = user.id;
    res.status(200);
    res.json(user);
  } catch (error) {
    next(error);
  }
}
