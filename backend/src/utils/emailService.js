const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS
  }
});

module.exports = async (to, url) => {
  await transporter.sendMail({
    from: process.env.EMAIL,
    to,
    subject: "Your Certificate",
    html: `<a href="${url}">Download Certificate</a>`
  });
};