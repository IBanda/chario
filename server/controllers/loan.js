/* eslint-disable consistent-return */
import Loan from '../models/loan.js';
import User from '../models/user.js';
import transporter from '../utils/transporter.js';

export async function requestLoan(req, res, next) {
  const { body } = req;
  const { loaner, loanee } = body;
  try {
    const hasPending = await Loan.exists({ status: 'pending' });
    if (hasPending) {
      res.status(403);
      return res.json({
        status: 'ERROR',
        message: "There's a request waiting for action",
      });
    }

    const request = await Loan.create(body);

    const users = await User.find(
      { hub: loaner },
      { wallet: { $ne: loanee } }
    ).populate('hub');
    let i = 0;
    while (i < users.length) {
      // eslint-disable-next-line no-await-in-loop
      await transporter.sendMail({
        from: `Chario <chario@ianbanda.com>`,
        to: users[i].email,
        subject: 'Loan Request',
        text: 'Hello',
        html: '<h1>Hello</h1>',
      });
      // eslint-disable-next-line no-plusplus
      i++;
    }

    res.status(201);
    res.json(request);
  } catch (error) {
    next(error);
  }
}

export async function loanAction(req, res, next) {
  const {
    body: { status, loanId, hubId, userId, reason },
  } = req;
  try {
    const request = await Loan.findById({ _id: loanId });

    if (request.approvals.includes(userId) || request.status === 'declined') {
      res.status(403);
      return res.end();
    }

    if (status === 'decline') {
      await Loan.findByIdAndUpdate(loanId, {
        status: 'declined',
        reason,
      });
      res.status(200);
      return res.json({
        status: 'SUCCESS',
        message: '',
      });
    }

    const hubUsersCount = await User.countDocuments({ hub: hubId });
    if (request.approvals.length + 1 === hubUsersCount) {
      await Loan.findByIdAndUpdate(loanId, {
        status: 'approved',
      });
    }

    await Loan.findByIdAndUpdate(loanId, {
      $push: { approvals: userId },
    });

    res.status(200);
    return res.json({
      status: 'SUCCESS',
      message: '',
    });
  } catch (error) {
    next(error);
  }
}
