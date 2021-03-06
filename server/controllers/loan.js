/* eslint-disable consistent-return */
import Hub from '../models/hub.js';
import Loan from '../models/loan.js';
import sendMail from '../utils/transporter.js';
import throwIfError from '../utils/throwIfError.js';
import makeHttpRequest from '../utils/makeHttpRequest.js';

export async function requestLoan(req, res, next) {
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
    const { user } = req.session;
    const request = await Loan.create({
      ...body,
      loaner,
      loanee: user.id,
    });
    const { members } = await Hub.findById(loaner, 'members').populate({
      path: 'members',
    });
    const notifyMembers = members
      // eslint-disable-next-line no-underscore-dangle
      .filter((member) => member._id !== user.id)
      .map((member) =>
        sendMail({
          to: member.email,
          subject: 'Loan Request',
          text: `${user.name} has made a request for a loan`,
          html: `<p>${user.name} has made a request for a loan </p>`,
        })
      );
    // eslint-disable-next-line no-undef
    await Promise.all(notifyMembers);
    res.status(201);
    res.json(request);
  } catch (error) {
    next(error);
  }
}

/*
Act on the loan request currently pending
*/

export async function loanAction(req, res, next) {
  const { status, loanId, hubId, userId, reason, wallet } = req.body;
  try {
    if (status !== 'decline' && status !== 'approve') {
      throw new Error(`Status must either be 'decline' or 'approve'`);
    }
    const request = await Loan.findById({ _id: loanId })
      .populate('loaner')
      .populate('loanee');
    if (request.approvals.includes(userId) || request.status === 'declined') {
      res.status(403);
      return res.json({
        status: 'ERROR',
        message: 'No action available on this request',
      });
    }
    if (status === 'decline') {
      await Loan.findByIdAndUpdate(loanId, {
        status: 'declined',
        reason,
      });
      await sendMail({
        to: request.loanee.email,
        subject: 'Your loan request has been declined',
        text: `Your loan request from hub ${request.loaner.name} has been declined`,
        html: `<p>Your loan request from hub ${request.loaner.name} has been declined</p>`,
      });
      // TODO: add message
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
      // Transfer funds to loanee wallet
      const body = {
        amount: request.amount,
        currency: request.currency,
        source_wallet: request.loaner.wallet,
        destination_wallet: wallet,
      };
      const data = await makeHttpRequest('/account/transfer', 'post', body);
      throwIfError(data);
      await sendMail({
        to: request.loanee.email,
        subject: 'Your loan request has been Approved',
        text: 'Your loan request has been successfully approved, funds have been transfered to your wallet',
        html: '<p>Your loan request has been successfully approved, funds have been transfered to your wallet</p>',
      });
    }
    // TODO: add message
    res.status(200);
    res.json({
      status: 'SUCCESS',
      message: '',
    });
  } catch (error) {
    next(error);
  }
}
