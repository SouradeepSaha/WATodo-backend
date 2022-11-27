const nodemailer = require('nodemailer');
module.exports = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "2cffa6c8492184",
    pass: "db221a6a4cf139"
  }
});
