const nodemailer = require("nodemailer");
const pug = require("pug");
const htmlToText = require("html-to-text");
const path = require("path");
module.exports = class Email {
  constructor(user, userInfo, order, To, totalPrice, url) {
    this.to = To || user.email;
    this.name = userInfo.name || user.name;
    this.email = user.email;
    this.address = userInfo.address || "";
    this.phoneNumber = userInfo.phoneNumber || "";
    this.order = order || [];
    this.total = totalPrice || "";
    this.url = url || "";
    this.from = process.env.EMAIL_FROM;
  }

  newTransport() {
    try {
      if (process.env.NODE_ENV === "production") {
        return nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: process.env.GMAIL_ACCOUNT,
            pass: process.env.GMAIL_PASSWORD,
          },
        });
      }
    } catch (err) {
      console.log(err);
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_userInfoNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  // Send the actual email
  async send(template, subject) {
    try {
      const html = pug.renderFile(
        `${__dirname}/../src/server/views/email/${template}.pug`,
        {
          name: this.name,
          url: this.url,
          subject,
          order: this.order,
          totalPrice: this.total,
          phoneNumber: this.phoneNumber,
          email: this.email,
          address: this.address,
        }
      );
      // 2) Define email options
      const mailOptions = {
        from: this.from,
        to: this.to,
        subject,
        html,
        text: htmlToText.convert(html, { wordwrap: 130 }),
      };
      // 3) Create a transport and send email
      await this.newTransport().sendMail(mailOptions);
    } catch (err) {
      console.log(err);
    }
  }

  async sendOrder() {
    await this.send("order", "New order!");
  }

  async sendPasswordReset() {
    await this.send(
      "passwordReset",
      "Your password reset token (valid for only 10 minutes)"
    );
  }
};
