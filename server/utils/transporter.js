import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.mailgun.org',
  post: 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export default async function sendMail(details) {
  await transporter.sendMail({
    from: `Chario <chario@ianbanda.com>`,
    ...details,
  });
}
