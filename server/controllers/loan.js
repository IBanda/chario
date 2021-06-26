/* eslint-disable consistent-return */
import Hub from '../models/hub.js';
import Loan from '../models/loan.js';
import transporter from '../utils/transporter.js';

export async function requestLoan(req, res, next) {
  let i = 0;
  const { loaner, ...body } = req.body;
  try {
    const hasPending = await Loan.exists({ status: 'pending' });
    if (hasPending) {
      res.status(403);
      return res.json({
        status: 'ERROR',
        message: "There's a request waiting for action",
      });
    }

    const user = req.session.user;
    const request = await Loan.create({ ...body, loaner, loanee: user });
    const { members } = await Hub.findById(loaner, 'members').populate({
      path: 'members',
    });

    while (i < members.length) {
      // eslint-disable-next-line no-await-in-loop
      await transporter.sendMail({
        from: `Chario <chario@ianbanda.com>`,
        to: members[i].email,
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
  const { status, loanId, hubId, userId, reason } = req.body;
  try {
    if (status !== 'decline' && status !== 'approve') {
      throw new Error('Status must either be decline or approve');
    }

    const request = await Loan.findById({ _id: loanId });

    if (request.approvals.includes(userId) || request.status === 'declined') {
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

    const { members } = await Hub.findById(hubId, 'members');

    await Loan.findByIdAndUpdate(loanId, {
      $push: { approvals: userId },
    });

    if (request.approvals.length + 1 === members.length - 1) {
      await Loan.findByIdAndUpdate(loanId, {
        status: 'approved',
        active: true,
      });
      // DISBURSE
    }
    res.status(200);
    return res.json({
      status: 'SUCCESS',
      message: '',
    });
  } catch (error) {
    next(error);
  }
}
