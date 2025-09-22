const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // your email
    pass: process.env.EMAIL_PASS  // your email app password
  }
});

async function sendMail({ to, subject, text, html }) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
    html
  };
  return transporter.sendMail(mailOptions);
}

module.exports = { sendMail };
